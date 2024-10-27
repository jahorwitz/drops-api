-- CreateTable
CREATE TABLE `_Goal_user` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_Goal_user_AB_unique`(`A`, `B`),
    INDEX `_Goal_user_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_Goal_user` ADD CONSTRAINT `_Goal_user_A_fkey` FOREIGN KEY (`A`) REFERENCES `Goal`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Goal_user` ADD CONSTRAINT `_Goal_user_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
