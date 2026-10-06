-- CreateTable
CREATE TABLE "PengaturanLainnya" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "gambar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PengaturanLainnya_pkey" PRIMARY KEY ("id")
);
