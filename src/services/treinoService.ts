/**
 * Service Layer para gerenciamento de Treinos
 * Separa lógica de negócio da camada de apresentação
 */

import { prismaClient } from './db';
import Logger from '../lib/logger';
import { DatabaseError } from '../lib/errorHandler';
import type { Treino, CreateTreinoDTO, UpdateTreinoDTO } from '../types/treino.dto';

/**
 * Serviço de gerenciamento de treinos
 */
export class TreinoService {
  /**
   * Lista todos os treinos
   */
  async listarTreinos(): Promise<Treino[]> {
    try {
      Logger.debug('TreinoService: Listando todos os treinos');
      
      const treinos = await prismaClient.treino.findMany({
        orderBy: { id_treino: 'desc' },
      });

      Logger.info(`TreinoService: ${treinos.length} treinos encontrados`);
      return treinos;
    } catch (error) {
      Logger.error('TreinoService: Erro ao listar treinos', error);
      throw new DatabaseError('Não foi possível carregar os treinos');
    }
  }

  /**
   * Lista treinos de um aluno específico
   */
  async listarTreinosPorAluno(alunoId: string): Promise<Treino[]> {
    try {
      Logger.debug(`TreinoService: Listando treinos do aluno ${alunoId}`);
      
      const treinos = await prismaClient.treino.findMany({
        where: { id_aluno: alunoId },
        orderBy: { id_treino: 'desc' },
      });

      Logger.info(`TreinoService: ${treinos.length} treinos encontrados para o aluno`);
      return treinos;
    } catch (error) {
      Logger.error('TreinoService: Erro ao listar treinos por aluno', error);
      throw new DatabaseError('Não foi possível carregar os treinos do aluno');
    }
  }

  /**
   * Lista treinos de um personal específico
   */
  async listarTreinosPorPersonal(personalId: string): Promise<Treino[]> {
    try {
      Logger.debug(`TreinoService: Listando treinos do personal ${personalId}`);
      
      const treinos = await prismaClient.treino.findMany({
        where: { id_personal: personalId },
        orderBy: { id_treino: 'desc' },
      });

      Logger.info(`TreinoService: ${treinos.length} treinos encontrados para o personal`);
      return treinos;
    } catch (error) {
      Logger.error('TreinoService: Erro ao listar treinos por personal', error);
      throw new DatabaseError('Não foi possível carregar os treinos');
    }
  }

  /**
   * Busca um treino por ID
   */
  async buscarTreino(id: string): Promise<Treino | null> {
    try {
      Logger.debug(`TreinoService: Buscando treino com ID ${id}`);
      
      const treino = await prismaClient.treino.findUnique({
        where: { id_treino: id },
      });

      if (treino) {
        Logger.info(`TreinoService: Treino encontrado (ID: ${treino.id_treino})`);
      } else {
        Logger.warn(`TreinoService: Treino com ID ${id} não encontrado`);
      }

      return treino;
    } catch (error) {
      Logger.error('TreinoService: Erro ao buscar treino', error);
      throw new DatabaseError('Não foi possível buscar o treino');
    }
  }

  /**
   * Cria um novo treino
   */
  async criarTreino(data: CreateTreinoDTO): Promise<Treino> {
    try {
      Logger.debug('TreinoService: Criando novo treino', { alunoId: data.id_aluno });
      
      const treino = await prismaClient.treino.create({
        data,
      });

      Logger.info(`TreinoService: Treino criado com sucesso (ID: ${treino.id_treino})`);
      return treino;
    } catch (error) {
      Logger.error('TreinoService: Erro ao criar treino', error);
      throw new DatabaseError('Não foi possível criar o treino');
    }
  }

  /**
   * Atualiza dados de um treino
   */
  async atualizarTreino(id: string, data: UpdateTreinoDTO): Promise<Treino> {
    try {
      Logger.debug(`TreinoService: Atualizando treino ${id}`, data);
      
      const treino = await prismaClient.treino.update({
        where: { id_treino: id },
        data,
      });

      Logger.info(`TreinoService: Treino atualizado com sucesso (ID: ${treino.id_treino})`);
      return treino;
    } catch (error) {
      Logger.error('TreinoService: Erro ao atualizar treino', error);
      throw new DatabaseError('Não foi possível atualizar o treino');
    }
  }

  /**
   * Deleta um treino
   */
  async deletarTreino(id: string): Promise<void> {
    try {
      Logger.debug(`TreinoService: Deletando treino ${id}`);
      
      await prismaClient.treino.delete({
        where: { id_treino: id },
      });

      Logger.info(`TreinoService: Treino deletado com sucesso (ID: ${id})`);
    } catch (error) {
      Logger.error('TreinoService: Erro ao deletar treino', error);
      throw new DatabaseError('Não foi possível deletar o treino');
    }
  }
}

// Exporta instância singleton do serviço
export const treinoService = new TreinoService();
