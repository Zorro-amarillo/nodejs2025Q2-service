import { IsInt, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @ValidateIf((obj) => typeof obj.artistId !== undefined)
  artistId: string | null;

  @ValidateIf((obj) => typeof obj.albumId !== undefined)
  albumId: string | null;

  @IsNotEmpty()
  @IsInt()
  duration: number;
}
