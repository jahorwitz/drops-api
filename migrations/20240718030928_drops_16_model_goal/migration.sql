-- CreateTable
CREATE TABLE `Goal` (
    `id` VARCHAR(191) NOT NULL,
    `my_select` ENUM('Exercise', 'Diet') NOT NULL,
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `amount` INTEGER NOT NULL,
    `unitOfMeasure` VARCHAR(191) NOT NULL DEFAULT '',
    `my_multiselect` JSON NOT NULL,

    INDEX `Goal_my_select_idx`(`my_select`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
