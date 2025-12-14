import {
  Injectable,
  Inject,
  forwardRef,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';
import { ArtistService } from 'src/artist/artist.service';

@Injectable()
export class FavsService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
  ) {}

  private handleNotFound(err: Error, entity: string) {
    if (err instanceof NotFoundException) {
      throw new UnprocessableEntityException(`${entity} not found`);
    }

    throw err;
  }

  async getAll() {
    const favorites = await this.prisma.favorites.findMany({
      include: {
        favoriteAlbums: {
          include: {
            album: true,
          },
        },
        favoriteArtists: {
          include: {
            artist: true,
          },
        },
        favoriteTracks: {
          include: {
            track: true,
          },
        },
      },
    });

    if (!favorites) {
      return {
        artists: [],
        albums: [],
        tracks: [],
      };
    }

    const artists = favorites[0].favoriteArtists.map(
      (favArtist) => favArtist.artist,
    );
    const albums = favorites[0].favoriteAlbums.map(
      (favAlbum) => favAlbum.album,
    );
    const tracks = favorites[0].favoriteTracks.map(
      (favTrack) => favTrack.track,
    );

    return {
      artists,
      albums,
      tracks,
    };
  }

  async getFavorites() {
    let favorites = await this.prisma.favorites.findFirst();

    if (!favorites) {
      favorites = await this.prisma.favorites.create({ data: {} });
    }

    return favorites;
  }

  async addTrack(id: string) {
    try {
      await this.trackService.getById(id);

      const favoriteTrack = await this.prisma.favoriteTrack.findFirst({
        where: {
          trackId: id,
        },
      });

      if (favoriteTrack) {
        return { message: 'Track is already in favorites' };
      }

      const favorites = await this.getFavorites();

      await this.prisma.favoriteTrack.create({
        data: {
          trackId: id,
          favoritesId: favorites.id,
        },
      });

      return { message: 'Track added to favorites' };
    } catch (err) {
      this.handleNotFound(err, 'Track');
    }
  }

  async addAlbum(id: string) {
    try {
      await this.albumService.getById(id);

      const favoriteAlbum = await this.prisma.favoriteAlbum.findFirst({
        where: {
          albumId: id,
        },
      });

      if (favoriteAlbum) {
        return { message: 'Album is already in favorites' };
      }

      const favorites = await this.getFavorites();

      await this.prisma.favoriteAlbum.create({
        data: {
          albumId: id,
          favoritesId: favorites.id,
        },
      });

      return { message: 'Album added to favorites' };
    } catch (err) {
      this.handleNotFound(err, 'Album');
    }
  }

  async addArtist(id: string) {
    try {
      await this.artistService.getById(id);

      const favoriteArtist = await this.prisma.favoriteArtist.findFirst({
        where: {
          artistId: id,
        },
      });

      if (favoriteArtist) {
        return { message: 'Artist is already in favorites' };
      }

      const favorites = await this.getFavorites();

      await this.prisma.favoriteArtist.create({
        data: {
          artistId: id,
          favoritesId: favorites.id,
        },
      });

      return { message: 'Artist added to favorites' };
    } catch (err) {
      this.handleNotFound(err, 'Artist');
    }
  }

  async deleteTrack(id: string) {
    const favTrack = await this.prisma.favoriteTrack.findFirst({
      where: {
        trackId: id,
      },
    });

    if (!favTrack) {
      throw new NotFoundException('Track is not favorite');
    }

    return this.prisma.favoriteTrack.delete({
      where: {
        id: favTrack.id,
      },
    });
  }

  async deleteAlbum(id: string) {
    const favAlbum = await this.prisma.favoriteAlbum.findFirst({
      where: {
        albumId: id,
      },
    });

    if (!favAlbum) {
      throw new NotFoundException('Album is not favorite');
    }

    return this.prisma.favoriteAlbum.delete({
      where: {
        id: favAlbum.id,
      },
    });
  }

  async deleteArtist(id: string) {
    const favArtist = await this.prisma.favoriteArtist.findFirst({
      where: {
        artistId: id,
      },
    });

    if (!favArtist) {
      throw new NotFoundException('Artist is not favorite');
    }

    return this.prisma.favoriteArtist.delete({
      where: {
        id: favArtist.id,
      },
    });
  }
}
