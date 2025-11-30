import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  HttpStatus,
  HttpCode,
  BadRequestException,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { CustomParseUuidPipe } from 'src/common/pipes/parse-uuid.pipe';

@ApiTags('👤 Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of users' })
  getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get single user by id' })
  @ApiParam({ name: 'id', description: 'uuid' })
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({
    status: 400,
    description: 'User not found: userId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: "User not found: record with id === userId doesn't exist",
  })
  getById(@Param('id', CustomParseUuidPipe) id: string) {
    return this.userService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'User created' })
  @ApiResponse({
    status: 400,
    description:
      'User not created: request body does not contain required fields',
  })
  create(@Body() dto: CreateUserDto) {
    if (!dto || Object.keys(dto).length === 0) {
      throw new BadRequestException(
        'Request body does not contain required fields (login, password)',
      );
    }

    return this.userService.create(dto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Update user's password" })
  @ApiParam({ name: 'id', description: 'uuid' })
  @ApiResponse({ status: 200, description: 'Password updated' })
  @ApiResponse({
    status: 400,
    description: 'Password not updated: userId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description:
      "Password not updated: record with id === userId doesn't exist",
  })
  @ApiResponse({
    status: 403,
    description: 'Password not updated: oldPassword is wrong',
  })
  update(
    @Param('id', CustomParseUuidPipe) id: string,
    @Body() dto: UpdatePasswordDto,
  ) {
    return this.userService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete user' })
  @ApiParam({ name: 'id', description: 'uuid' })
  @ApiResponse({ status: 204, description: 'User deleted' })
  @ApiResponse({
    status: 400,
    description: 'User not deleted: userId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: "User not deleted: record with id === userId doesn't exist",
  })
  delete(@Param('id', CustomParseUuidPipe) id: string) {
    return this.userService.delete(id);
  }
}
