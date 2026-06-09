/*
  Warnings:

  - The values [MEMBER,ADMIN] on the enum `role` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "priority" AS ENUM ('low', 'medium', 'high');

-- AlterEnum
BEGIN;
CREATE TYPE "role_new" AS ENUM ('member', 'admin');
ALTER TABLE "public"."users" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "role" TYPE "role_new" USING ("role"::text::"role_new");
ALTER TYPE "role" RENAME TO "role_old";
ALTER TYPE "role_new" RENAME TO "role";
DROP TYPE "public"."role_old";
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'member';
COMMIT;

-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "priority" "priority" NOT NULL DEFAULT 'medium';

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'member';
