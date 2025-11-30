import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import type { CreateUserDto } from './dto/create-user.dto';
import type { User } from './entities/user.entity';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UserService {
  private users = [];

  private omitPassword(user: User) {
    const { password: _, ...restProps } = user;

    return restProps;
  }

  private findById(id: string) {
    const user = this.users.find((currentUser) => currentUser.id === id);

    if (!user) {
      throw new NotFoundException('User with this ID is not found');
    }

    return user;
  }

  getAll() {
    return this.users.map((user) => {
      return this.omitPassword(user);
    });
  }

  getById(id: string) {
    const user = this.findById(id);

    return this.omitPassword(user);
  }

  create(dto: CreateUserDto) {
    const newUser = {
      id: randomUUID(),
      ...dto,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.users.push(newUser);

    return this.omitPassword(newUser);
  }

  update(id: string, dto: UpdatePasswordDto) {
    const user = this.findById(id);

    if (user.password === dto.oldPassword) {
      user.password = dto.newPassword;
      user.version += 1;
      user.updatedAt = Date.now();

      return this.omitPassword(user);
    } else {
      throw new ForbiddenException('Wrong current password');
    }
  }

  delete(id: string) {
    this.findById(id);
    this.users = this.users.filter((user) => user.id !== id);
  }
}
