export interface Treino {
  id_treino: string;
  treino_gerado: string;
  id_aluno: string;
  id_personal: string;
  aluno: Aluno; // Add this line to match the Prisma schema
}
