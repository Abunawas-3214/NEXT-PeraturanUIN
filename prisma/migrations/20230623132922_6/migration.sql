-- AlterTable
ALTER TABLE `document` MODIFY `views` INTEGER NULL DEFAULT 0,
    MODIFY `attachment` VARCHAR(191) NULL;
