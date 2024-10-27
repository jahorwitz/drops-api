-- CreateTable
CREATE TABLE `Activity` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `amount` INTEGER NULL DEFAULT 0,
    `unitOfMeasure` VARCHAR(191) NOT NULL DEFAULT '',
    `my_start_timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `my_end_timestamp` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userid` VARCHAR(191) NULL,

    INDEX `Activity_userid_idx`(`userid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Goal` (
    `id` VARCHAR(191) NOT NULL,
    `my_select` ENUM('Exercise', 'Diet') NOT NULL,
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `amount` INTEGER NOT NULL,
    `unitOfMeasure` VARCHAR(191) NOT NULL DEFAULT '',
    `my_multiselect` JSON NOT NULL,
    `user` VARCHAR(191) NULL,

    INDEX `Goal_my_select_idx`(`my_select`),
    INDEX `Goal_user_idx`(`user`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notification` (
    `id` VARCHAR(191) NOT NULL,
    `my_select` ENUM('Activity', 'Diet', 'Glucose', 'Medicaton', 'other') NOT NULL,
    `description` VARCHAR(191) NOT NULL DEFAULT '',
    `notificationTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` VARCHAR(191) NULL DEFAULT 'new',
    `archivedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `user` VARCHAR(191) NULL,

    INDEX `Notification_my_select_idx`(`my_select`),
    INDEX `Notification_user_idx`(`user`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `email` VARCHAR(191) NOT NULL DEFAULT '',
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `lastLoginDate` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dateOfBirth` DATETIME(3) NULL,
    `weight` INTEGER NULL,
    `height` INTEGER NULL,
    `sex` VARCHAR(191) NULL,
    `diabetesType` JSON NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Activity` ADD CONSTRAINT `Activity_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Goal` ADD CONSTRAINT `Goal_user_fkey` FOREIGN KEY (`user`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_user_fkey` FOREIGN KEY (`user`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
