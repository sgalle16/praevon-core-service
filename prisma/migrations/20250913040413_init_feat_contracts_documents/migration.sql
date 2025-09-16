/*
  Warnings:

  - The `status` column on the `Property` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Rental` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."PropertyStatus" AS ENUM ('AVAILABLE', 'RENTED', 'IN_PROCESS');

-- CreateEnum
CREATE TYPE "public"."RentalStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."ContractStatus" AS ENUM ('DRAFT', 'PENDING_SIGNATURE', 'SIGNED', 'ACTIVE', 'FINISHED');

-- CreateEnum
CREATE TYPE "public"."DocumentType" AS ENUM ('TENANT_ID_FRONT', 'TENANT_ID_BACK', 'TENANT_INCOME_PROOF', 'PROPERTY_PHOTO', 'PROPERTY_DEED');

-- CreateEnum
CREATE TYPE "public"."DocumentStatus" AS ENUM ('PENDING_VALIDATION', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "public"."Property" DROP COLUMN "status",
ADD COLUMN     "status" "public"."PropertyStatus" NOT NULL DEFAULT 'AVAILABLE';

-- AlterTable
ALTER TABLE "public"."Rental" DROP COLUMN "status",
ADD COLUMN     "status" "public"."RentalStatus" NOT NULL DEFAULT 'PENDING';

-- CreateTable
CREATE TABLE "public"."Contract" (
    "id" SERIAL NOT NULL,
    "rentalId" INTEGER NOT NULL,
    "propertyId" INTEGER NOT NULL,
    "tenantId" INTEGER NOT NULL,
    "landlordId" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "monthlyRent" DOUBLE PRECISION NOT NULL,
    "terms" TEXT NOT NULL,
    "status" "public"."ContractStatus" NOT NULL DEFAULT 'DRAFT',
    "contractPdfUrl" TEXT,
    "blockchainTxHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Document" (
    "id" SERIAL NOT NULL,
    "uniqueFileName" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "mimeType" TEXT,
    "storageUrl" TEXT NOT NULL,
    "size" INTEGER,
    "type" "public"."DocumentType" NOT NULL,
    "status" "public"."DocumentStatus" NOT NULL DEFAULT 'PENDING_VALIDATION',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "uploadedById" INTEGER NOT NULL,
    "propertyId" INTEGER,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Contract_rentalId_key" ON "public"."Contract"("rentalId");

-- CreateIndex
CREATE UNIQUE INDEX "Document_uniqueFileName_key" ON "public"."Document"("uniqueFileName");

-- AddForeignKey
ALTER TABLE "public"."Contract" ADD CONSTRAINT "Contract_rentalId_fkey" FOREIGN KEY ("rentalId") REFERENCES "public"."Rental"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Contract" ADD CONSTRAINT "Contract_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "public"."Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Contract" ADD CONSTRAINT "Contract_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Contract" ADD CONSTRAINT "Contract_landlordId_fkey" FOREIGN KEY ("landlordId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Document" ADD CONSTRAINT "Document_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Document" ADD CONSTRAINT "Document_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "public"."Property"("id") ON DELETE SET NULL ON UPDATE CASCADE;
