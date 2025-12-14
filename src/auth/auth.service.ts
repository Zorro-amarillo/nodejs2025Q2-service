import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async signup(dto: CreateUserDto) {
    const { login } = dto;

    const existingUser = await this.userService.getByLogin(login);

    if (existingUser) {
      throw new BadRequestException('User with this login already exists');
    }
  }
}
