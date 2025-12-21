import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Login is required' })
  @IsString({ message: 'Login must be string' })
  @ApiProperty({ example: 'TestUser' })
  login: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Login must be string' })
  @ApiProperty({ example: 's3crEt' })
  password: string;
}
