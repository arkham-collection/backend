-- AlterTable
ALTER TABLE "packs" ADD COLUMN     "parent_id" TEXT;

-- AddForeignKey
ALTER TABLE "packs" ADD CONSTRAINT "packs_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "packs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
