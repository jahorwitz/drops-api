-- DropIndex
DROP INDEX `Activity_my_end_timestamp_key` ON `Activity`;

-- DropIndex
DROP INDEX `Activity_my_start_timestamp_key` ON `Activity`;

-- AlterTable
ALTER TABLE `Activity` MODIFY `unitOfMeasure` VARCHAR(191) NOT NULL DEFAULT '';
