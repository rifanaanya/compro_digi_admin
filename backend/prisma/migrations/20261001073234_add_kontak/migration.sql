-- CreateTable
CREATE TABLE "Kontak" (
    "id" SERIAL NOT NULL,
    "namaPengaturan" TEXT NOT NULL,
    "isiPengaturan" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Kontak_pkey" PRIMARY KEY ("id")
);
