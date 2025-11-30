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
import { TrackService } from './track.service';
import { CustomParseUuidPipe } from 'src/common/pipes/parse-uuid.pipe';
import { CreateTrackDto } from './dto/create-track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.trackService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getById(@Param('id', CustomParseUuidPipe) id: string) {
    return this.trackService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
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
  update(
    @Param('id', CustomParseUuidPipe) id: string,
    @Body() dto: CreateTrackDto,
  ) {
    return this.trackService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', CustomParseUuidPipe) id: string) {
    return this.trackService.delete(id);
  }
}
