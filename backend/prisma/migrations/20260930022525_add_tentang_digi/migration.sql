-- CreateTable
CREATE TABLE "TentangDigi" (
    "id" SERIAL NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "gambar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TentangDigi_pkey" PRIMARY KEY ("id")
);
