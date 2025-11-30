import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'TestUser' })
  login: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 's3crEt' })
  password: string;
}
