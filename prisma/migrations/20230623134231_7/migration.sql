/*
  Warnings:

  - Made the column `views` on table `document` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `document` MODIFY `views` INTEGER NOT NULL DEFAULT 0;
