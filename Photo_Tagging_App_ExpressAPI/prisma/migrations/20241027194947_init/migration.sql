-- CreateTable
CREATE TABLE "player" (
    "playerId" SERIAL NOT NULL,
    "playerName" TEXT NOT NULL,

    CONSTRAINT "player_pkey" PRIMARY KEY ("playerId")
);

-- CreateTable
CREATE TABLE "score" (
    "scoreId" SERIAL NOT NULL,
    "score" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,
    "imageId" INTEGER NOT NULL,

    CONSTRAINT "score_pkey" PRIMARY KEY ("scoreId")
);

-- CreateTable
CREATE TABLE "image" (
    "imageId" SERIAL NOT NULL,
    "imageName" TEXT NOT NULL,
    "imageURL" TEXT NOT NULL,

    CONSTRAINT "image_pkey" PRIMARY KEY ("imageId")
);

-- CreateTable
CREATE TABLE "position" (
    "positionId" SERIAL NOT NULL,
    "xPosition" INTEGER NOT NULL,
    "yPosition" INTEGER NOT NULL,
    "imageId" INTEGER NOT NULL,

    CONSTRAINT "position_pkey" PRIMARY KEY ("positionId")
);

-- AddForeignKey
ALTER TABLE "score" ADD CONSTRAINT "score_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "player"("playerId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "score" ADD CONSTRAINT "score_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "image"("imageId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "position" ADD CONSTRAINT "position_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "image"("imageId") ON DELETE CASCADE ON UPDATE CASCADE;
