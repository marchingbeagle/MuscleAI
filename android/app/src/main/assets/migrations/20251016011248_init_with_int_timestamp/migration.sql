-- CreateTable
CREATE TABLE "aluno" (
    "id_aluno" TEXT NOT NULL PRIMARY KEY,
    "nm_aluno" TEXT NOT NULL,
    "email_aluno" TEXT NOT NULL,
    "data_nascimento" INTEGER NOT NULL,
    "peso" REAL NOT NULL,
    "altura" REAL NOT NULL,
    "genero_aluno" TEXT NOT NULL,
    "deficiencias_aluno" TEXT,
    "id_personal" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Treino" (
    "id_treino" TEXT NOT NULL PRIMARY KEY,
    "treino_gerado" TEXT NOT NULL,
    "id_aluno" TEXT NOT NULL,
    "id_personal" TEXT NOT NULL,
    CONSTRAINT "Treino_id_aluno_fkey" FOREIGN KEY ("id_aluno") REFERENCES "aluno" ("id_aluno") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "aluno_email_aluno_key" ON "aluno"("email_aluno");
