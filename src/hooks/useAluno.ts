/**
 * Hook useAluno
 * Gerencia um aluno individual por ID
 */

import { useState, useEffect } from "react";
import { alunoService } from "../services/alunoService";
import { ErrorHandler } from "../lib/errorHandler";
import Logger from "../lib/logger";
import type { Aluno } from "../types/aluno.dto";

interface UseAlunoResult {
  aluno: Aluno | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Hook para buscar um aluno por ID
 */
export function useAluno(id: string | null | undefined): UseAlunoResult {
  const [aluno, setAluno] = useState<Aluno | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAluno = async () => {
    if (!id) {
      setAluno(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      Logger.debug(`useAluno: Carregando aluno ${id}`);

      const data = await alunoService.buscarAluno(id);
      setAluno(data);

      if (data) {
        Logger.info(`useAluno: Aluno carregado: ${data.nm_aluno}`);
      } else {
        Logger.warn(`useAluno: Aluno não encontrado: ${id}`);
      }
    } catch (err) {
      const errorMessage = ErrorHandler.getErrorMessage(err);
      setError(errorMessage);
      Logger.error("useAluno: Erro ao carregar aluno", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAluno();
  }, [id]);

  return {
    aluno,
    loading,
    error,
    refetch: fetchAluno,
  };
}
