/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Aluno" (
    "id_aluno" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nm_aluno" TEXT NOT NULL,
    "email_aluno" TEXT NOT NULL,
    "numero_aluno" TEXT NOT NULL,
    "idade_aluno" INTEGER NOT NULL,
    "data_nascimento" DATETIME NOT NULL,
    "peso" REAL NOT NULL,
    "altura" REAL NOT NULL,
    "genero_aluno" TEXT NOT NULL,
    "metas_aluno" TEXT,
    "deficiencias_aluno" TEXT,
    "id_personal" INTEGER NOT NULL,
    "nm_personal" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Treino" (
    "treino_gerado" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_aluno" INTEGER NOT NULL,
    "nm_aluno" TEXT NOT NULL,
    "id_personal" INTEGER NOT NULL,
    "nm_personal" TEXT NOT NULL,
    CONSTRAINT "Treino_id_aluno_fkey" FOREIGN KEY ("id_aluno") REFERENCES "Aluno" ("id_aluno") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_email_aluno_key" ON "Aluno"("email_aluno");
