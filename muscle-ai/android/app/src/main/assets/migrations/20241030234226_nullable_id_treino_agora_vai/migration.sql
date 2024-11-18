-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Treino" (
    "id_treino" TEXT NOT NULL PRIMARY KEY,
    "treino_gerado" TEXT NOT NULL,
    "id_aluno" TEXT,
    "id_personal" TEXT NOT NULL,
    CONSTRAINT "Treino_id_aluno_fkey" FOREIGN KEY ("id_aluno") REFERENCES "aluno" ("id_aluno") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Treino" ("id_aluno", "id_personal", "id_treino", "treino_gerado") SELECT "id_aluno", "id_personal", "id_treino", "treino_gerado" FROM "Treino";
DROP TABLE "Treino";
ALTER TABLE "new_Treino" RENAME TO "Treino";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
