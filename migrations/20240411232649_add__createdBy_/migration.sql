-- AlterTable
ALTER TABLE `Medication` ADD COLUMN `createdBy` VARCHAR(191) NULL;

-- CreateIndex
CREATE INDEX `Medication_createdBy_idx` ON `Medication`(`createdBy`);

-- AddForeignKey
ALTER TABLE `Medication` ADD CONSTRAINT `Medication_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
