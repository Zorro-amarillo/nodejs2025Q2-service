import {
  Injectable,
  Inject,
  forwardRef,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';
import { FavsService } from 'src/favs/favs.service';

@Injectable()
export class TrackService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => FavsService))
    private favsService: FavsService,
  ) {}

  async getAll() {
    return this.prisma.track.findMany();
  }

  async getById(id: string) {
    const track = await this.prisma.track.findUnique({
      where: { id },
    });

    if (!track) {
      throw new NotFoundException('Track with this id is not found');
    }

    return track;
  }

  async create(dto: CreateTrackDto) {
    await this.artistService.validateId(dto.artistId);
    await this.albumService.validateId(dto.albumId);

    return this.prisma.track.create({
      data: {
        ...dto,
      },
    });
  }

  async update(id: string, dto: CreateTrackDto) {
    await this.getById(id);

    await this.artistService.validateId(dto.artistId);
    await this.albumService.validateId(dto.albumId);

    return this.prisma.track.create({
      data: {
        ...dto,
      },
    });
  }

  async delete(id: string) {
    await this.getById(id);
    await this.prisma.track.delete({
      where: { id },
    });
  }
}
