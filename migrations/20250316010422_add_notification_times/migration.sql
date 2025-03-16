/*
  Warnings:

  - You are about to drop the column `archivedAt` on the `notification` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `notification` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `notification` table. All the data in the column will be lost.
  - You are about to drop the column `notificationTime` on the `notification` table. All the data in the column will be lost.
  - You are about to drop the column `reminder` on the `notification` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `notification` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `notification` DROP COLUMN `archivedAt`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `duration`,
    DROP COLUMN `notificationTime`,
    DROP COLUMN `reminder`,
    DROP COLUMN `status`;

-- CreateTable
CREATE TABLE `NotificationTime` (
    `id` VARCHAR(191) NOT NULL,
    `notificationTime` VARCHAR(191) NOT NULL DEFAULT '',
    `status` VARCHAR(191) NULL DEFAULT 'new',
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `archivedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `notification` VARCHAR(191) NULL,

    INDEX `NotificationTime_notification_idx`(`notification`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `NotificationTime` ADD CONSTRAINT `NotificationTime_notification_fkey` FOREIGN KEY (`notification`) REFERENCES `Notification`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
