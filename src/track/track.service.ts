import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { randomUUID } from 'node:crypto';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';

@Injectable()
export class TrackService {
  constructor(
    private artistService: ArtistService,
    private albumService: AlbumService,
  ) {}

  private tracks = [];

  private findById(id: string) {
    const track = this.tracks.find((track) => track.id === id);

    if (!track) {
      throw new NotFoundException('Track with this id is not found');
    }

    return track;
  }

  getAll() {
    return this.tracks;
  }

  getById(id: string) {
    return this.findById(id);
  }

  create(dto: CreateTrackDto) {
    this.artistService.validateId(dto.artistId);
    this.albumService.validateId(dto.albumId);

    const newTrack = {
      id: randomUUID(),
      ...dto,
    };

    this.tracks.push(newTrack);

    return newTrack;
  }

  update(id: string, dto: CreateTrackDto) {
    const track = this.findById(id);

    this.artistService.validateId(dto.artistId);
    this.albumService.validateId(dto.albumId);

    Object.assign(track, {
      ...dto,
    });

    return track;
  }

  delete(id: string) {
    this.findById(id);
    this.tracks = this.tracks.filter((track) => track.id !== id);
  }
}
