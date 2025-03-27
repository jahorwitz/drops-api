-- AlterTable
ALTER TABLE `user` ADD COLUMN `isOnboardingComplete` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isRegistrationComplete` BOOLEAN NOT NULL DEFAULT false;
