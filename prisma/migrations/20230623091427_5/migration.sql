/*
  Warnings:

  - You are about to drop the column `atachment` on the `document` table. All the data in the column will be lost.
  - Added the required column `attachment` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `document` DROP COLUMN `atachment`,
    ADD COLUMN `attachment` VARCHAR(191) NOT NULL;
