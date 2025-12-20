import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const openRoutes = ['/auth/signup', '/auth/login', '/doc', '/'];
    const url = req.url.split('?')[0];

    if (openRoutes.includes(url)) {
      return true;
    }

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid authorization header');
    }

    const bearerToken = authHeader.split(' ')[1];

    try {
      const payload = this.jwtService.verify(bearerToken, {
        secret: this.configService.getOrThrow('JWT_SECRET_KEY'),
      });

      req.user = payload;

      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid JWT');
    }
  }
}
