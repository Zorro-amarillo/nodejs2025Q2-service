import { Controller, HttpCode, HttpStatus, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@ApiTags('✅ Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'User is successfully registered' })
  @ApiResponse({
    status: 400,
    description:
      'User is not registered: dto is invalid (no login or password, or they are not strings)',
  })
  signup(@Body() dto: CreateUserDto) {
    return this.authService.signup(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Log in user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 200, description: 'User is successfully logged in' })
  @ApiResponse({
    status: 400,
    description:
      'User is not logged in: dto is invalid (no login or password, or they are not strings)',
  })
  @ApiResponse({
    status: 403,
    description:
      "User is not logged in: authentication failed (no user with such login, password doesn't match actual one, etc.)",
  })
  login(@Body() dto: CreateUserDto) {
    return this.authService.login(dto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh tokens' })
  @ApiBody({ type: RefreshTokenDto })
  @ApiResponse({ status: 200, description: 'New tokens are returned' })
  @ApiResponse({
    status: 401,
    description:
      'Refresh token is required: dto is invalid (no refreshToken in body)',
  })
  @ApiResponse({
    status: 403,
    description: 'Authentication failed (Refresh token is invalid or expired)',
  })
  refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refresh(dto);
  }
}
