-- CreateTable
CREATE TABLE `Medication` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `amount` INTEGER NOT NULL,
    `unitOfMeasure` VARCHAR(191) NOT NULL DEFAULT '',
    `hour` INTEGER NOT NULL,
    `minutes` INTEGER NOT NULL,
    `period` VARCHAR(191) NOT NULL DEFAULT '',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
