import { useState } from "react";
import { Alert } from "react-native";
import { router } from "expo-router";
import { treinoService } from "../services/treinoService";
import { ErrorHandler } from "../lib/errorHandler";
import Logger from "../lib/logger";
import { treinoSchema } from "../validation/schemas";
import type { CreateTreinoDTO } from "../types/treino.dto";

interface UseTreinoFormProps {
  treinoId?: string;
  initialValues?: Partial<CreateTreinoDTO>;
}

interface ValidationErrors {
  [key: string]: string;
}

export function useTreinoForm({
  treinoId,
  initialValues,
}: UseTreinoFormProps = {}) {
  const [values, setValues] = useState<CreateTreinoDTO>({
    treino_gerado: initialValues?.treino_gerado || "",
    id_aluno: initialValues?.id_aluno || "",
    id_personal: initialValues?.id_personal || "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const updateField = (field: keyof CreateTreinoDTO, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));

    // Limpa o erro do campo quando o usuário começa a digitar
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validate = async (): Promise<boolean> => {
    try {
      await treinoSchema.validate(values, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err: any) {
      const validationErrors: ValidationErrors = {};

      if (err.inner) {
        err.inner.forEach((error: any) => {
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });
      }

      setErrors(validationErrors);
      Logger.warn(
        "Erros de validação no formulário de treino",
        validationErrors
      );
      return false;
    }
  };

  const handleSubmit = async (): Promise<boolean> => {
    Logger.info("Iniciando submissão do formulário de treino", { treinoId });

    const isValid = await validate();
    if (!isValid) {
      Alert.alert("Validação", "Por favor, corrija os erros no formulário");
      return false;
    }

    setSubmitting(true);
    try {
      if (treinoId) {
        await treinoService.atualizarTreino(treinoId, values);
        Logger.info("Treino atualizado com sucesso", { treinoId });
        Alert.alert("Sucesso", "Treino atualizado com sucesso!");
      } else {
        const novoTreino = await treinoService.criarTreino(values);
        Logger.info("Treino criado com sucesso", { id: novoTreino.id_treino });
        Alert.alert("Sucesso", "Treino criado com sucesso!");
      }

      router.back();
      return true;
    } catch (error) {
      Logger.error("Erro ao salvar treino", error);
      const message = ErrorHandler.getErrorMessage(error);
      Alert.alert("Erro", message);
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setValues({
      treino_gerado: initialValues?.treino_gerado || "",
      id_aluno: initialValues?.id_aluno || "",
      id_personal: initialValues?.id_personal || "",
    });
    setErrors({});
  };

  return {
    values,
    errors,
    submitting,
    updateField,
    handleSubmit,
    validate,
    reset,
  };
}
