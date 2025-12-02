import { IsInt, IsNotEmpty, IsString, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'TestTrack' })
  name: string;

  @ValidateIf((obj) => typeof obj.artistId !== undefined)
  @ApiProperty({
    nullable: true,
    type: 'string',
    format: 'uuid',
    example: '8e611ac7-420a-42a9-8240-c49b91f93184',
  })
  artistId: string | null;

  @ValidateIf((obj) => typeof obj.albumId !== undefined)
  @ApiProperty({
    nullable: true,
    type: 'string',
    format: 'uuid',
    example: '8e611ac7-420a-42a9-8240-c49b91f93183',
  })
  albumId: string | null;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ example: 120 })
  duration: number;
}
