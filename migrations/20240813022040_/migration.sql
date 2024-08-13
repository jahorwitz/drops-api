/*
  Warnings:

  - You are about to drop the `_Activity_user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `activity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_Activity_user` DROP FOREIGN KEY `_Activity_user_B_fkey`;

-- DropTable
DROP TABLE `_Activity_user`;

-- DropTable
DROP TABLE `activity`;

-- CreateTable
CREATE TABLE `Activity` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `amount` INTEGER NULL DEFAULT 0,
    `unitOfMeasure` VARCHAR(191) NOT NULL DEFAULT ' ',
    `my_start_timestamp` DATETIME(3) NOT NULL DEFAULT '2020-10-05T00:00:00-07:00',
    `my_end_timestamp` DATETIME(3) NULL DEFAULT '2020-10-05T00:00:00-07:00',
    `userid` VARCHAR(191) NULL,

    UNIQUE INDEX `Activity_my_start_timestamp_key`(`my_start_timestamp`),
    UNIQUE INDEX `Activity_my_end_timestamp_key`(`my_end_timestamp`),
    INDEX `Activity_userid_idx`(`userid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Activity` ADD CONSTRAINT `Activity_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
