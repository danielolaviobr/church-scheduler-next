-- CreateTable
CREATE TABLE "celula" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "scheduled_to" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "max_capacity" (
    "id" SERIAL NOT NULL,
    "event" TEXT NOT NULL,
    "max_capacity" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "max_capacity.event_unique" ON "max_capacity"("event");
