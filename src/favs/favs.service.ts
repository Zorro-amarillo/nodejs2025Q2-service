import {
  Injectable,
  Inject,
  forwardRef,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';
import { ArtistService } from 'src/artist/artist.service';

@Injectable()
export class FavsService {
  constructor(
    private trackService: TrackService,
    private albumService: AlbumService,
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
  ) {}

  private favs = {
    artists: [],
    albums: [],
    tracks: [],
  };

  private handleNotFound(err: Error, entity: string) {
    if (err instanceof NotFoundException) {
      throw new UnprocessableEntityException(`${entity} not found`);
    }

    throw err;
  }

  getAll() {
    return this.favs;
  }

  addTrack(id: string) {
    try {
      const track = this.trackService.getById(id);

      if (!this.favs.tracks.find((currentTrack) => currentTrack.id === id)) {
        this.favs.tracks.push(track);
      }

      return { message: 'Track added to favorites' };
    } catch (err) {
      this.handleNotFound(err, 'Track');
    }
  }

  addAlbum(id: string) {
    try {
      const album = this.albumService.getById(id);

      if (!this.favs.albums.find((currentAlbum) => currentAlbum.id === id)) {
        this.favs.albums.push(album);
      }

      return { message: 'Album added to favorites' };
    } catch (err) {
      this.handleNotFound(err, 'Album');
    }
  }

  addArtist(id: string) {
    try {
      const artist = this.artistService.getById(id);

      if (!this.favs.artists.find((currentArtist) => currentArtist.id === id)) {
        this.favs.artists.push(artist);
      }

      return { message: 'Artist added to favorites' };
    } catch (err) {
      this.handleNotFound(err, 'Artist');
    }
  }

  deleteTrack(id: string) {
    const track = this.favs.tracks.find(
      (currentTrack) => currentTrack.id === id,
    );

    if (!track) {
      throw new NotFoundException('Track is not favorite');
    }

    this.favs.tracks = this.favs.tracks.filter(
      (currentTrack) => currentTrack.id !== id,
    );
  }

  deleteAlbum(id: string) {
    const album = this.favs.albums.find(
      (currentAlbum) => currentAlbum.id === id,
    );

    if (!album) {
      throw new NotFoundException('Album is not favorite');
    }

    this.favs.albums = this.favs.albums.filter(
      (currentAlbum) => currentAlbum.id !== id,
    );
  }

  deleteArtist(id: string) {
    const artist = this.favs.artists.find(
      (currentArtist) => currentArtist.id === id,
    );

    if (!artist) {
      throw new NotFoundException('Artist is not favorite');
    }

    this.favs.artists = this.favs.artists.filter(
      (currentArtist) => currentArtist.id !== id,
    );
  }
}
