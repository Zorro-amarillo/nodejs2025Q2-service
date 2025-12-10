import {
  ForbiddenException,
  BadRequestException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import type { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return this.prisma.user.findMany({
      omit: { password: true },
    });
  }

  async getById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      omit: {
        password: true,
      },
    });
    console.log(user);

    if (!user) {
      throw new NotFoundException('User with this ID is not found');
    }

    return user;
  }

  async create(dto: CreateUserDto) {
    const { login, password } = dto;

    return this.prisma.user.create({
      data: {
        login,
        password,
      },
      omit: {
        password: true,
      },
    });
  }

  async update(id: string, dto: UpdatePasswordDto) {
    if (!dto.oldPassword || !dto.newPassword) {
      throw new BadRequestException('Invalid password data');
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (user.password !== dto.oldPassword) {
      throw new ForbiddenException('Wrong current password');
    }

    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password: dto.newPassword,
        version: { increment: 1 },
      },
      omit: { password: true },
    });
  }

  async delete(id: string) {
    await this.prisma.user.delete({
      where: {
        id,
      },
      omit: {
        password: true,
      },
    });
  }
}
