/*
  Warnings:

  - Added the required column `dateOfBirth` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `diabetesType` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sex` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `dateOfBirth` DATETIME(3) NOT NULL,
    ADD COLUMN `diabetesType` VARCHAR(191) NOT NULL,
    ADD COLUMN `height` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `sex` VARCHAR(191) NOT NULL,
    ADD COLUMN `weight` INTEGER NOT NULL;
