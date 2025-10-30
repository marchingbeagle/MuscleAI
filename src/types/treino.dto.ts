/**
 * Data Transfer Objects (DTOs) para Treinos
 * Define tipos seguros para operações CRUD
 * Baseado no schema real do Prisma
 */

/**
 * Tipo completo de Treino do banco de dados
 */
export interface Treino {
  id_treino: string;
  treino_gerado: string;
  id_aluno: string;
  id_personal: string;
}

/**
 * DTO para criar novo treino
 */
export interface CreateTreinoDTO {
  treino_gerado: string;
  id_aluno: string;
  id_personal: string;
}

/**
 * DTO para atualizar treino
 */
export interface UpdateTreinoDTO {
  treino_gerado?: string;
}

/**
 * DTO para listagem de treinos
 */
export interface TreinoListDTO {
  id_treino: string;
  treino_gerado: string;
  id_aluno: string;
}
