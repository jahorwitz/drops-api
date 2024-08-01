-- CreateTable
CREATE TABLE `Activity` (
    `id` VARCHAR(191) NOT NULL,
    `my_text` VARCHAR(40) NOT NULL DEFAULT '...',
    `my_integer` INTEGER NULL DEFAULT 0,
    `text` VARCHAR(40) NOT NULL DEFAULT '...',
    `my_start_timestamp` DATETIME(3) NOT NULL DEFAULT '2020-10-05T00:00:00-07:00',
    `my_end_timestamp` DATETIME(3) NULL DEFAULT '2020-10-05T00:00:00-07:00',

    UNIQUE INDEX `Activity_my_text_key`(`my_text`),
    UNIQUE INDEX `Activity_my_integer_key`(`my_integer`),
    UNIQUE INDEX `Activity_text_key`(`text`),
    UNIQUE INDEX `Activity_my_start_timestamp_key`(`my_start_timestamp`),
    UNIQUE INDEX `Activity_my_end_timestamp_key`(`my_end_timestamp`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
