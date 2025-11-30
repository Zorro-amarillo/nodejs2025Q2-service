import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { randomUUID } from 'node:crypto';

@Injectable()
export class ArtistService {
  private artists = [];

  private checkById(id: string) {
    try {
      this.findById(id);
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new BadRequestException('Artist with this id does not exist');
      }

      throw err;
    }
  }

  validateId(id: string | null | undefined) {
    if (id === undefined) {
      throw new BadRequestException(
        'Request body does not contain required field (artistId)',
      );
    }

    if (id !== null) {
      if (typeof id !== 'string') {
        throw new BadRequestException('Invalid artistId format');
      }

      this.checkById(id);
    }
  }

  findById(id: string) {
    const artist = this.artists.find(
      (currentArtist) => currentArtist.id === id,
    );

    if (!artist) {
      throw new NotFoundException('Artist with this ID is not found');
    }

    return artist;
  }

  getAll() {
    return this.artists;
  }

  getById(id: string) {
    return this.findById(id);
  }

  create(dto: CreateArtistDto) {
    const newArtist = {
      id: randomUUID(),
      ...dto,
    };

    this.artists.push(newArtist);

    return newArtist;
  }

  update(id: string, dto: CreateArtistDto) {
    const artist = this.findById(id);

    Object.assign(artist, {
      ...dto,
    });

    return artist;
  }

  delete(id: string) {
    this.findById(id);
    this.artists = this.artists.filter((artist) => artist.id !== id);
  }
}
