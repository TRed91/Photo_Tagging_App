/*
  Warnings:

  - Changed the type of `score` on the `score` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "score" DROP COLUMN "score",
ADD COLUMN     "score" INTEGER NOT NULL;
