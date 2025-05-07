-- CreateTable
CREATE TABLE `DietLog` (
    `id` VARCHAR(191) NOT NULL,
    `mealName` VARCHAR(191) NOT NULL DEFAULT '',
    `mealDescription` VARCHAR(191) NOT NULL DEFAULT '',
    `logTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `calories` INTEGER NOT NULL,
    `protein` INTEGER NULL,
    `carbs` INTEGER NULL,
    `fiber` INTEGER NULL,
    `sugar` INTEGER NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `user` VARCHAR(191) NULL,

    INDEX `DietLog_user_idx`(`user`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DietLog` ADD CONSTRAINT `DietLog_user_fkey` FOREIGN KEY (`user`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
