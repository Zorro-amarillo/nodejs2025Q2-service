import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';

@Module({
  controllers: [],
  providers: [],
  imports: [UserModule, ArtistModule, AlbumModule],
})
export class AppModule {}
