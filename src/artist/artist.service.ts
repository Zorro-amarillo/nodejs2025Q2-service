import {
  Injectable,
  NotFoundException,
  BadRequestException,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';
import { FavsService } from 'src/favs/favs.service';

@Injectable()
export class ArtistService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
    @Inject(forwardRef(() => FavsService))
    private favsService: FavsService,
  ) {}

  private async checkById(id: string) {
    try {
      await this.getById(id);
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new BadRequestException('Artist with this id does not exist');
      }

      throw err;
    }
  }

  async validateId(id: string | null | undefined) {
    if (id === undefined) {
      throw new BadRequestException(
        'Request body does not contain required field (artistId)',
      );
    }

    if (id !== null) {
      if (typeof id !== 'string') {
        throw new BadRequestException('Invalid artistId format');
      }

      await this.checkById(id);
    }
  }

  async getAll() {
    return this.prisma.artist.findMany();
  }

  async getById(id: string) {
    const artist = await this.prisma.artist.findUnique({
      where: { id },
    });

    if (!artist) {
      throw new NotFoundException('Artist with this ID is not found');
    }

    return artist;
  }

  async create(dto: CreateArtistDto) {
    const { name, grammy } = dto;

    return this.prisma.artist.create({
      data: {
        name,
        grammy,
      },
    });
  }

  async update(id: string, dto: CreateArtistDto) {
    await this.getById(id);

    return this.prisma.artist.update({
      where: { id },
      data: {
        ...dto,
      },
    });
  }

  async delete(id: string) {
    await this.getById(id);
    await this.prisma.artist.delete({
      where: { id },
    });
  }
}
