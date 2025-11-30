import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @ApiProperty({ example: 'oldPass' })
  oldPassword: string;

  @ApiProperty({ example: 'newPass' })
  newPassword: string;
}
