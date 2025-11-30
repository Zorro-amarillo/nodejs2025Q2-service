import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { randomUUID } from 'node:crypto';
import { ArtistService } from 'src/artist/artist.service';

@Injectable()
export class AlbumService {
  constructor(
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
  ) {}

  private albums = [];

  private checkById(id: string) {
    try {
      this.findById(id);
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new BadRequestException('Album with this id does not exist');
      }

      throw err;
    }
  }

  validateId(id: string | null | undefined) {
    if (id === undefined) {
      throw new BadRequestException(
        'Request body does not contain required field (albumId)',
      );
    }

    if (id !== null) {
      if (typeof id !== 'string') {
        throw new BadRequestException('Invalid albumId format');
      }

      this.checkById(id);
    }
  }

  findById(id: string) {
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
    return this.findById(id);
  }

  create(dto: CreateAlbumDto) {
    this.artistService.validateId(dto.artistId);

    const newAlbum = {
      id: randomUUID(),
      ...dto,
    };

    this.albums.push(newAlbum);

    return newAlbum;
  }

  update(id: string, dto: CreateAlbumDto) {
    const album = this.findById(id);

    this.artistService.validateId(dto.artistId);

    Object.assign(album, {
      ...dto,
    });

    return album;
  }

  delete(id: string) {
    this.findById(id);
    this.albums = this.albums.filter((artist) => artist.id !== id);
  }

  clearArtistProp(artistId: string) {
    this.albums.forEach((album) => {
      if (album.artistId === artistId) {
        album.artistId = null;
      }
    });
  }
}
