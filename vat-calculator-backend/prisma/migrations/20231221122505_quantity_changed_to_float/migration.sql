/*
  Warnings:

  - You are about to alter the column `amountPayed` on the `credittracker` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `totalAmount` on the `transaction` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `remainingAmount` on the `transaction` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.

*/
-- DropIndex
DROP INDEX `Item_createdBy_fkey` ON `item`;

-- DropIndex
DROP INDEX `SaleOrder_itemId_fkey` ON `saleorder`;

-- DropIndex
DROP INDEX `User_createdBy_fkey` ON `user`;

-- AlterTable
ALTER TABLE `credittracker` MODIFY `amountPayed` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `transaction` MODIFY `totalAmount` DOUBLE NOT NULL,
    MODIFY `remainingAmount` DOUBLE NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inventory` ADD CONSTRAINT `Inventory_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SaleOrder` ADD CONSTRAINT `SaleOrder_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SaleOrder` ADD CONSTRAINT `SaleOrder_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CreditTracker` ADD CONSTRAINT `CreditTracker_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
