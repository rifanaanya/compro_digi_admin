-- CreateTable
CREATE TABLE "HomeSetting" (
    "id" SERIAL NOT NULL,
    "slogan" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HomeSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HomeCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "homeSettingId" INTEGER NOT NULL,

    CONSTRAINT "HomeCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "HomeCategory_homeSettingId_idx" ON "HomeCategory"("homeSettingId");

-- CreateIndex
CREATE INDEX "HomeCategory_sortOrder_idx" ON "HomeCategory"("sortOrder");

-- AddForeignKey
ALTER TABLE "HomeCategory" ADD CONSTRAINT "HomeCategory_homeSettingId_fkey" FOREIGN KEY ("homeSettingId") REFERENCES "HomeSetting"("id") ON DELETE CASCADE ON UPDATE CASCADE;
