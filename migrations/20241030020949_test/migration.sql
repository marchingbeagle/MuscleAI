/*
  Warnings:

  - The primary key for the `Aluno` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idade_aluno` on the `Aluno` table. All the data in the column will be lost.
  - You are about to alter the column `id_aluno` on the `Aluno` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - You are about to alter the column `id_personal` on the `Aluno` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - The primary key for the `Treino` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `nm_aluno` on the `Treino` table. All the data in the column will be lost.
  - You are about to drop the column `nm_personal` on the `Treino` table. All the data in the column will be lost.
  - You are about to alter the column `id_aluno` on the `Treino` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - You are about to alter the column `id_personal` on the `Treino` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - Added the required column `id_treino` to the `Aluno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_treino` to the `Treino` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Aluno" (
    "id_aluno" BIGINT NOT NULL PRIMARY KEY,
    "nm_aluno" TEXT NOT NULL,
    "email_aluno" TEXT NOT NULL,
    "numero_aluno" TEXT NOT NULL,
    "data_nascimento" DATETIME NOT NULL,
    "peso" REAL NOT NULL,
    "altura" REAL NOT NULL,
    "genero_aluno" TEXT NOT NULL,
    "metas_aluno" TEXT,
    "deficiencias_aluno" TEXT,
    "id_personal" BIGINT NOT NULL,
    "nm_personal" TEXT NOT NULL,
    "id_treino" BIGINT NOT NULL
);
INSERT INTO "new_Aluno" ("altura", "data_nascimento", "deficiencias_aluno", "email_aluno", "genero_aluno", "id_aluno", "id_personal", "metas_aluno", "nm_aluno", "nm_personal", "numero_aluno", "peso") SELECT "altura", "data_nascimento", "deficiencias_aluno", "email_aluno", "genero_aluno", "id_aluno", "id_personal", "metas_aluno", "nm_aluno", "nm_personal", "numero_aluno", "peso" FROM "Aluno";
DROP TABLE "Aluno";
ALTER TABLE "new_Aluno" RENAME TO "Aluno";
CREATE UNIQUE INDEX "Aluno_email_aluno_key" ON "Aluno"("email_aluno");
CREATE TABLE "new_Treino" (
    "id_treino" BIGINT NOT NULL PRIMARY KEY,
    "treino_gerado" TEXT NOT NULL,
    "id_aluno" BIGINT NOT NULL,
    "id_personal" BIGINT NOT NULL,
    CONSTRAINT "Treino_id_aluno_fkey" FOREIGN KEY ("id_aluno") REFERENCES "Aluno" ("id_aluno") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Treino" ("id_aluno", "id_personal", "treino_gerado") SELECT "id_aluno", "id_personal", "treino_gerado" FROM "Treino";
DROP TABLE "Treino";
ALTER TABLE "new_Treino" RENAME TO "Treino";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
