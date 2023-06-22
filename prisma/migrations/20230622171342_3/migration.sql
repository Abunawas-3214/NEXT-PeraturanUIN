/*
  Warnings:

  - You are about to drop the column `documentLevel` on the `document` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `document` DROP COLUMN `documentLevel`,
    ADD COLUMN `visibility` ENUM('PUBLIC', 'PRIVATE', 'PROTECTED', 'HIDEN') NOT NULL DEFAULT 'PUBLIC';
