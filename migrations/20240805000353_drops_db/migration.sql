/*
  Warnings:

  - You are about to drop the column `my_integer` on the `activity` table. All the data in the column will be lost.
  - You are about to drop the column `my_text` on the `activity` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `activity` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Activity_my_integer_key` ON `activity`;

-- DropIndex
DROP INDEX `Activity_my_text_key` ON `activity`;

-- DropIndex
DROP INDEX `Activity_text_key` ON `activity`;

-- AlterTable
ALTER TABLE `activity` DROP COLUMN `my_integer`,
    DROP COLUMN `my_text`,
    DROP COLUMN `text`,
    ADD COLUMN `amount` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `name` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `unitOfMeasure` VARCHAR(191) NOT NULL DEFAULT ' ';

-- CreateTable
CREATE TABLE `_Activity_user` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_Activity_user_AB_unique`(`A`, `B`),
    INDEX `_Activity_user_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_Activity_user` ADD CONSTRAINT `_Activity_user_A_fkey` FOREIGN KEY (`A`) REFERENCES `Activity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Activity_user` ADD CONSTRAINT `_Activity_user_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
