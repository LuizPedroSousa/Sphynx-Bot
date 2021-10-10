/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - Added the required column `discriminator` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serverId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "email",
DROP COLUMN "password",
ADD COLUMN     "discriminator" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "serverId" TEXT NOT NULL,
ADD COLUMN     "system" BOOLEAN DEFAULT false,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "insertedAt" SET DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Server" (
    "id" TEXT NOT NULL,
    "idDiscord" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "prefix" TEXT NOT NULL,

    CONSTRAINT "Server_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ServerToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Server_id_key" ON "Server"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Server_idDiscord_key" ON "Server"("idDiscord");

-- CreateIndex
CREATE UNIQUE INDEX "_ServerToUser_AB_unique" ON "_ServerToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ServerToUser_B_index" ON "_ServerToUser"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Server"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ServerToUser" ADD FOREIGN KEY ("A") REFERENCES "Server"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ServerToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
