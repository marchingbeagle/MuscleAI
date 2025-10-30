import { View, Text, TextInput, ScrollView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { generateWorkout } from 'src/services/gemini';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';
import { treinoService } from '../../services/treinoService';
import { Button, EmptyState } from '../../components/ui';
import Logger from '../../lib/logger';
import { ErrorHandler } from '../../lib/errorHandler';

export default function TreinoPage() {
  const { userId } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [metas, setMetas] = useState('');
  const [alunoId, setAlunoId] = useState<string>('');
  const [treinoScript, setTreinoScript] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { nomeAluno, metaAluno, idAluno } = useLocalSearchParams();

  useEffect(() => {
    setAlunoId(idAluno as string);
    setName(nomeAluno as string);
    setMetas(metaAluno as string);
  }, [idAluno, nomeAluno, metaAluno]);

  Logger.debug('TreinoPage: Renderizando', {
    nomeAluno,
    metaAluno,
    idAluno,
    loading,
    isSaving,
  });

  if (!nomeAluno) {
    return (
      <View className="flex-1 bg-white">
        <EmptyState
          icon="barbell-outline"
          message="Nenhum aluno selecionado"
          description="Selecione um aluno para gerar o treino"
        />
      </View>
    );
  }

  const handleGenerateWorkout = async () => {
    if (!name || !metas) {
      Alert.alert('Atenção', 'Preencha o nome e as metas do aluno!');
      return;
    }

    setLoading(true);
    try {
      Logger.info('TreinoPage: Gerando treino', { name, metas });

      const prompt = `Nome do aluno: ${name}. Metas: ${metas} - Crie um plano de treino personalizado. Retorne separado por dias da semana, incluindo sabado e domingo (Gere numero de series e repeticoes, não use Markdown). No topo da sua mensagem, inclua as metas do treino.`;
      const generatedText = await generateWorkout(prompt);

      setTreinoScript(generatedText);
      Logger.info('TreinoPage: Treino gerado com sucesso');
      Alert.alert('Treino Gerado!', 'O treino foi gerado com sucesso!');
    } catch (error) {
      const errorMessage = ErrorHandler.getErrorMessage(error);
      Logger.error('TreinoPage: Erro ao gerar treino', error);
      Alert.alert('Erro', 'Não foi possível gerar o treino. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTreino = async () => {
    if (!treinoScript || !nomeAluno) {
      Alert.alert('Erro', 'Dados do treino incompletos');
      return;
    }

    setIsSaving(true);
    try {
      Logger.info('TreinoPage: Salvando treino', { alunoId });

      await treinoService.criarTreino({
        treino_gerado: treinoScript,
        id_aluno: alunoId,
        id_personal: userId as string,
      });

      Logger.info('TreinoPage: Treino salvo com sucesso');
      Alert.alert('Sucesso', 'Treino salvo com sucesso!');
      router.back();
    } catch (error) {
      const errorMessage = ErrorHandler.getErrorMessage(error);
      Logger.error('TreinoPage: Erro ao salvar treino', error);
      Alert.alert('Erro', 'Não foi possível salvar o treino');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-6">
        {/* Header Section */}
        <View className="flex-row items-center mb-8">
          <View className="flex-1">
            <Text className="text-2xl font-bold text-[#2f855a]">Gerar Treino</Text>
            <Text className="text-gray-600">Crie um treino personalizado para seu aluno</Text>
          </View>
        </View>

        <View className="space-y-4">
          <View>
            <Text className="mb-2 font-medium text-gray-800">Nome do Aluno</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              className="p-4 border border-gray-200 bg-gray-50 rounded-xl"
              placeholder="Nome do aluno"
            />
          </View>

          <View>
            <Text className="mb-2 font-medium text-gray-800">Metas do Treino</Text>
            <TextInput
              value={metas}
              onChangeText={setMetas}
              className="p-4 border border-gray-200 bg-gray-50 rounded-xl"
              placeholder="Descreva as metas do treino"
              multiline={true}
            />
          </View>

          {/* ✅ Button component padronizado */}
          <Button
            onPress={handleGenerateWorkout}
            disabled={loading}
            loading={loading}
            className="mt-6"
          >
            Gerar Treino
          </Button>

          {treinoScript && (
            <>
              <View className="p-4 mt-6 bg-gray-50 rounded-xl">
                <Text className="text-gray-800">{treinoScript}</Text>
              </View>

              {/* ✅ Button component padronizado */}
              <Button
                onPress={handleSaveTreino}
                disabled={isSaving}
                loading={isSaving}
                className="mt-4"
              >
                Salvar Treino
              </Button>
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
