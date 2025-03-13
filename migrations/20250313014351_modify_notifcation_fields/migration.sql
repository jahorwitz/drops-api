/*
  Warnings:

  - You are about to drop the column `description` on the `notification` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `notification` DROP COLUMN `description`,
    ADD COLUMN `days` JSON NOT NULL,
    ADD COLUMN `duration` INTEGER NULL DEFAULT 0,
    ADD COLUMN `name` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `reminder` DATETIME(3) NULL;
