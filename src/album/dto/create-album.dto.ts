import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'TestAlbum' })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 2025 })
  year: number;

  @ValidateIf((obj) => typeof obj.artistId !== undefined)
  @ApiProperty({ example: '8e611ac7-420a-42a9-8240-c49b91f93184' })
  artistId: string | null;
}
