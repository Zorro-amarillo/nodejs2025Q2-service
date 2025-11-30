import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArtistDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'TestArtist' })
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ example: true })
  grammy: boolean;
}
