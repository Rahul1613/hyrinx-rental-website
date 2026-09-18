/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `PricingPlan` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PricingPlan_name_key" ON "PricingPlan"("name");
