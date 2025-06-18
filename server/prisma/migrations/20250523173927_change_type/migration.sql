/*
  Warnings:

  - You are about to alter the column `logo` on the `shop` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- AlterTable
ALTER TABLE `shop` MODIFY `logo` JSON NULL;
