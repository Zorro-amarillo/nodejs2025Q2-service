import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { ArtistService } from 'src/artist/artist.service';
import { FavsService } from 'src/favs/favs.service';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class AlbumService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
    @Inject(forwardRef(() => FavsService))
    private favsService: FavsService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
  ) {}

  private async checkById(id: string) {
    try {
      await this.getById(id);
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new BadRequestException('Album with this id does not exist');
      }

      throw err;
    }
  }

  async validateId(id: string | null | undefined) {
    if (id === undefined) {
      throw new BadRequestException(
        'Request body does not contain required field (albumId)',
      );
    }

    if (id !== null) {
      if (typeof id !== 'string') {
        throw new BadRequestException('Invalid albumId format');
      }

      await this.checkById(id);
    }
  }

  async getAll() {
    return this.prisma.album.findMany();
  }

  async getById(id: string) {
    const album = await this.prisma.album.findUnique({
      where: { id },
    });

    if (!album) {
      throw new NotFoundException('Album with this ID is not found');
    }

    return album;
  }

  async create(dto: CreateAlbumDto) {
    const { artistId, name, year } = dto;

    await this.artistService.validateId(artistId);

    return this.prisma.album.create({
      data: {
        name,
        year,
        artistId,
      },
    });
  }

  async update(id: string, dto: CreateAlbumDto) {
    await this.getById(id);

    this.artistService.validateId(dto.artistId);

    return this.prisma.album.update({
      where: { id },
      data: {
        ...dto,
      },
    });
  }

  async delete(id: string) {
    await this.getById(id);
    await this.prisma.album.delete({
      where: { id },
    });
  }
}
