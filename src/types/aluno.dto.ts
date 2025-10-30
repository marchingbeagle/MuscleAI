/**
 * Data Transfer Objects (DTOs) para Alunos
 * Define tipos seguros para operações CRUD
 * Baseado no schema real do Prisma
 */

/**
 * Tipo completo de Aluno do banco de dados
 */
export interface Aluno {
  id_aluno: string;
  nm_aluno: string;
  email_aluno: string;
  data_nascimento: Date;
  peso: number;
  altura: number;
  genero_aluno: string;
  deficiencias_aluno: string | null;
  id_personal: string;
}

/**
 * DTO para criar novo aluno (sem id)
 */
export interface CreateAlunoDTO {
  nm_aluno: string;
  email_aluno: string;
  data_nascimento: Date;
  peso: number;
  altura: number;
  genero_aluno: string;
  deficiencias_aluno?: string | null;
  id_personal: string;
}

/**
 * DTO para atualizar aluno (campos opcionais)
 */
export interface UpdateAlunoDTO {
  nm_aluno?: string;
  email_aluno?: string;
  data_nascimento?: Date;
  peso?: number;
  altura?: number;
  genero_aluno?: string;
  deficiencias_aluno?: string | null;
}

/**
 * DTO para listagem de alunos (campos essenciais)
 */
export interface AlunoListDTO {
  id_aluno: string;
  nm_aluno: string;
  email_aluno: string;
  genero_aluno: string;
}
