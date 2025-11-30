import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { CustomParseUuidPipe } from 'src/common/pipes/parse-uuid.pipe';

@ApiTags('💿 Albums')
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all albums' })
  @ApiResponse({ status: 200, description: 'List of albums' })
  getAll() {
    return this.albumService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get single album by id' })
  @ApiParam({ name: 'id', description: 'uuid' })
  @ApiResponse({ status: 200, description: 'Album found' })
  @ApiResponse({
    status: 400,
    description: 'Album not found: albumId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: "Album not found: record with id === albumId doesn't exist",
  })
  getById(@Param('id', CustomParseUuidPipe) id: string) {
    return this.albumService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create album' })
  @ApiBody({ type: CreateAlbumDto })
  @ApiResponse({ status: 201, description: 'Album created' })
  @ApiResponse({
    status: 400,
    description:
      'Album not created: request body does not contain required fields',
  })
  create(@Body() dto: CreateAlbumDto) {
    if (!dto || Object.keys(dto).length === 0) {
      throw new BadRequestException(
        'Request body does not contain required fields (name, year, artistId)',
      );
    }

    return this.albumService.create(dto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update album' })
  @ApiParam({ name: 'id', description: 'uuid' })
  @ApiResponse({ status: 200, description: 'Album updated' })
  @ApiResponse({
    status: 400,
    description: 'Album not updated: albumId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: "Album not updated: record with id === albumId doesn't exist",
  })
  update(
    @Param('id', CustomParseUuidPipe) id: string,
    @Body() dto: CreateAlbumDto,
  ) {
    return this.albumService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete album' })
  @ApiParam({ name: 'id', description: 'uuid' })
  @ApiResponse({ status: 204, description: 'Album deleted' })
  @ApiResponse({
    status: 400,
    description: 'Album not deleted: albumId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: "Album not deleted: record with id === albumId doesn't exist",
  })
  delete(@Param('id', CustomParseUuidPipe) id: string) {
    return this.albumService.delete(id);
  }
}
