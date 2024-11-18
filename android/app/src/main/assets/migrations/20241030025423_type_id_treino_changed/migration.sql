-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_aluno" (
    "id_aluno" TEXT NOT NULL PRIMARY KEY,
    "nm_aluno" TEXT NOT NULL,
    "email_aluno" TEXT NOT NULL,
    "numero_aluno" TEXT NOT NULL,
    "data_nascimento" DATETIME NOT NULL,
    "peso" REAL NOT NULL,
    "altura" REAL NOT NULL,
    "genero_aluno" TEXT NOT NULL,
    "metas_aluno" TEXT,
    "deficiencias_aluno" TEXT,
    "id_personal" TEXT NOT NULL,
    "nm_personal" TEXT NOT NULL,
    "id_treino" TEXT NOT NULL
);
INSERT INTO "new_aluno" ("altura", "data_nascimento", "deficiencias_aluno", "email_aluno", "genero_aluno", "id_aluno", "id_personal", "id_treino", "metas_aluno", "nm_aluno", "nm_personal", "numero_aluno", "peso") SELECT "altura", "data_nascimento", "deficiencias_aluno", "email_aluno", "genero_aluno", "id_aluno", "id_personal", "id_treino", "metas_aluno", "nm_aluno", "nm_personal", "numero_aluno", "peso" FROM "aluno";
DROP TABLE "aluno";
ALTER TABLE "new_aluno" RENAME TO "aluno";
CREATE UNIQUE INDEX "aluno_email_aluno_key" ON "aluno"("email_aluno");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
