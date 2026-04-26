-- AlterTable: Add userId column
ALTER TABLE "GaudiResponse" ADD COLUMN "userId" TEXT;

-- CreateIndex: Add unique constraint on userId
CREATE UNIQUE INDEX "GaudiResponse_userId_key" ON "GaudiResponse"("userId");
