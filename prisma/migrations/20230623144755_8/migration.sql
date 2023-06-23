-- DropForeignKey
ALTER TABLE `document` DROP FOREIGN KEY `Document_authorId_fkey`;

-- AlterTable
ALTER TABLE `document` MODIFY `authorId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Document` ADD CONSTRAINT `Document_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
