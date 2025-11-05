import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ListaAlunos from "../ListaAlunos";
import { useRouter } from "expo-router";
import type { Aluno } from "@prisma/client";

// Mock do Expo Router
const mockPush = jest.fn();
jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("ListaAlunos", () => {
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

  it("deve renderizar nome do aluno", () => {
    const { getByText } = render(<ListaAlunos data={mockAluno} />);

    expect(getByText("João Silva")).toBeTruthy();
  });

  it("deve navegar para detalhesTreino quando toque principal é pressionado", () => {
    const { getByText } = render(<ListaAlunos data={mockAluno} />);

    // Encontra o TouchableOpacity principal através do texto
    const nameText = getByText("João Silva");
    const touchable = nameText.parent?.parent;

    if (touchable) {
      fireEvent.press(touchable as any);
    }

    expect(mockPush).toHaveBeenCalledWith(
      "/detalhesTreino?nomeAluno=João Silva&idAluno=1"
    );
  });

  it("deve renderizar corretamente com todos os elementos", () => {
    const { getByText } = render(<ListaAlunos data={mockAluno} />);

    // Verifica que o componente renderiza corretamente
    expect(getByText(mockAluno.nm_aluno)).toBeTruthy();
  });

  it("deve renderizar corretamente com dados do aluno", () => {
    const { getByText } = render(<ListaAlunos data={mockAluno} />);

    expect(getByText(mockAluno.nm_aluno)).toBeTruthy();
  });
});

