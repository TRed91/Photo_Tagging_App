/*
  Warnings:

  - Added the required column `characterId` to the `position` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "position" ADD COLUMN     "characterId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "character" (
    "characterId" SERIAL NOT NULL,
    "charName" TEXT NOT NULL,

    CONSTRAINT "character_pkey" PRIMARY KEY ("characterId")
);

-- CreateIndex
CREATE UNIQUE INDEX "character_charName_key" ON "character"("charName");

-- AddForeignKey
ALTER TABLE "position" ADD CONSTRAINT "position_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "character"("characterId") ON DELETE CASCADE ON UPDATE CASCADE;
