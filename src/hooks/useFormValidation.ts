/**
 * Hook useFormValidation
 * Facilita validação de formulários com Yup
 */

import { useState } from "react";
import * as yup from "yup";
import Logger from "../lib/logger";

interface ValidationErrors {
  [key: string]: string;
}

interface UseFormValidationResult<T> {
  errors: ValidationErrors;
  validateField: (field: keyof T, value: any) => Promise<boolean>;
  validateForm: (data: T) => Promise<boolean>;
  clearErrors: () => void;
  clearError: (field: keyof T) => void;
}

/**
 * Hook para validação de formulários com Yup
 * @param schema - Schema Yup para validação
 * @returns Funções e estado de validação
 */
export function useFormValidation<T extends object>(
  schema: yup.ObjectSchema<any>
): UseFormValidationResult<T> {
  const [errors, setErrors] = useState<ValidationErrors>({});

  /**
   * Valida um campo específico
   */
  const validateField = async (
    field: keyof T,
    value: any
  ): Promise<boolean> => {
    try {
      // Valida apenas o campo específico
      await schema.validateAt(field as string, { [field]: value });

      // Remove erro se validação passou
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field as string];
        return newErrors;
      });

      return true;
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        Logger.debug("Validation error", { field, message: error.message });
        setErrors((prev) => ({
          ...prev,
          [field as string]: error.message,
        }));
      }
      return false;
    }
  };

  /**
   * Valida o formulário completo
   */
  const validateForm = async (data: T): Promise<boolean> => {
    try {
      await schema.validate(data, { abortEarly: false });
      setErrors({});
      Logger.debug("Form validation passed");
      return true;
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const validationErrors: ValidationErrors = {};

        error.inner.forEach((err) => {
          if (err.path) {
            validationErrors[err.path] = err.message;
          }
        });

        Logger.debug("Form validation failed", { errors: validationErrors });
        setErrors(validationErrors);
      }
      return false;
    }
  };

  /**
   * Limpa todos os erros
   */
  const clearErrors = () => {
    setErrors({});
  };

  /**
   * Limpa erro de um campo específico
   */
  const clearError = (field: keyof T) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field as string];
      return newErrors;
    });
  };

  return {
    errors,
    validateField,
    validateForm,
    clearErrors,
    clearError,
  };
}
