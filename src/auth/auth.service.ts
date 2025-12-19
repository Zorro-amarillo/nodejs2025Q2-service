import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt.interface';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  private readonly JWT_SECRET_KEY: string;
  private readonly TOKEN_EXPIRE_TIME: string;
  private readonly TOKEN_REFRESH_EXPIRE_TIME: string;
  private readonly CRYPT_SALT: number;

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {
    this.JWT_SECRET_KEY = configService.getOrThrow('JWT_SECRET_KEY');
    this.TOKEN_EXPIRE_TIME = configService.getOrThrow('TOKEN_EXPIRE_TIME');
    this.TOKEN_REFRESH_EXPIRE_TIME = configService.getOrThrow(
      'TOKEN_REFRESH_EXPIRE_TIME',
    );
    this.CRYPT_SALT = configService.getOrThrow('CRYPT_SALT');
  }

  private generateTokens(userId: string) {
    const payload: JwtPayload = { id: userId };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.TOKEN_EXPIRE_TIME,
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.TOKEN_REFRESH_EXPIRE_TIME,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async signup(dto: CreateUserDto) {
    const { login } = dto;

    const existingUser = await this.userService.getByLogin(login);

    if (existingUser) {
      throw new BadRequestException('User with this login already exists');
    }

    const hash = await bcrypt.hash(dto.password, this.CRYPT_SALT);

    const newUser = await this.userService.create({
      ...dto,
      password: hash,
    });

    return {
      message: 'User is signed up',
      ...this.generateTokens(newUser.id),
    };
  }

  async login(dto: CreateUserDto) {
    const { login, password } = dto;

    const user = await this.prisma.user.findUnique({
      where: { login },
      select: {
        id: true,
        password: true,
      },
    });

    if (!user) {
      throw new ForbiddenException('User with this login is not found');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new ForbiddenException('Wrong user password');
    }

    return this.generateTokens(user.id);
  }

  async refresh(dto: RefreshTokenDto) {
    const { refreshToken } = dto;

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is required');
    }

    let payload: JwtPayload;

    try {
      payload = await this.jwtService.verifyAsync(refreshToken);
    } catch (err) {
      throw new ForbiddenException('Refresh token is invalid or expired');
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.id,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.generateTokens(user.id);
  }
}
