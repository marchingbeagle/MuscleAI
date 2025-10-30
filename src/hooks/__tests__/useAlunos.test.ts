import { renderHook, waitFor } from "@testing-library/react-native";
import { useAlunos } from "../useAlunos";
import { alunoService } from "../../services/alunoService";
import type { Aluno } from "../../types/aluno.dto";

// Mock do alunoService
jest.mock("../../services/alunoService");

describe("useAlunos", () => {
  const mockAlunos: Aluno[] = [
    {
      id_aluno: "1",
      nm_aluno: "João Silva",
      email_aluno: "joao@example.com",
      peso: 70,
      altura: 175,
      genero_aluno: "masculino",
      data_nascimento: new Date("1990-01-01"),
      deficiencias_aluno: null,
      id_personal: "personal-1",
    },
    {
      id_aluno: "2",
      nm_aluno: "Maria Santos",
      email_aluno: "maria@example.com",
      peso: 60,
      altura: 165,
      genero_aluno: "feminino",
      data_nascimento: new Date("1995-05-15"),
      deficiencias_aluno: null,
      id_personal: "personal-1",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve carregar alunos com sucesso", async () => {
    (alunoService.listarAlunos as jest.Mock).mockResolvedValue(mockAlunos);

    const { result } = renderHook(() => useAlunos());

    // Estado inicial: loading
    expect(result.current.loading).toBe(true);
    expect(result.current.alunos).toEqual([]);
    expect(result.current.error).toBeNull();

    // Aguarda o carregamento
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Estado após carregamento
    expect(result.current.alunos).toEqual(mockAlunos);
    expect(result.current.error).toBeNull();
    expect(alunoService.listarAlunos).toHaveBeenCalledTimes(1);
  });

  it("deve tratar erro ao carregar alunos", async () => {
    const errorMessage = "Erro ao carregar";
    (alunoService.listarAlunos as jest.Mock).mockRejectedValue(
      new Error(errorMessage)
    );

    const { result } = renderHook(() => useAlunos());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.alunos).toEqual([]);
    expect(result.current.error).toBeTruthy();
  });

  it("deve permitir refetch dos alunos", async () => {
    (alunoService.listarAlunos as jest.Mock).mockResolvedValue(mockAlunos);

    const { result } = renderHook(() => useAlunos());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Chama refetch
    result.current.refetch();

    // Deve estar carregando novamente
    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Deve ter chamado o service 2 vezes (inicial + refetch)
    expect(alunoService.listarAlunos).toHaveBeenCalledTimes(2);
  });

  it("deve retornar array vazio quando não há alunos", async () => {
    (alunoService.listarAlunos as jest.Mock).mockResolvedValue([]);

    const { result } = renderHook(() => useAlunos());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.alunos).toEqual([]);
    expect(result.current.error).toBeNull();
  });
});
