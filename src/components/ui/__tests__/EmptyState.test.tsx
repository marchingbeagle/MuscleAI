import React from "react";
import { render } from "@testing-library/react-native";
import { EmptyState } from "../EmptyState";

describe("EmptyState", () => {
  it("deve renderizar com mensagem", () => {
    const { getByText } = render(<EmptyState message="Nenhum item encontrado" />);

    expect(getByText("Nenhum item encontrado")).toBeTruthy();
  });

  it("deve renderizar com descrição quando fornecida", () => {
    const { getByText } = render(
      <EmptyState
        message="Nenhum item encontrado"
        description="Tente novamente mais tarde"
      />
    );

    expect(getByText("Nenhum item encontrado")).toBeTruthy();
    expect(getByText("Tente novamente mais tarde")).toBeTruthy();
  });

  it("não deve renderizar descrição quando não fornecida", () => {
    const { queryByText } = render(<EmptyState message="Nenhum item encontrado" />);

    expect(queryByText("Tente novamente mais tarde")).toBeNull();
  });

  it("deve renderizar corretamente sem ícone customizado", () => {
    const { getByText } = render(<EmptyState message="Teste" />);

    expect(getByText("Teste")).toBeTruthy();
  });

  it("deve renderizar corretamente com ícone customizado", () => {
    const { getByText } = render(
      <EmptyState message="Teste" icon="person-outline" />
    );

    expect(getByText("Teste")).toBeTruthy();
  });
});

