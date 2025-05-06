-- CreateTable
CREATE TABLE `Mood` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `mood_select` ENUM('great', 'good', 'average', 'soso', 'poor', 'distressed') NOT NULL,
    `my_check_timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `user` VARCHAR(191) NULL,

    INDEX `Mood_mood_select_idx`(`mood_select`),
    INDEX `Mood_user_idx`(`user`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Mood` ADD CONSTRAINT `Mood_user_fkey` FOREIGN KEY (`user`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
