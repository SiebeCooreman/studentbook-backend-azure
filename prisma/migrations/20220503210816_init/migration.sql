/*
  Warnings:

  - You are about to drop the column `chatId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the `Chat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ChatToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_chatId_fkey`;

-- DropForeignKey
ALTER TABLE `_ChatToUser` DROP FOREIGN KEY `_chattouser_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_ChatToUser` DROP FOREIGN KEY `_chattouser_ibfk_2`;

-- AlterTable
ALTER TABLE `Message` DROP COLUMN `chatId`;

-- DropTable
DROP TABLE `Chat`;

-- DropTable
DROP TABLE `_ChatToUser`;
