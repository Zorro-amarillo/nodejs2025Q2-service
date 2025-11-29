import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { randomUUID } from 'node:crypto';
import { ArtistService } from 'src/artist/artist.service';

@Injectable()
export class AlbumService {
  constructor(private artistService: ArtistService) {}

  private albums = [];

  private checkArtist(id: string) {
    try {
      this.artistService.findArtist(id);
    } catch (err) {
      console.log(err);

      if (err instanceof NotFoundException) {
        throw new BadRequestException('Artist with this id does not exist');
      }

      throw err;
    }
  }

  private validateArtistId(id: string | null | undefined) {
    if (id === undefined) {
      throw new BadRequestException(
        'Request body does not contain required field (artistId)',
      );
    }

    if (id !== null) {
      if (typeof id !== 'string') {
        throw new BadRequestException('Invalid artistId format');
      }

      this.checkArtist(id);
    }
  }

  findAlbum(id: string) {
    const album = this.albums.find((currentAlbum) => currentAlbum.id === id);

    if (!album) {
      throw new NotFoundException('Album with this ID is not found');
    }

    return album;
  }

  getAll() {
    return this.albums;
  }

  getById(id: string) {
    return this.findAlbum(id);
  }

  create(dto: CreateAlbumDto) {
    this.validateArtistId(dto.artistId);

    const newAlbum = {
      id: randomUUID(),
      ...dto,
    };

    this.albums.push(newAlbum);

    return newAlbum;
  }

  update(id: string, dto: CreateAlbumDto) {
    const album = this.findAlbum(id);

    this.validateArtistId(dto.artistId);

    Object.assign(album, {
      ...dto,
    });

    return album;
  }

  delete(id: string) {
    this.findAlbum(id);
    this.albums = this.albums.filter((artist) => artist.id !== id);
  }
}
