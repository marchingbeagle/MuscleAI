/**
 * Service Layer para gerenciamento de Alunos
 * Separa lógica de negócio da camada de apresentação
 */

import { prismaClient } from './db';
import Logger from '../lib/logger';
import { DatabaseError } from '../lib/errorHandler';
import type { Aluno, CreateAlunoDTO, UpdateAlunoDTO } from '../types/aluno.dto';

/**
 * Serviço de gerenciamento de alunos
 */
export class AlunoService {
  /**
   * Lista todos os alunos ordenados por nome
   */
  async listarAlunos(): Promise<Aluno[]> {
    try {
      Logger.debug('AlunoService: Listando todos os alunos');
      
      const alunos = await prismaClient.aluno.findMany({
        orderBy: { nm_aluno: 'asc' },
      });

      Logger.info(`AlunoService: ${alunos.length} alunos encontrados`);
      return alunos;
    } catch (error) {
      Logger.error('AlunoService: Erro ao listar alunos', error);
      throw new DatabaseError('Não foi possível carregar os alunos');
    }
  }

  /**
   * Lista alunos de um treinador específico
   */
  async listarAlunosPorTreinador(treinadorId: string): Promise<Aluno[]> {
    try {
      Logger.debug(`AlunoService: Listando alunos do treinador ${treinadorId}`);
      
      const alunos = await prismaClient.aluno.findMany({
        where: { id_personal: treinadorId },
        orderBy: { nm_aluno: 'asc' },
      });

      Logger.info(`AlunoService: ${alunos.length} alunos encontrados para o treinador`);
      return alunos;
    } catch (error) {
      Logger.error('AlunoService: Erro ao listar alunos por treinador', error);
      throw new DatabaseError('Não foi possível carregar os alunos');
    }
  }

  /**
   * Lista os N alunos mais recentes
   */
  async listarAlunosRecentes(limit: number = 4): Promise<Aluno[]> {
    try {
      Logger.debug(`AlunoService: Listando ${limit} alunos recentes`);
      
      const alunos = await prismaClient.aluno.findMany({
        take: limit,
        orderBy: { nm_aluno: 'desc' },
      });

      Logger.info(`AlunoService: ${alunos.length} alunos recentes encontrados`);
      return alunos;
    } catch (error) {
      Logger.error('AlunoService: Erro ao listar alunos recentes', error);
      throw new DatabaseError('Não foi possível carregar os alunos recentes');
    }
  }

  /**
   * Busca um aluno por ID
   */
  async buscarAluno(id: string): Promise<Aluno | null> {
    try {
      Logger.debug(`AlunoService: Buscando aluno com ID ${id}`);
      
      const aluno = await prismaClient.aluno.findUnique({
        where: { id_aluno: id },
      });

      if (aluno) {
        Logger.info(`AlunoService: Aluno encontrado: ${aluno.nm_aluno}`);
      } else {
        Logger.warn(`AlunoService: Aluno com ID ${id} não encontrado`);
      }

      return aluno;
    } catch (error) {
      Logger.error('AlunoService: Erro ao buscar aluno', error);
      throw new DatabaseError('Não foi possível buscar o aluno');
    }
  }

  /**
   * Cria um novo aluno
   */
  async criarAluno(data: CreateAlunoDTO): Promise<Aluno> {
    try {
      Logger.debug('AlunoService: Criando novo aluno', { nome: data.nm_aluno });
      
      const aluno = await prismaClient.aluno.create({
        data,
      });

      Logger.info(`AlunoService: Aluno criado com sucesso: ${aluno.nm_aluno} (ID: ${aluno.id_aluno})`);
      return aluno;
    } catch (error) {
      Logger.error('AlunoService: Erro ao criar aluno', error);
      throw new DatabaseError('Não foi possível criar o aluno');
    }
  }

  /**
   * Atualiza dados de um aluno
   */
  async atualizarAluno(id: string, data: UpdateAlunoDTO): Promise<Aluno> {
    try {
      Logger.debug(`AlunoService: Atualizando aluno ${id}`, data);
      
      const aluno = await prismaClient.aluno.update({
        where: { id_aluno: id },
        data,
      });

      Logger.info(`AlunoService: Aluno atualizado com sucesso: ${aluno.nm_aluno}`);
      return aluno;
    } catch (error) {
      Logger.error('AlunoService: Erro ao atualizar aluno', error);
      throw new DatabaseError('Não foi possível atualizar o aluno');
    }
  }

  /**
   * Deleta um aluno
   */
  async deletarAluno(id: string): Promise<void> {
    try {
      Logger.debug(`AlunoService: Deletando aluno ${id}`);
      
      await prismaClient.aluno.delete({
        where: { id_aluno: id },
      });

      Logger.info(`AlunoService: Aluno deletado com sucesso (ID: ${id})`);
    } catch (error) {
      Logger.error('AlunoService: Erro ao deletar aluno', error);
      throw new DatabaseError('Não foi possível deletar o aluno');
    }
  }

  /**
   * Busca alunos por nome (pesquisa)
   */
  async buscarAlunosPorNome(nome: string): Promise<Aluno[]> {
    try {
      Logger.debug(`AlunoService: Buscando alunos com nome contendo: ${nome}`);
      
      const alunos = await prismaClient.aluno.findMany({
        where: {
          nm_aluno: {
            contains: nome,
          },
        },
        orderBy: { nm_aluno: 'asc' },
      });

      Logger.info(`AlunoService: ${alunos.length} alunos encontrados na busca`);
      return alunos;
    } catch (error) {
      Logger.error('AlunoService: Erro ao buscar alunos por nome', error);
      throw new DatabaseError('Não foi possível buscar os alunos');
    }
  }
}

// Exporta instância singleton do serviço
export const alunoService = new AlunoService();
