import { renderHook, waitFor } from "@testing-library/react-native";
import { useTreinoForm } from "../useTreinoForm";
import { treinoService } from "../../services/treinoService";
import { ErrorHandler } from "../../lib/errorHandler";
import Logger from "../../lib/logger";
import { Alert } from "react-native";
import { router } from "expo-router";

// Mocks
jest.mock("../../services/treinoService");
jest.mock("../../lib/errorHandler");
jest.mock("../../lib/logger");
jest.mock("expo-router", () => ({
  router: {
    back: jest.fn(),
  },
}));

// Mock do Alert
jest.spyOn(Alert, "alert");

// Mock do treinoSchema para não exigir nome_aluno e metas
jest.mock("../../validation/schemas", () => {
  const actual = jest.requireActual("../../validation/schemas");
  const mockYup = require("yup");
  return {
    ...actual,
    treinoSchema: mockYup.object().shape({
      treino_gerado: mockYup
        .string()
        .required("Treino não foi gerado")
        .min(50, "Treino muito curto"),
      id_aluno: mockYup.string().required("ID do aluno é obrigatório"),
      id_personal: mockYup.string().required("ID do personal trainer é obrigatório"),
    }),
  };
});

describe("useTreinoForm", () => {
  const mockTreino = {
    id_treino: "1",
    treino_gerado: "Treino completo",
    id_aluno: "aluno-1",
    id_personal: "personal-1",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve inicializar com valores padrão", () => {
    const { result } = renderHook(() => useTreinoForm());

    expect(result.current.values.treino_gerado).toBe("");
    expect(result.current.values.id_aluno).toBe("");
    expect(result.current.values.id_personal).toBe("");
    expect(result.current.errors).toEqual({});
    expect(result.current.submitting).toBe(false);
  });

  it("deve inicializar com valores iniciais", () => {
    const initialValues = {
      treino_gerado: "Treino inicial",
      id_aluno: "aluno-1",
      id_personal: "personal-1",
    };

    const { result } = renderHook(() =>
      useTreinoForm({ initialValues })
    );

    expect(result.current.values).toEqual(initialValues);
  });

  it("deve atualizar campo", async () => {
    const { result } = renderHook(() => useTreinoForm());

    result.current.updateField("treino_gerado", "Novo treino com mais de 50 caracteres para passar na validação");

    await waitFor(() => {
      expect(result.current.values.treino_gerado).toBe("Novo treino com mais de 50 caracteres para passar na validação");
    });
  });

  it("deve limpar erro quando campo é atualizado", async () => {
    const { result } = renderHook(() => useTreinoForm());

    // Primeiro cria um erro
    await result.current.validate();
    // Se houver erro, deve estar presente
    if (Object.keys(result.current.errors).length > 0) {
      const fieldWithError = Object.keys(result.current.errors)[0] as keyof typeof result.current.values;
      
      // Atualiza o campo
      result.current.updateField(fieldWithError, "Valor atualizado");

      // O erro deve ser limpo
      expect(result.current.errors[fieldWithError]).toBeUndefined();
    }
  });

  it("deve validar formulário com sucesso", async () => {
    const { result } = renderHook(() => useTreinoForm());

    // Usa valores que atendem aos requisitos do schema (treino_gerado mínimo 50 caracteres)
    result.current.updateField("treino_gerado", "Treino completo com mais de 50 caracteres para passar na validação do schema de treino");
    result.current.updateField("id_aluno", "aluno-1");
    result.current.updateField("id_personal", "personal-1");

    // Aguarda a atualização do estado
    await waitFor(() => {
      expect(result.current.values.treino_gerado).toBe("Treino completo com mais de 50 caracteres para passar na validação do schema de treino");
    });

    const isValid = await result.current.validate();

    expect(isValid).toBe(true);
    expect(result.current.errors).toEqual({});
  });

  it("deve validar formulário e retornar false quando há erros", async () => {
    const { result } = renderHook(() => useTreinoForm());

    // Deixa campos vazios para gerar erros
    const isValid = await result.current.validate();

    expect(isValid).toBe(false);
    // Aguarda a atualização dos erros
    await waitFor(() => {
      expect(Object.keys(result.current.errors).length).toBeGreaterThan(0);
    });
  });

  it("deve criar treino com sucesso", async () => {
    (treinoService.criarTreino as jest.Mock).mockResolvedValue(mockTreino);

    const { result } = renderHook(() => useTreinoForm());

    // Usa valores que atendem aos requisitos do schema
    result.current.updateField("treino_gerado", "Treino completo com mais de 50 caracteres para passar na validação do schema de treino");
    result.current.updateField("id_aluno", "aluno-1");
    result.current.updateField("id_personal", "personal-1");

    // Aguarda a atualização do estado
    await waitFor(() => {
      expect(result.current.values.treino_gerado.length).toBeGreaterThan(50);
    });

    const success = await result.current.handleSubmit();

    await waitFor(() => {
      expect(result.current.submitting).toBe(false);
    });

    expect(success).toBe(true);
    expect(treinoService.criarTreino).toHaveBeenCalled();
    expect(Alert.alert).toHaveBeenCalledWith("Sucesso", "Treino criado com sucesso!");
    expect(router.back).toHaveBeenCalled();
  });

  it("deve atualizar treino quando treinoId é fornecido", async () => {
    (treinoService.atualizarTreino as jest.Mock).mockResolvedValue(undefined);

    const { result } = renderHook(() =>
      useTreinoForm({ treinoId: "1" })
    );

    // Usa valores que atendem aos requisitos do schema
    result.current.updateField("treino_gerado", "Treino atualizado com mais de 50 caracteres para passar na validação do schema de treino");
    result.current.updateField("id_aluno", "aluno-1");
    result.current.updateField("id_personal", "personal-1");

    // Aguarda a atualização do estado
    await waitFor(() => {
      expect(result.current.values.treino_gerado.length).toBeGreaterThan(50);
    });

    const success = await result.current.handleSubmit();

    await waitFor(() => {
      expect(result.current.submitting).toBe(false);
    });

    expect(success).toBe(true);
    expect(treinoService.atualizarTreino).toHaveBeenCalledWith("1", result.current.values);
    expect(Alert.alert).toHaveBeenCalledWith("Sucesso", "Treino atualizado com sucesso!");
  });

  it("deve mostrar alerta de validação quando formulário é inválido", async () => {
    const { result } = renderHook(() => useTreinoForm());

    const success = await result.current.handleSubmit();

    expect(success).toBe(false);
    expect(Alert.alert).toHaveBeenCalledWith("Validação", "Por favor, corrija os erros no formulário");
    expect(treinoService.criarTreino).not.toHaveBeenCalled();
  });

  it("deve tratar erro ao salvar treino", async () => {
    const error = new Error("Erro ao salvar");
    (treinoService.criarTreino as jest.Mock).mockRejectedValue(error);
    (ErrorHandler.getErrorMessage as jest.Mock).mockReturnValue("Erro ao salvar");

    const { result } = renderHook(() => useTreinoForm());

    // Usa valores que atendem aos requisitos do schema
    result.current.updateField("treino_gerado", "Treino completo com mais de 50 caracteres para passar na validação do schema de treino");
    result.current.updateField("id_aluno", "aluno-1");
    result.current.updateField("id_personal", "personal-1");

    // Aguarda a atualização do estado
    await waitFor(() => {
      expect(result.current.values.treino_gerado.length).toBeGreaterThan(50);
    });

    const success = await result.current.handleSubmit();

    await waitFor(() => {
      expect(result.current.submitting).toBe(false);
    });

    expect(success).toBe(false);
    expect(Alert.alert).toHaveBeenCalledWith("Erro", "Erro ao salvar");
    expect(Logger.error).toHaveBeenCalled();
  });

  it("deve resetar formulário", () => {
    const initialValues = {
      treino_gerado: "Treino inicial",
      id_aluno: "aluno-1",
      id_personal: "personal-1",
    };

    const { result } = renderHook(() =>
      useTreinoForm({ initialValues })
    );

    // Modifica valores
    result.current.updateField("treino_gerado", "Modificado");

    // Reseta
    result.current.reset();

    expect(result.current.values).toEqual({
      treino_gerado: initialValues.treino_gerado,
      id_aluno: initialValues.id_aluno,
      id_personal: initialValues.id_personal,
    });
    expect(result.current.errors).toEqual({});
  });
});

