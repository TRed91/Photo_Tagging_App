/*
  Warnings:

  - You are about to drop the column `playerId` on the `score` table. All the data in the column will be lost.
  - You are about to drop the `player` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `playerName` to the `score` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "score" DROP CONSTRAINT "score_playerId_fkey";

-- AlterTable
ALTER TABLE "score" DROP COLUMN "playerId",
ADD COLUMN     "playerName" TEXT NOT NULL;

-- DropTable
DROP TABLE "player";

-- CreateTable
CREATE TABLE "timeTrack" (
    "timeTrackId" SERIAL NOT NULL,
    "timeStart" TIMESTAMP(3) NOT NULL,
    "timeEnd" TIMESTAMP(3),

    CONSTRAINT "timeTrack_pkey" PRIMARY KEY ("timeTrackId")
);
