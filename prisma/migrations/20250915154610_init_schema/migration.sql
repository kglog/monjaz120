/*
  Warnings:

  - You are about to drop the column `image` on the `Service` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "serviceId" TEXT NOT NULL,
    CONSTRAINT "Order_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Service" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Service" ("createdAt", "description", "id", "price", "title") SELECT "createdAt", "description", "id", "price", "title" FROM "Service";
DROP TABLE "Service";
ALTER TABLE "new_Service" RENAME TO "Service";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
