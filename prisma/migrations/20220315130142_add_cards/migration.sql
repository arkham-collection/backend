-- CreateTable
CREATE TABLE "cards" (
    "id" TEXT NOT NULL,
    "pack_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "traits" TEXT[],
    "faction_name" TEXT NOT NULL,
    "encounter_name" TEXT NOT NULL,
    "type_name" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "encounter_position" INTEGER NOT NULL,
    "double_sided" BOOLEAN NOT NULL,
    "image_src" TEXT,
    "back_image_src" TEXT,

    CONSTRAINT "cards_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_pack_id_fkey" FOREIGN KEY ("pack_id") REFERENCES "packs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
