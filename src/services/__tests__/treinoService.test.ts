import { treinoService } from "../treinoService";
import { prismaClient } from "../db";
import type { Treino } from "../../types/treino.dto";

// Mock do prismaClient
jest.mock("../db");

describe("TreinoService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("listarTreinos", () => {
    it("deve listar todos os treinos", async () => {
      const mockTreinos: Treino[] = [
        {
          id_treino: "1",
          treino_gerado: "Treino A: Peito e Tríceps",
          id_aluno: "aluno-1",
          id_personal: "personal-1",
        },
        {
          id_treino: "2",
          treino_gerado: "Treino B: Costas e Bíceps",
          id_aluno: "aluno-2",
          id_personal: "personal-1",
        },
      ];

      (prismaClient.treino.findMany as jest.Mock).mockResolvedValue(
        mockTreinos
      );

      const result = await treinoService.listarTreinos();

      expect(result).toEqual(mockTreinos);
      expect(prismaClient.treino.findMany).toHaveBeenCalledTimes(1);
    });

    it("deve retornar array vazio quando não há treinos", async () => {
      (prismaClient.treino.findMany as jest.Mock).mockResolvedValue([]);

      const result = await treinoService.listarTreinos();

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it("deve lançar DatabaseError em caso de erro", async () => {
      (prismaClient.treino.findMany as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      await expect(treinoService.listarTreinos()).rejects.toThrow(
        "Não foi possível carregar os treinos"
      );
    });
  });

  describe("buscarTreino", () => {
    it("deve buscar treino por ID", async () => {
      const mockTreino: Treino = {
        id_treino: "1",
        treino_gerado: "Treino A: Peito e Tríceps",
        id_aluno: "aluno-1",
        id_personal: "personal-1",
      };

      (prismaClient.treino.findUnique as jest.Mock).mockResolvedValue(
        mockTreino
      );

      const result = await treinoService.buscarTreino("1");

      expect(result).toEqual(mockTreino);
      expect(prismaClient.treino.findUnique).toHaveBeenCalledWith({
        where: { id_treino: "1" },
      });
    });

    it("deve retornar null quando treino não existe", async () => {
      (prismaClient.treino.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await treinoService.buscarTreino("999");

      expect(result).toBeNull();
    });
  });

  describe("criarTreino", () => {
    it("deve criar novo treino com sucesso", async () => {
      const novoTreino = {
        treino_gerado: "Treino C: Pernas e Ombros",
        id_aluno: "aluno-1",
        id_personal: "personal-1",
      };

      const mockTreinoCreated: Treino = {
        id_treino: "3",
        ...novoTreino,
      };

      (prismaClient.treino.create as jest.Mock).mockResolvedValue(
        mockTreinoCreated
      );

      const result = await treinoService.criarTreino(novoTreino);

      expect(result).toEqual(mockTreinoCreated);
      expect(prismaClient.treino.create).toHaveBeenCalledWith({
        data: novoTreino,
      });
    });

    it("deve lançar DatabaseError em caso de erro", async () => {
      const novoTreino = {
        treino_gerado: "",
        id_aluno: "aluno-1",
        id_personal: "personal-1",
      };

      (prismaClient.treino.create as jest.Mock).mockRejectedValue(
        new Error("Validation failed")
      );

      await expect(treinoService.criarTreino(novoTreino)).rejects.toThrow(
        "Não foi possível criar o treino"
      );
    });
  });

  describe("atualizarTreino", () => {
    it("deve atualizar treino com sucesso", async () => {
      const dadosAtualizacao = {
        treino_gerado: "Treino A Atualizado: Peito, Tríceps e Ombros",
      };

      const mockTreinoAtualizado: Treino = {
        id_treino: "1",
        treino_gerado: "Treino A Atualizado: Peito, Tríceps e Ombros",
        id_aluno: "aluno-1",
        id_personal: "personal-1",
      };

      (prismaClient.treino.update as jest.Mock).mockResolvedValue(
        mockTreinoAtualizado
      );

      const result = await treinoService.atualizarTreino("1", dadosAtualizacao);

      expect(result).toEqual(mockTreinoAtualizado);
      expect(prismaClient.treino.update).toHaveBeenCalledWith({
        where: { id_treino: "1" },
        data: dadosAtualizacao,
      });
    });

    it("deve lançar DatabaseError quando treino não existe", async () => {
      (prismaClient.treino.update as jest.Mock).mockRejectedValue(
        new Error("Record not found")
      );

      await expect(
        treinoService.atualizarTreino("999", { treino_gerado: "Teste" })
      ).rejects.toThrow("Não foi possível atualizar o treino");
    });
  });

  describe("deletarTreino", () => {
    it("deve deletar treino com sucesso", async () => {
      (prismaClient.treino.delete as jest.Mock).mockResolvedValue({
        id_treino: "1",
      });

      await treinoService.deletarTreino("1");

      expect(prismaClient.treino.delete).toHaveBeenCalledWith({
        where: { id_treino: "1" },
      });
    });

    it("deve lançar DatabaseError quando treino não existe", async () => {
      (prismaClient.treino.delete as jest.Mock).mockRejectedValue(
        new Error("Record not found")
      );

      await expect(treinoService.deletarTreino("999")).rejects.toThrow(
        "Não foi possível deletar o treino"
      );
    });
  });

  describe("listarTreinosPorAluno", () => {
    it("deve listar treinos de um aluno específico", async () => {
      const mockTreinos: Treino[] = [
        {
          id_treino: "1",
          treino_gerado: "Treino A",
          id_aluno: "aluno-1",
          id_personal: "personal-1",
        },
        {
          id_treino: "2",
          treino_gerado: "Treino B",
          id_aluno: "aluno-1",
          id_personal: "personal-1",
        },
      ];

      (prismaClient.treino.findMany as jest.Mock).mockResolvedValue(
        mockTreinos
      );

      const result = await treinoService.listarTreinosPorAluno("aluno-1");

      expect(result).toEqual(mockTreinos);
      expect(prismaClient.treino.findMany).toHaveBeenCalledWith({
        where: { id_aluno: "aluno-1" },
      });
    });

    it("deve retornar array vazio quando aluno não tem treinos", async () => {
      (prismaClient.treino.findMany as jest.Mock).mockResolvedValue([]);

      const result = await treinoService.listarTreinosPorAluno("aluno-999");

      expect(result).toEqual([]);
    });
  });
});
