/*
  Warnings:

  - You are about to drop the column `id_treino` on the `aluno` table. All the data in the column will be lost.
  - Made the column `id_aluno` on table `Treino` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Treino" (
    "id_treino" TEXT NOT NULL PRIMARY KEY,
    "treino_gerado" TEXT NOT NULL,
    "id_aluno" TEXT NOT NULL,
    "id_personal" TEXT NOT NULL,
    CONSTRAINT "Treino_id_aluno_fkey" FOREIGN KEY ("id_aluno") REFERENCES "aluno" ("id_aluno") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Treino" ("id_aluno", "id_personal", "id_treino", "treino_gerado") SELECT "id_aluno", "id_personal", "id_treino", "treino_gerado" FROM "Treino";
DROP TABLE "Treino";
ALTER TABLE "new_Treino" RENAME TO "Treino";
CREATE TABLE "new_aluno" (
    "id_aluno" TEXT NOT NULL PRIMARY KEY,
    "nm_aluno" TEXT NOT NULL,
    "email_aluno" TEXT NOT NULL,
    "data_nascimento" DATETIME NOT NULL,
    "peso" REAL NOT NULL,
    "altura" REAL NOT NULL,
    "genero_aluno" TEXT NOT NULL,
    "metas_aluno" TEXT,
    "deficiencias_aluno" TEXT,
    "id_personal" TEXT NOT NULL
);
INSERT INTO "new_aluno" ("altura", "data_nascimento", "deficiencias_aluno", "email_aluno", "genero_aluno", "id_aluno", "id_personal", "metas_aluno", "nm_aluno", "peso") SELECT "altura", "data_nascimento", "deficiencias_aluno", "email_aluno", "genero_aluno", "id_aluno", "id_personal", "metas_aluno", "nm_aluno", "peso" FROM "aluno";
DROP TABLE "aluno";
ALTER TABLE "new_aluno" RENAME TO "aluno";
CREATE UNIQUE INDEX "aluno_email_aluno_key" ON "aluno"("email_aluno");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
