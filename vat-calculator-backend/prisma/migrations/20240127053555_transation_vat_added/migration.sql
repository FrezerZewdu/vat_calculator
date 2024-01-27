-- DropIndex
DROP INDEX `Item_createdBy_fkey` ON `item`;

-- DropIndex
DROP INDEX `SaleOrder_itemId_fkey` ON `saleorder`;

-- DropIndex
DROP INDEX `User_createdBy_fkey` ON `user`;

-- AlterTable
ALTER TABLE `transaction` ADD COLUMN `isVat` BOOLEAN NOT NULL DEFAULT false;

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
