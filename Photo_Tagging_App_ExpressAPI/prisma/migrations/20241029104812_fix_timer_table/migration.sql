/*
  Warnings:

  - The `timeEnd` column on the `timeTrack` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `timeStart` on the `timeTrack` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "timeTrack" DROP COLUMN "timeStart",
ADD COLUMN     "timeStart" BIGINT NOT NULL,
DROP COLUMN "timeEnd",
ADD COLUMN     "timeEnd" BIGINT;
