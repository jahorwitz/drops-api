/*
  Warnings:

  - The values [Medicaton] on the enum `Notification_my_select` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Notification` MODIFY `my_select` ENUM('Activity', 'Diet', 'Glucose', 'Medication', 'Mood', 'other') NOT NULL;
