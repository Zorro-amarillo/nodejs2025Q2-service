import { ConfigService } from '@nestjs/config';
import type { JwtModuleOptions } from '@nestjs/jwt';

export const getJwtConfig = async (
  configService: ConfigService,
): Promise<JwtModuleOptions> => {
  return {
    secret: configService.getOrThrow('JWT_SECRET_KEY'),
    signOptions: {
      algorithm: 'HS256',
    },
  };
};
