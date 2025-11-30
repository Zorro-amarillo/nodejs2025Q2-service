import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
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
import { TrackService } from './track.service';
import { CustomParseUuidPipe } from 'src/common/pipes/parse-uuid.pipe';
import { CreateTrackDto } from './dto/create-track.dto';

@ApiTags('🎵 Tracks')
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all tracks' })
  @ApiResponse({ status: 200, description: 'List of tracks' })
  getAll() {
    return this.trackService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get single track by id' })
  @ApiParam({ name: 'id', description: 'uuid' })
  @ApiResponse({ status: 200, description: 'Track found' })
  @ApiResponse({
    status: 400,
    description: 'Track not found: trackId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: "Track not found: record with id === trackId doesn't exist",
  })
  getById(@Param('id', CustomParseUuidPipe) id: string) {
    return this.trackService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create track' })
  @ApiBody({ type: CreateTrackDto })
  @ApiResponse({ status: 201, description: 'Track created' })
  @ApiResponse({
    status: 400,
    description:
      'Track not created: request body does not contain required fields',
  })
  create(@Body() dto: CreateTrackDto) {
    if (!dto || Object.keys(dto).length === 0) {
      throw new BadRequestException(
        'Request body does not contain required fields (login, password)',
      );
    }

    return this.trackService.create(dto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update track' })
  @ApiParam({ name: 'id', description: 'uuid' })
  @ApiResponse({ status: 200, description: 'Track updated' })
  @ApiResponse({
    status: 400,
    description: 'Track not updated: trackId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: "Track not updated: record with id === trackId doesn't exist",
  })
  update(
    @Param('id', CustomParseUuidPipe) id: string,
    @Body() dto: CreateTrackDto,
  ) {
    return this.trackService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete track' })
  @ApiParam({ name: 'id', description: 'uuid' })
  @ApiResponse({ status: 204, description: 'Track deleted' })
  @ApiResponse({
    status: 400,
    description: 'Track not deleted: trackId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: "Track not deleted: record with id === trackId doesn't exist",
  })
  delete(@Param('id', CustomParseUuidPipe) id: string) {
    return this.trackService.delete(id);
  }
}
