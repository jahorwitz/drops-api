/*
  Warnings:

  - Made the column `notificationTime` on table `notification` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `notification` MODIFY `notificationTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
