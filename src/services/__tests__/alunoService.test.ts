import { alunoService } from "../alunoService";
import { prismaClient } from "../db";
import type { Aluno } from "../../types/aluno.dto";

// Mock do prismaClient
jest.mock("../db");

describe("AlunoService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("listarAlunos", () => {
    it("deve listar todos os alunos ordenados por nome", async () => {
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

      (prismaClient.aluno.findMany as jest.Mock).mockResolvedValue(mockAlunos);

      const result = await alunoService.listarAlunos();

      expect(result).toEqual(mockAlunos);
      expect(prismaClient.aluno.findMany).toHaveBeenCalledWith({
        orderBy: { nm_aluno: "asc" },
      });
      expect(prismaClient.aluno.findMany).toHaveBeenCalledTimes(1);
    });

    it("deve retornar array vazio quando não há alunos", async () => {
      (prismaClient.aluno.findMany as jest.Mock).mockResolvedValue([]);

      const result = await alunoService.listarAlunos();

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it("deve lançar DatabaseError em caso de erro", async () => {
      const mockError = new Error("Database connection failed");
      (prismaClient.aluno.findMany as jest.Mock).mockRejectedValue(mockError);

      await expect(alunoService.listarAlunos()).rejects.toThrow(
        "Não foi possível carregar os alunos"
      );
    });
  });

  describe("buscarAluno", () => {
    it("deve buscar aluno por ID", async () => {
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

      (prismaClient.aluno.findUnique as jest.Mock).mockResolvedValue(mockAluno);

      const result = await alunoService.buscarAluno("1");

      expect(result).toEqual(mockAluno);
      expect(prismaClient.aluno.findUnique).toHaveBeenCalledWith({
        where: { id_aluno: "1" },
      });
    });

    it("deve retornar null quando aluno não existe", async () => {
      (prismaClient.aluno.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await alunoService.buscarAluno("999");

      expect(result).toBeNull();
    });

    it("deve lançar DatabaseError em caso de erro", async () => {
      (prismaClient.aluno.findUnique as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      await expect(alunoService.buscarAluno("1")).rejects.toThrow(
        "Não foi possível buscar o aluno"
      );
    });
  });

  describe("criarAluno", () => {
    it("deve criar novo aluno com sucesso", async () => {
      const novoAluno = {
        nm_aluno: "Carlos Souza",
        email_aluno: "carlos@example.com",
        peso: 80,
        altura: 180,
        genero_aluno: "masculino",
        data_nascimento: new Date("1988-03-20"),
        deficiencias_aluno: null,
        id_personal: "personal-1",
      };

      const mockAlunoCreated: Aluno = {
        id_aluno: "3",
        ...novoAluno,
      };

      (prismaClient.aluno.create as jest.Mock).mockResolvedValue(
        mockAlunoCreated
      );

      const result = await alunoService.criarAluno(novoAluno);

      expect(result).toEqual(mockAlunoCreated);
      expect(prismaClient.aluno.create).toHaveBeenCalledWith({
        data: novoAluno,
      });
    });

    it("deve lançar ValidationError quando dados são inválidos", async () => {
      const alunoInvalido = {
        nm_aluno: "",
        email_aluno: "email-invalido",
        peso: -10,
        altura: 0,
        genero_aluno: "masculino",
        data_nascimento: new Date(),
        deficiencias_aluno: null,
        id_personal: "personal-1",
      };

      (prismaClient.aluno.create as jest.Mock).mockRejectedValue(
        new Error("Validation failed")
      );

      await expect(alunoService.criarAluno(alunoInvalido)).rejects.toThrow();
    });
  });

  describe("atualizarAluno", () => {
    it("deve atualizar aluno com sucesso", async () => {
      const dadosAtualizacao = {
        nm_aluno: "João Silva Atualizado",
        peso: 75,
      };

      const mockAlunoAtualizado: Aluno = {
        id_aluno: "1",
        nm_aluno: "João Silva Atualizado",
        email_aluno: "joao@example.com",
        peso: 75,
        altura: 175,
        genero_aluno: "masculino",
        data_nascimento: new Date("1990-01-01"),
        deficiencias_aluno: null,
        id_personal: "personal-1",
      };

      (prismaClient.aluno.update as jest.Mock).mockResolvedValue(
        mockAlunoAtualizado
      );

      const result = await alunoService.atualizarAluno("1", dadosAtualizacao);

      expect(result).toEqual(mockAlunoAtualizado);
      expect(prismaClient.aluno.update).toHaveBeenCalledWith({
        where: { id_aluno: "1" },
        data: dadosAtualizacao,
      });
    });

    it("deve lançar DatabaseError quando aluno não existe", async () => {
      (prismaClient.aluno.update as jest.Mock).mockRejectedValue(
        new Error("Record not found")
      );

      await expect(
        alunoService.atualizarAluno("999", { nm_aluno: "Teste" })
      ).rejects.toThrow("Não foi possível atualizar o aluno");
    });
  });

  describe("deletarAluno", () => {
    it("deve deletar aluno com sucesso", async () => {
      (prismaClient.aluno.delete as jest.Mock).mockResolvedValue({
        id_aluno: "1",
      });

      await alunoService.deletarAluno("1");

      expect(prismaClient.aluno.delete).toHaveBeenCalledWith({
        where: { id_aluno: "1" },
      });
    });

    it("deve lançar DatabaseError quando aluno não existe", async () => {
      (prismaClient.aluno.delete as jest.Mock).mockRejectedValue(
        new Error("Record not found")
      );

      await expect(alunoService.deletarAluno("999")).rejects.toThrow(
        "Não foi possível deletar o aluno"
      );
    });
  });
});
