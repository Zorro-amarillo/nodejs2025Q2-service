import { Controller, HttpCode, HttpStatus, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@ApiTags('✅ Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Sign up user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'User is signed up' })
  @ApiResponse({
    status: 400,
    description:
      'User is not signed up: request body does not contain required fields',
  })
  signup(@Body() dto: CreateUserDto) {
    return this.authService.signup(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Log in user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 200, description: 'User logged in' })
  @ApiResponse({
    status: 400,
    description:
      'User is not signed up: request body does not contain required fields',
  })
  login(@Body() dto: CreateUserDto) {
    return this.authService.login(dto);
  }
}
