import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { randomUUID } from 'node:crypto';

@Injectable()
export class ArtistService {
  private artists = [];

  private findArtist(id: string) {
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
    return this.findArtist(id);
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
    const artist = this.findArtist(id);

    Object.assign(artist, {
      ...dto,
    });

    return artist;
  }

  delete(id: string) {
    this.findArtist(id);
    this.artists = this.artists.filter((artist) => artist.id !== id);
  }
}
