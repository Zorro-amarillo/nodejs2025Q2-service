import {
  ForbiddenException,
  BadRequestException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import type { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import type { User } from 'generated/prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  private convertDate(user: Omit<User, 'password'>) {
    return {
      ...user,
      createdAt: new Date(user.createdAt).getTime(),
      updatedAt: new Date(user.updatedAt).getTime(),
    };
  }

  async getAll() {
    const users = await this.prisma.user.findMany({
      omit: { password: true },
    });

    return users.map((user) => this.convertDate(user));
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

    if (!user) {
      throw new NotFoundException('User with this ID is not found');
    }

    return this.convertDate(user);
  }

  async create(dto: CreateUserDto) {
    const { login, password } = dto;

    const user = await this.prisma.user.create({
      data: {
        login,
        password,
      },
      omit: {
        password: true,
      },
    });

    return this.convertDate(user);
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

    if (!user) {
      throw new NotFoundException('User with this ID is not found');
    }

    if (user.password !== dto.oldPassword) {
      throw new ForbiddenException('Wrong current password');
    }

    const updatedUser = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password: dto.newPassword,
        version: { increment: 1 },
      },
      omit: { password: true },
    });

    return this.convertDate(updatedUser);
  }

  async delete(id: string) {
    try {
      await this.prisma.user.delete({
        where: {
          id,
        },
        omit: {
          password: true,
        },
      });
    } catch (err) {
      if (err.code === 'P2025') {
        throw new NotFoundException('User with this ID is not found');
      }
    }
  }
}
