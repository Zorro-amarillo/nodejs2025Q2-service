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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { CustomParseUuidPipe } from 'src/common/pipes/parse-uuid.pipe';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.artistService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getById(@Param('id', CustomParseUuidPipe) id: string) {
    return this.artistService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
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
  update(
    @Param('id', CustomParseUuidPipe) id: string,
    @Body() dto: CreateArtistDto,
  ) {
    return this.artistService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', CustomParseUuidPipe) id: string) {
    return this.artistService.delete(id);
  }
}
