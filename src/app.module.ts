import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { FavsModule } from './favs/favs.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    PrismaModule,
    UserModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavsModule,
  ],
})
export class AppModule {}
