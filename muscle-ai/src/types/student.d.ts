export interface Aluno {
  id_aluno: string;
  nm_aluno: string;
  email_aluno: string;
  data_nascimento: Date;
  peso: number;
  altura: number;
  genero_aluno: string;
  metas_aluno?: string;
  deficiencias_aluno?: string;
  id_personal: string;
  treinos: Treino[];
}
