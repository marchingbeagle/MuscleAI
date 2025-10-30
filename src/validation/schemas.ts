/**
 * Schemas de Validação com Yup
 * Define regras de validação para formulários
 */

import * as yup from "yup";

/**
 * Schema de validação para cadastro/edição de aluno
 */
export const alunoSchema = yup.object().shape({
  nm_aluno: yup
    .string()
    .required("Nome é obrigatório")
    .min(2, "Nome deve ter no mínimo 2 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres")
    .trim(),

  email_aluno: yup
    .string()
    .required("Email é obrigatório")
    .email("Email inválido")
    .trim()
    .lowercase(),

  peso: yup
    .number()
    .required("Peso é obrigatório")
    .positive("Peso deve ser positivo")
    .max(500, "Peso inválido (máximo 500kg)")
    .typeError("Peso deve ser um número"),

  altura: yup
    .number()
    .required("Altura é obrigatória")
    .positive("Altura deve ser positiva")
    .max(300, "Altura inválida (máximo 300cm)")
    .typeError("Altura deve ser um número"),

  genero_aluno: yup
    .string()
    .required("Gênero é obrigatório")
    .oneOf(["masculino", "feminino", "outro"], "Gênero inválido"),

  data_nascimento: yup
    .date()
    .required("Data de nascimento é obrigatória")
    .max(new Date(), "Data de nascimento não pode ser no futuro")
    .test("idade-minima", "Aluno deve ter pelo menos 10 anos", (value) => {
      if (!value) {return false;}
      const age = new Date().getFullYear() - value.getFullYear();
      return age >= 10;
    })
    .typeError("Data de nascimento inválida"),

  deficiencias_aluno: yup
    .string()
    .nullable()
    .max(500, "Descrição muito longa (máximo 500 caracteres)"),

  id_personal: yup.string().required("ID do personal trainer é obrigatório"),
});

/**
 * Schema de validação para criação de treino
 */
export const treinoSchema = yup.object().shape({
  nome_aluno: yup
    .string()
    .required("Nome do aluno é obrigatório")
    .min(2, "Nome deve ter no mínimo 2 caracteres")
    .trim(),

  metas: yup
    .string()
    .required("Metas são obrigatórias")
    .min(10, "Descreva as metas com mais detalhes (mínimo 10 caracteres)")
    .max(1000, "Descrição muito longa (máximo 1000 caracteres)")
    .trim(),

  treino_gerado: yup
    .string()
    .required("Treino não foi gerado")
    .min(50, "Treino muito curto"),

  id_aluno: yup.string().required("ID do aluno é obrigatório"),

  id_personal: yup.string().required("ID do personal trainer é obrigatório"),
});

/**
 * Schema de validação para login
 */
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email é obrigatório")
    .email("Email inválido")
    .trim()
    .lowercase(),

  password: yup
    .string()
    .required("Senha é obrigatória")
    .min(6, "Senha deve ter no mínimo 6 caracteres"),
});

/**
 * Schema de validação para cadastro de usuário
 */
export const signupSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("Nome é obrigatório")
    .min(2, "Nome deve ter no mínimo 2 caracteres")
    .max(50, "Nome muito longo")
    .trim(),

  lastName: yup
    .string()
    .required("Sobrenome é obrigatório")
    .min(2, "Sobrenome deve ter no mínimo 2 caracteres")
    .max(50, "Sobrenome muito longo")
    .trim(),

  email: yup
    .string()
    .required("Email é obrigatório")
    .email("Email inválido")
    .trim()
    .lowercase(),

  password: yup
    .string()
    .required("Senha é obrigatória")
    .min(8, "Senha deve ter no mínimo 8 caracteres")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Senha deve conter letras maiúsculas, minúsculas e números"
    ),

  confirmPassword: yup
    .string()
    .required("Confirmação de senha é obrigatória")
    .oneOf([yup.ref("password")], "As senhas não coincidem"),
});

/**
 * Tipos TypeScript inferidos dos schemas
 */
export type AlunoFormData = yup.InferType<typeof alunoSchema>;
export type TreinoFormData = yup.InferType<typeof treinoSchema>;
export type LoginFormData = yup.InferType<typeof loginSchema>;
export type SignupFormData = yup.InferType<typeof signupSchema>;
