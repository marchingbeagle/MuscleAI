/**
 * Componente ValidationSummary
 * Exibe resumo de erros de validação no topo do formulário
 */

import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/app.constants';

interface ValidationSummaryProps {
  errors: { [key: string]: string };
  visible?: boolean;
}

/**
 * Traduz nomes técnicos de campos para nomes amigáveis
 */
const fieldNames: { [key: string]: string } = {
  nm_aluno: 'Nome',
  email_aluno: 'Email',
  peso: 'Peso',
  altura: 'Altura',
  genero_aluno: 'Gênero',
  data_nascimento: 'Data de Nascimento',
  deficiencias_aluno: 'Deficiências',
  nome_aluno: 'Nome do Aluno',
  metas: 'Metas',
  treino_gerado: 'Treino',
  id_aluno: 'Aluno',
  id_personal: 'Personal Trainer',
};

export function ValidationSummary({ errors, visible = true }: ValidationSummaryProps) {
  const errorCount = Object.keys(errors).length;

  if (!visible || errorCount === 0) {
    return null;
  }

  return (
    <View className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
      <View className="flex-row items-center mb-2">
        <Ionicons name="alert-circle" size={20} color={COLORS.DANGER} />
        <Text className="ml-2 text-base font-semibold text-red-700">
          {errorCount === 1 ? 'Corrija o erro abaixo:' : `Corrija os ${errorCount} erros abaixo:`}
        </Text>
      </View>

      <View className="ml-7">
        {Object.entries(errors).map(([field, message]) => (
          <View key={field} className="flex-row items-start mb-1">
            <Text className="text-red-600 mr-1">•</Text>
            <Text className="flex-1 text-sm text-red-600">
              <Text className="font-semibold">{fieldNames[field] || field}:</Text> {message}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
