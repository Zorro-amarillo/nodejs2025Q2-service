-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "artists" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "grammy" BOOLEAN NOT NULL,

    CONSTRAINT "artists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "albums" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "artistId" TEXT,

    CONSTRAINT "albums_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tracks" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "artistId" TEXT,
    "albumId" TEXT,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "tracks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorites" (
    "id" TEXT NOT NULL,

    CONSTRAINT "favorites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorite_artists" (
    "id" TEXT NOT NULL,
    "favoritesId" TEXT NOT NULL,
    "artistId" TEXT NOT NULL,

    CONSTRAINT "favorite_artists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorite_albums" (
    "id" TEXT NOT NULL,
    "favoritesId" TEXT NOT NULL,
    "albumId" TEXT NOT NULL,

    CONSTRAINT "favorite_albums_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorite_tracks" (
    "id" TEXT NOT NULL,
    "favoritesId" TEXT NOT NULL,
    "trackId" TEXT NOT NULL,

    CONSTRAINT "favorite_tracks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "favorite_artists_favoritesId_artistId_key" ON "favorite_artists"("favoritesId", "artistId");

-- CreateIndex
CREATE UNIQUE INDEX "favorite_albums_favoritesId_albumId_key" ON "favorite_albums"("favoritesId", "albumId");

-- CreateIndex
CREATE UNIQUE INDEX "favorite_tracks_favoritesId_trackId_key" ON "favorite_tracks"("favoritesId", "trackId");

-- AddForeignKey
ALTER TABLE "albums" ADD CONSTRAINT "albums_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tracks" ADD CONSTRAINT "tracks_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tracks" ADD CONSTRAINT "tracks_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite_artists" ADD CONSTRAINT "favorite_artists_favoritesId_fkey" FOREIGN KEY ("favoritesId") REFERENCES "favorites"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite_artists" ADD CONSTRAINT "favorite_artists_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite_albums" ADD CONSTRAINT "favorite_albums_favoritesId_fkey" FOREIGN KEY ("favoritesId") REFERENCES "favorites"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite_albums" ADD CONSTRAINT "favorite_albums_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite_tracks" ADD CONSTRAINT "favorite_tracks_favoritesId_fkey" FOREIGN KEY ("favoritesId") REFERENCES "favorites"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite_tracks" ADD CONSTRAINT "favorite_tracks_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "tracks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
