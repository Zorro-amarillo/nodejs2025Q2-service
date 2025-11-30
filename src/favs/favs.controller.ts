import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { FavsService } from './favs.service';
import { CustomParseUuidPipe } from 'src/common/pipes/parse-uuid.pipe';

@ApiTags('⭐ Favorites')
@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all favorites' })
  @ApiResponse({ status: 200, description: 'List of favorites' })
  getAll() {
    return this.favsService.getAll();
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add track to the favorites' })
  @ApiParam({ name: 'id', description: 'uuid' })
  @ApiResponse({ status: 201, description: 'Track added to the favorites' })
  @ApiResponse({
    status: 400,
    description:
      'Track not added to the favorites: trackId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 422,
    description:
      "Track not added to the favorites: track with id === trackId doesn't exist",
  })
  addTrack(@Param('id', CustomParseUuidPipe) id: string) {
    return this.favsService.addTrack(id);
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add album to the favorites' })
  @ApiParam({ name: 'id', description: 'uuid' })
  @ApiResponse({ status: 201, description: 'Album added to the favorites' })
  @ApiResponse({
    status: 400,
    description:
      'Album not added to the favorites: albumId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 422,
    description:
      "Album not added to the favorites: album with id === albumId doesn't exist",
  })
  addAlbum(@Param('id', CustomParseUuidPipe) id: string) {
    return this.favsService.addAlbum(id);
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add artist to the favorites' })
  @ApiParam({ name: 'id', description: 'uuid' })
  @ApiResponse({ status: 201, description: 'Artist added to the favorites' })
  @ApiResponse({
    status: 400,
    description:
      'Artist not added to the favorites: artistId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 422,
    description:
      "Artist not added to the favorites: artist with id === artistId doesn't exist",
  })
  addArtist(@Param('id', CustomParseUuidPipe) id: string) {
    return this.favsService.addArtist(id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete track from favorites' })
  @ApiParam({ name: 'id', description: 'uuid' })
  @ApiResponse({ status: 204, description: 'Track deleted from favorites' })
  @ApiResponse({
    status: 400,
    description:
      'Track not deleted from favorites: trackId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description:
      "Track not deleted from favorites: record with id === trackId doesn't exist",
  })
  deleteTrack(@Param('id', CustomParseUuidPipe) id: string) {
    return this.favsService.deleteTrack(id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete album from favorites' })
  @ApiParam({ name: 'id', description: 'uuid' })
  @ApiResponse({ status: 204, description: 'Album deleted from favorites' })
  @ApiResponse({
    status: 400,
    description:
      'Album not deleted from favorites: albumId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description:
      "Album not deleted from favorites: record with id === albumId doesn't exist",
  })
  deleteAlbum(@Param('id', CustomParseUuidPipe) id: string) {
    return this.favsService.deleteAlbum(id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete artist from favorites' })
  @ApiParam({ name: 'id', description: 'uuid' })
  @ApiResponse({ status: 204, description: 'Artist deleted from favorites' })
  @ApiResponse({
    status: 400,
    description:
      'Artist not deleted from favorites: artistId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description:
      "Artist not deleted from favorites: record with id === artistId doesn't exist",
  })
  deleteArtist(@Param('id', CustomParseUuidPipe) id: string) {
    return this.favsService.deleteArtist(id);
  }
}
