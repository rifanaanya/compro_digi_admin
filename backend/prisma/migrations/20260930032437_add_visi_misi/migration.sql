-- CreateTable
CREATE TABLE "VisiMisi" (
    "id" SERIAL NOT NULL,
    "visi" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VisiMisi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Misi" (
    "id" SERIAL NOT NULL,
    "isi" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "visiMisiId" INTEGER NOT NULL,

    CONSTRAINT "Misi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Misi_visiMisiId_idx" ON "Misi"("visiMisiId");

-- CreateIndex
CREATE INDEX "Misi_sortOrder_idx" ON "Misi"("sortOrder");

-- AddForeignKey
ALTER TABLE "Misi" ADD CONSTRAINT "Misi_visiMisiId_fkey" FOREIGN KEY ("visiMisiId") REFERENCES "VisiMisi"("id") ON DELETE CASCADE ON UPDATE CASCADE;
