/**
 * Hook useAlunos
 * Gerencia lista de alunos com loading e error states
 */

import { useState, useEffect } from "react";
import { alunoService } from "../services/alunoService";
import { ErrorHandler } from "../lib/errorHandler";
import Logger from "../lib/logger";
import type { Aluno } from "../types/aluno.dto";

interface UseAlunosResult {
  alunos: Aluno[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Hook para listar alunos
 */
export function useAlunos(treinadorId?: string): UseAlunosResult {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAlunos = async () => {
    setLoading(true);
    setError(null);

    try {
      Logger.debug("useAlunos: Carregando alunos");

      const data = treinadorId
        ? await alunoService.listarAlunosPorTreinador(treinadorId)
        : await alunoService.listarAlunos();

      setAlunos(data);
      Logger.info(`useAlunos: ${data.length} alunos carregados`);
    } catch (err) {
      const errorMessage = ErrorHandler.getErrorMessage(err);
      setError(errorMessage);
      Logger.error("useAlunos: Erro ao carregar alunos", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlunos();
  }, [treinadorId]);

  return {
    alunos,
    loading,
    error,
    refetch: fetchAlunos,
  };
}
