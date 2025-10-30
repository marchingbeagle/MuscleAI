import { renderHook, waitFor } from "@testing-library/react-native";
import { useAluno } from "../useAluno";
import { alunoService } from "../../services/alunoService";
import type { Aluno } from "../../types/aluno.dto";

// Mock do alunoService
jest.mock("../../services/alunoService");

describe("useAluno", () => {
  const mockAluno: Aluno = {
    id_aluno: "1",
    nm_aluno: "João Silva",
    email_aluno: "joao@example.com",
    peso: 70,
    altura: 175,
    genero_aluno: "masculino",
    data_nascimento: new Date("1990-01-01"),
    deficiencias_aluno: null,
    id_personal: "personal-1",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve carregar aluno por ID com sucesso", async () => {
    (alunoService.buscarAluno as jest.Mock).mockResolvedValue(mockAluno);

    const { result } = renderHook(() => useAluno("1"));

    // Estado inicial
    expect(result.current.loading).toBe(true);
    expect(result.current.aluno).toBeNull();
    expect(result.current.error).toBeNull();

    // Aguarda o carregamento
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Estado após carregamento
    expect(result.current.aluno).toEqual(mockAluno);
    expect(result.current.error).toBeNull();
    expect(alunoService.buscarAluno).toHaveBeenCalledWith("1");
  });

  it("deve tratar erro ao buscar aluno", async () => {
    (alunoService.buscarAluno as jest.Mock).mockRejectedValue(
      new Error("Aluno não encontrado")
    );

    const { result } = renderHook(() => useAluno("999"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.aluno).toBeNull();
    expect(result.current.error).toBeTruthy();
  });

  it("deve retornar null quando aluno não existe", async () => {
    (alunoService.buscarAluno as jest.Mock).mockResolvedValue(null);

    const { result } = renderHook(() => useAluno("999"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.aluno).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it("não deve buscar quando ID não é fornecido", async () => {
    const { result } = renderHook(() => useAluno(undefined as any));

    // Como não há ID, não deve fazer a busca
    expect(result.current.loading).toBe(false);
    expect(result.current.aluno).toBeNull();
    expect(alunoService.buscarAluno).not.toHaveBeenCalled();
  });

  it("deve atualizar quando ID muda", async () => {
    (alunoService.buscarAluno as jest.Mock).mockResolvedValue(mockAluno);

    const { result, rerender } = renderHook(({ id }) => useAluno(id), {
      initialProps: { id: "1" },
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.aluno).toEqual(mockAluno);

    // Muda o ID
    const mockAluno2 = { ...mockAluno, id_aluno: "2", nm_aluno: "Maria" };
    (alunoService.buscarAluno as jest.Mock).mockResolvedValue(mockAluno2);

    rerender({ id: "2" });

    await waitFor(() => {
      expect(result.current.aluno?.id_aluno).toBe("2");
    });

    expect(alunoService.buscarAluno).toHaveBeenCalledWith("2");
    expect(alunoService.buscarAluno).toHaveBeenCalledTimes(2);
  });
});
