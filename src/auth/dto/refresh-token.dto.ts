import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class RefreshTokenDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZlMDkzMThhLTQ4M2MtNGRhOC1iNjJhLTU4MzM3YzFmNGI3YSIsImlhdCI6MTc2NjE3NDQxNiwiZXhwIjoxNzY2MTc4MDE2fQ.nakaScc_EXxY1bQBA4rmrSy7IjuZ2Q2An8sxIPgKvNI',
  })
  refreshToken: string;
}
