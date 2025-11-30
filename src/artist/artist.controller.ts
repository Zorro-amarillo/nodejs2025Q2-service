import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  HttpCode,
  HttpStatus,
  BadRequestException,
  Param,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { CustomParseUuidPipe } from 'src/common/pipes/parse-uuid.pipe';

@ApiTags('🎤 Artists')
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all artists' })
  @ApiResponse({ status: 200, description: 'List of artists' })
  getAll() {
    return this.artistService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get single artist by id' })
  @ApiParam({ name: 'id', description: 'uuid' })
  @ApiResponse({ status: 200, description: 'Artist found' })
  @ApiResponse({
    status: 400,
    description: 'Artist not found: artistId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: "Artist not found: record with id === artistId doesn't exist",
  })
  getById(@Param('id', CustomParseUuidPipe) id: string) {
    return this.artistService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create artist' })
  @ApiBody({ type: CreateArtistDto })
  @ApiResponse({ status: 201, description: 'Artist created' })
  @ApiResponse({
    status: 400,
    description:
      'Artist not created: request body does not contain required fields',
  })
  create(@Body() dto: CreateArtistDto) {
    if (!dto || Object.keys(dto).length === 0) {
      throw new BadRequestException(
        'Request body does not contain required fields (name, grammy)',
      );
    }

    return this.artistService.create(dto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update artist' })
  @ApiParam({ name: 'id', description: 'uuid' })
  @ApiResponse({ status: 200, description: 'Artist updated' })
  @ApiResponse({
    status: 400,
    description: 'Artist not updated: artist is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description:
      "Artist not updated: record with id === artistId doesn't exist",
  })
  update(
    @Param('id', CustomParseUuidPipe) id: string,
    @Body() dto: CreateArtistDto,
  ) {
    return this.artistService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete artist' })
  @ApiParam({ name: 'id', description: 'uuid' })
  @ApiResponse({ status: 204, description: 'Artist deleted' })
  @ApiResponse({
    status: 400,
    description: 'Artist not deleted: artistId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description:
      "Artist not deleted: record with id === artistId doesn't exist",
  })
  delete(@Param('id', CustomParseUuidPipe) id: string) {
    return this.artistService.delete(id);
  }
}
