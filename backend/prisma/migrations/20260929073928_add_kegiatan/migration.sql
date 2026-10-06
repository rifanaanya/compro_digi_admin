-- CreateTable
CREATE TABLE "Kegiatan" (
    "id" SERIAL NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "caption" TEXT NOT NULL,
    "gambar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Kegiatan_pkey" PRIMARY KEY ("id")
);
