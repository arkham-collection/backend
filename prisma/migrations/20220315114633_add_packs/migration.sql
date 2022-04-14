-- CreateTable
CREATE TABLE "packs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "cycle_position" INTEGER NOT NULL,
    "available_at" TIMESTAMP(3) NOT NULL,
    "known" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,

    CONSTRAINT "packs_pkey" PRIMARY KEY ("id")
);
