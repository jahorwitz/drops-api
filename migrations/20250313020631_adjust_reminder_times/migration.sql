/*
  Warnings:

  - You are about to alter the column `reminder` on the `notification` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `Enum(EnumId(2))`.

*/
-- AlterTable
ALTER TABLE `notification` MODIFY `reminder` ENUM('min15', 'min30', 'hour1', 'hour2', 'hour3') NULL;
