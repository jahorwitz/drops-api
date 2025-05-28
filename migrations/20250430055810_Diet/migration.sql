-- CreateTable
CREATE TABLE `Diet` (
    `id` VARCHAR(191) NOT NULL,
    `mealsPerDay` INTEGER NULL,
    `snacksPerDay` INTEGER NULL,
    `carbsPerDay` INTEGER NULL,
    `fiberPerDay` INTEGER NULL,
    `waterPerDay` INTEGER NULL,
    `calorieLimit` INTEGER NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `user` VARCHAR(191) NULL,

    UNIQUE INDEX `Diet_user_key`(`user`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Diet` ADD CONSTRAINT `Diet_user_fkey` FOREIGN KEY (`user`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
