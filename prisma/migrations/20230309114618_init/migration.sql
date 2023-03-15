-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "password" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "image" TEXT,
    "nombre" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'User',
    "sectorId" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sectors" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Sectors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_user_key" ON "User"("user");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "Sectors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
