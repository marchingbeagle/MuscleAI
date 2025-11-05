import { renderHook, waitFor } from "@testing-library/react-native";
import { useTreinos } from "../useTreinos";
import { treinoService } from "../../services/treinoService";
import { ErrorHandler } from "../../lib/errorHandler";
import Logger from "../../lib/logger";
import type { Treino } from "../../types/treino.dto";

// Mocks
jest.mock("../../services/treinoService");
jest.mock("../../lib/errorHandler");
jest.mock("../../lib/logger");

describe("useTreinos", () => {
  const mockTreinos: Treino[] = [
    {
      id_treino: "1",
      treino_gerado: "Treino 1",
      id_aluno: "aluno-1",
      id_personal: "personal-1",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id_treino: "2",
      treino_gerado: "Treino 2",
      id_aluno: "aluno-1",
      id_personal: "personal-1",
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve carregar todos os treinos", async () => {
    (treinoService.listarTreinos as jest.Mock).mockResolvedValue(mockTreinos);

    const { result } = renderHook(() => useTreinos());

    expect(result.current.loading).toBe(true);
    expect(result.current.treinos).toEqual([]);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.treinos).toEqual(mockTreinos);
    expect(result.current.error).toBeNull();
    expect(treinoService.listarTreinos).toHaveBeenCalled();
  });

  it("deve carregar treinos por aluno", async () => {
    (treinoService.listarTreinosPorAluno as jest.Mock).mockResolvedValue(
      mockTreinos
    );

    const { result } = renderHook(() =>
      useTreinos({ alunoId: "aluno-1" })
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.treinos).toEqual(mockTreinos);
    expect(treinoService.listarTreinosPorAluno).toHaveBeenCalledWith("aluno-1");
  });

  it("deve carregar treinos por personal", async () => {
    (treinoService.listarTreinosPorPersonal as jest.Mock).mockResolvedValue(
      mockTreinos
    );

    const { result } = renderHook(() =>
      useTreinos({ personalId: "personal-1" })
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.treinos).toEqual(mockTreinos);
    expect(treinoService.listarTreinosPorPersonal).toHaveBeenCalledWith(
      "personal-1"
    );
  });

  it("deve tratar erro ao carregar treinos", async () => {
    const error = new Error("Erro ao carregar");
    (treinoService.listarTreinos as jest.Mock).mockRejectedValue(error);
    (ErrorHandler.getErrorMessage as jest.Mock).mockReturnValue(
      "Erro ao carregar treinos"
    );

    const { result } = renderHook(() => useTreinos());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.treinos).toEqual([]);
    expect(result.current.error).toBe("Erro ao carregar treinos");
    expect(Logger.error).toHaveBeenCalled();
  });

  it("deve recarregar treinos quando refetch é chamado", async () => {
    (treinoService.listarTreinos as jest.Mock).mockResolvedValue(mockTreinos);

    const { result } = renderHook(() => useTreinos());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(treinoService.listarTreinos).toHaveBeenCalledTimes(1);

    // Chama refetch
    await result.current.refetch();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(treinoService.listarTreinos).toHaveBeenCalledTimes(2);
  });

  it("deve recarregar quando alunoId muda", async () => {
    (treinoService.listarTreinosPorAluno as jest.Mock).mockResolvedValue(
      mockTreinos
    );

    const { result, rerender } = renderHook(
      (props) => useTreinos(props?.options),
      {
        initialProps: { options: { alunoId: "aluno-1" } },
      }
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(treinoService.listarTreinosPorAluno).toHaveBeenCalledWith("aluno-1");

    // Muda alunoId
    rerender({ options: { alunoId: "aluno-2" } });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(treinoService.listarTreinosPorAluno).toHaveBeenCalledWith("aluno-2");
  });

  it("deve limpar erro ao recarregar com sucesso", async () => {
    const error = new Error("Erro ao carregar");
    (treinoService.listarTreinos as jest.Mock)
      .mockRejectedValueOnce(error)
      .mockResolvedValueOnce(mockTreinos);
    (ErrorHandler.getErrorMessage as jest.Mock).mockReturnValue(
      "Erro ao carregar treinos"
    );

    const { result } = renderHook(() => useTreinos());

    await waitFor(() => {
      expect(result.current.error).toBeTruthy();
    });

    // Recarrega com sucesso
    await result.current.refetch();

    await waitFor(() => {
      expect(result.current.error).toBeNull();
    });
  });
});

