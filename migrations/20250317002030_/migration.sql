/*
  Warnings:

  - The values [Activity,other] on the enum `Notification_my_select` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `notification` MODIFY `my_select` ENUM('Exercise', 'Diet', 'Glucose', 'Medication', 'Other') NOT NULL;
