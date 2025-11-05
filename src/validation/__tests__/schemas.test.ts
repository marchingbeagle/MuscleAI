import {
  alunoSchema,
  treinoSchema,
  loginSchema,
  signupSchema,
} from "../schemas";

describe("Validation Schemas", () => {
  describe("alunoSchema", () => {
    it("deve validar aluno válido", async () => {
      const alunoValido = {
        nm_aluno: "João Silva",
        email_aluno: "joao@example.com",
        peso: 70,
        altura: 175,
        genero_aluno: "masculino",
        data_nascimento: new Date("1990-01-01"),
        deficiencias_aluno: null,
        id_personal: "personal-1",
      };

      await expect(alunoSchema.validate(alunoValido)).resolves.toBeTruthy();
    });

    it("deve rejeitar nome muito curto", async () => {
      const aluno = {
        nm_aluno: "J",
        email_aluno: "joao@example.com",
        peso: 70,
        altura: 175,
        genero_aluno: "masculino",
        data_nascimento: new Date("1990-01-01"),
        id_personal: "personal-1",
      };

      await expect(alunoSchema.validate(aluno)).rejects.toThrow(
        "Nome deve ter no mínimo 2 caracteres"
      );
    });

    it("deve rejeitar email inválido", async () => {
      const aluno = {
        nm_aluno: "João Silva",
        email_aluno: "email-invalido",
        peso: 70,
        altura: 175,
        genero_aluno: "masculino",
        data_nascimento: new Date("1990-01-01"),
        id_personal: "personal-1",
      };

      await expect(alunoSchema.validate(aluno)).rejects.toThrow(
        "Email inválido"
      );
    });

    it("deve rejeitar peso negativo", async () => {
      const aluno = {
        nm_aluno: "João Silva",
        email_aluno: "joao@example.com",
        peso: -10,
        altura: 175,
        genero_aluno: "masculino",
        data_nascimento: new Date("1990-01-01"),
        id_personal: "personal-1",
      };

      await expect(alunoSchema.validate(aluno)).rejects.toThrow(
        "Peso deve ser positivo"
      );
    });

    it("deve rejeitar peso acima de 500kg", async () => {
      const aluno = {
        nm_aluno: "João Silva",
        email_aluno: "joao@example.com",
        peso: 600,
        altura: 175,
        genero_aluno: "masculino",
        data_nascimento: new Date("1990-01-01"),
        id_personal: "personal-1",
      };

      await expect(alunoSchema.validate(aluno)).rejects.toThrow(
        "Peso inválido (máximo 500kg)"
      );
    });

    it("deve rejeitar altura inválida", async () => {
      const aluno = {
        nm_aluno: "João Silva",
        email_aluno: "joao@example.com",
        peso: 70,
        altura: 350,
        genero_aluno: "masculino",
        data_nascimento: new Date("1990-01-01"),
        id_personal: "personal-1",
      };

      await expect(alunoSchema.validate(aluno)).rejects.toThrow(
        "Altura inválida (máximo 300cm)"
      );
    });

    it("deve rejeitar gênero inválido", async () => {
      const aluno = {
        nm_aluno: "João Silva",
        email_aluno: "joao@example.com",
        peso: 70,
        altura: 175,
        genero_aluno: "invalido",
        data_nascimento: new Date("1990-01-01"),
        id_personal: "personal-1",
      };

      await expect(alunoSchema.validate(aluno)).rejects.toThrow(
        "Gênero inválido"
      );
    });

    it("deve rejeitar idade menor que 10 anos", async () => {
      const dataAtual = new Date();
      const dataNascimento = new Date(dataAtual.getFullYear() - 5, 0, 1);

      const aluno = {
        nm_aluno: "João Silva",
        email_aluno: "joao@example.com",
        peso: 30,
        altura: 120,
        genero_aluno: "masculino",
        data_nascimento: dataNascimento,
        id_personal: "personal-1",
      };

      await expect(alunoSchema.validate(aluno)).rejects.toThrow(
        "Aluno deve ter pelo menos 10 anos"
      );
    });

    it("deve aceitar deficiencias null ou vazio", async () => {
      const aluno1 = {
        nm_aluno: "João Silva",
        email_aluno: "joao@example.com",
        peso: 70,
        altura: 175,
        genero_aluno: "masculino",
        data_nascimento: new Date("1990-01-01"),
        deficiencias_aluno: null,
        id_personal: "personal-1",
      };

      const aluno2 = {
        ...aluno1,
        deficiencias_aluno: "",
      };

      await expect(alunoSchema.validate(aluno1)).resolves.toBeTruthy();
      await expect(alunoSchema.validate(aluno2)).resolves.toBeTruthy();
    });
  });

  describe("treinoSchema", () => {
    it("deve validar treino válido", async () => {
      const treinoValido = {
        nome_aluno: "João Silva",
        metas: "Ganhar massa muscular e definir abdômen",
        treino_gerado: "Treino A: Peito e Tríceps com exercícios completos",
        id_aluno: "aluno-1",
        id_personal: "personal-1",
      };

      await expect(treinoSchema.validate(treinoValido)).resolves.toBeTruthy();
    });

    it("deve rejeitar treino muito curto", async () => {
      const treino = {
        nome_aluno: "João Silva",
        metas: "Ganhar massa muscular",
        treino_gerado: "Treino A",
        id_aluno: "aluno-1",
        id_personal: "personal-1",
      };

      await expect(treinoSchema.validate(treino)).rejects.toThrow(
        "Treino muito curto"
      );
    });

    it("deve rejeitar treino sem id_aluno", async () => {
      const treino = {
        nome_aluno: "João Silva",
        metas: "Ganhar massa muscular e definir abdômen",
        treino_gerado: "Treino A: Peito e Tríceps com exercícios completos",
        id_personal: "personal-1",
      };

      await expect(treinoSchema.validate(treino)).rejects.toThrow(
        "ID do aluno é obrigatório"
      );
    });

    it("deve rejeitar treino sem id_personal", async () => {
      const treino = {
        nome_aluno: "João Silva",
        metas: "Ganhar massa muscular e definir abdômen",
        treino_gerado: "Treino A: Peito e Tríceps com exercícios completos",
        id_aluno: "aluno-1",
      };

      await expect(treinoSchema.validate(treino)).rejects.toThrow(
        "ID do personal trainer é obrigatório"
      );
    });
  });

  describe("loginSchema", () => {
    it("deve validar login válido", async () => {
      const loginValido = {
        email: "usuario@example.com",
        password: "senha123",
      };

      await expect(loginSchema.validate(loginValido)).resolves.toBeTruthy();
    });

    it("deve rejeitar email inválido", async () => {
      const login = {
        email: "email-invalido",
        password: "senha123",
      };

      await expect(loginSchema.validate(login)).rejects.toThrow(
        "Email inválido"
      );
    });

    it("deve rejeitar senha muito curta", async () => {
      const login = {
        email: "usuario@example.com",
        password: "123",
      };

      await expect(loginSchema.validate(login)).rejects.toThrow(
        "Senha deve ter no mínimo 6 caracteres"
      );
    });
  });

  describe("signupSchema", () => {
    it("deve validar signup válido", async () => {
      const signupValido = {
        firstName: "João",
        lastName: "Silva",
        email: "joao@example.com",
        password: "Senha123456",
        confirmPassword: "Senha123456",
      };

      await expect(signupSchema.validate(signupValido)).resolves.toBeTruthy();
    });

    it("deve rejeitar senha sem maiúscula", async () => {
      const signup = {
        firstName: "João",
        lastName: "Silva",
        email: "joao@example.com",
        password: "senha123",
        confirmPassword: "senha123",
      };

      await expect(signupSchema.validate(signup)).rejects.toThrow(
        "Senha deve conter letras maiúsculas, minúsculas e números"
      );
    });

    it("deve rejeitar senhas diferentes", async () => {
      const signup = {
        firstName: "João",
        lastName: "Silva",
        email: "joao@example.com",
        password: "Senha123456",
        confirmPassword: "Senha456789",
      };

      await expect(signupSchema.validate(signup)).rejects.toThrow(
        "As senhas não coincidem"
      );
    });

    it("deve rejeitar nome muito curto", async () => {
      const signup = {
        firstName: "J",
        lastName: "Silva",
        email: "joao@example.com",
        password: "Senha123456",
        confirmPassword: "Senha123456",
      };

      await expect(signupSchema.validate(signup)).rejects.toThrow(
        "Nome deve ter no mínimo 2 caracteres"
      );
    });
  });
});
