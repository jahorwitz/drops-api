-- AlterTable
ALTER TABLE `Notification` MODIFY `my_select` ENUM('Activity', 'Diet', 'Glucose', 'Medicaton', 'Mood', 'other') NOT NULL;
