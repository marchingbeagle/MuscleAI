import React from "react";
import { render } from "@testing-library/react-native";
import { ValidationSummary } from "../ValidationSummary";

describe("ValidationSummary", () => {
  it("não deve renderizar quando visible é false", () => {
    const { queryByText } = render(
      <ValidationSummary errors={{}} visible={false} />
    );

    expect(queryByText("Corrija o erro abaixo:")).toBeNull();
  });

  it("não deve renderizar quando não há erros", () => {
    const { queryByText } = render(
      <ValidationSummary errors={{}} visible={true} />
    );

    expect(queryByText("Corrija o erro abaixo:")).toBeNull();
  });

  it("deve renderizar quando há um erro", () => {
    const errors = {
      nm_aluno: "Nome é obrigatório",
    };

    const { getByText } = render(
      <ValidationSummary errors={errors} visible={true} />
    );

    expect(getByText("Corrija o erro abaixo:")).toBeTruthy();
    expect(getByText(/Nome:/)).toBeTruthy();
    expect(getByText(/Nome é obrigatório/)).toBeTruthy();
  });

  it("deve renderizar quando há múltiplos erros", () => {
    const errors = {
      nm_aluno: "Nome é obrigatório",
      email_aluno: "Email inválido",
    };

    const { getByText } = render(
      <ValidationSummary errors={errors} visible={true} />
    );

    expect(getByText(/Corrija os 2 erros abaixo:/)).toBeTruthy();
    expect(getByText(/Nome:/)).toBeTruthy();
    expect(getByText(/Email:/)).toBeTruthy();
  });

  it("deve traduzir nomes de campos corretamente", () => {
    const errors = {
      nm_aluno: "Nome é obrigatório",
      email_aluno: "Email inválido",
      peso: "Peso inválido",
      altura: "Altura inválida",
    };

    const { getByText } = render(
      <ValidationSummary errors={errors} visible={true} />
    );

    expect(getByText(/Nome:/)).toBeTruthy();
    expect(getByText(/Email:/)).toBeTruthy();
    expect(getByText(/Peso:/)).toBeTruthy();
    expect(getByText(/Altura:/)).toBeTruthy();
  });

  it("deve usar nome do campo quando não há tradução", () => {
    const errors = {
      campo_desconhecido: "Mensagem de erro",
    };

    const { getByText } = render(
      <ValidationSummary errors={errors} visible={true} />
    );

    expect(getByText(/campo_desconhecido:/)).toBeTruthy();
    expect(getByText(/Mensagem de erro/)).toBeTruthy();
  });

  it("deve usar visible=true por padrão", () => {
    const errors = {
      nm_aluno: "Nome é obrigatório",
    };

    const { getByText } = render(<ValidationSummary errors={errors} />);

    expect(getByText("Corrija o erro abaixo:")).toBeTruthy();
  });
});

