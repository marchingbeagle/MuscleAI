/**
 * Hook useTreinos
 * Gerencia lista de treinos com loading e error states
 */

import { useState, useEffect } from "react";
import { treinoService } from "../services/treinoService";
import { ErrorHandler } from "../lib/errorHandler";
import Logger from "../lib/logger";
import type { Treino } from "../types/treino.dto";

interface UseTreinosResult {
  treinos: Treino[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

interface UseTreinosOptions {
  alunoId?: string;
  personalId?: string;
}

/**
 * Hook para listar treinos
 */
export function useTreinos(options?: UseTreinosOptions): UseTreinosResult {
  const [treinos, setTreinos] = useState<Treino[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTreinos = async () => {
    setLoading(true);
    setError(null);

    try {
      Logger.debug("useTreinos: Carregando treinos", options);

      let data: Treino[];

      if (options?.alunoId) {
        data = await treinoService.listarTreinosPorAluno(options.alunoId);
      } else if (options?.personalId) {
        data = await treinoService.listarTreinosPorPersonal(options.personalId);
      } else {
        data = await treinoService.listarTreinos();
      }

      setTreinos(data);
      Logger.info(`useTreinos: ${data.length} treinos carregados`);
    } catch (err) {
      const errorMessage = ErrorHandler.getErrorMessage(err);
      setError(errorMessage);
      Logger.error("useTreinos: Erro ao carregar treinos", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTreinos();
  }, [options?.alunoId, options?.personalId]);

  return {
    treinos,
    loading,
    error,
    refetch: fetchTreinos,
  };
}
