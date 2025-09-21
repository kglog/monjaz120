/*
  Warnings:

  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Service" ADD COLUMN "image" TEXT;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Order";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;
