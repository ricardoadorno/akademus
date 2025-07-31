-- CreateEnum
CREATE TYPE "public"."NodeType" AS ENUM ('TEXT', 'IMAGE', 'VIDEO', 'AUDIO');

-- CreateTable
CREATE TABLE "public"."nodes" (
    "id" SERIAL NOT NULL,
    "course_id" INTEGER NOT NULL,
    "type" "public"."NodeType" NOT NULL DEFAULT 'TEXT',
    "content" TEXT NOT NULL,
    "is_flashcard" BOOLEAN NOT NULL DEFAULT false,
    "is_quiz_item" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "nodes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "nodes_course_id_idx" ON "public"."nodes"("course_id");

-- AddForeignKey
ALTER TABLE "public"."nodes" ADD CONSTRAINT "nodes_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
