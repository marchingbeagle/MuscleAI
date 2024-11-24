import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

import { generateWorkout } from "src/services/gemini";
import { useLocalSearchParams, useRouter } from "expo-router";
import { prismaClient } from "src/services/db";
import { useAuth } from "@clerk/clerk-expo";

export default function TreinoPage() {
  const { userId } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [metas, setMetas] = useState("");
  const [alunoId, setAlunoId] = useState<string>("");
  const [treinoScript, setTreinoScript] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { nomeAluno, metaAluno, idAluno } = useLocalSearchParams();

  useEffect(() => {
    setAlunoId(idAluno as string);
  }, [idAluno]);

  if (!nomeAluno) {
    return (
      <View className="flex-1 p-6 bg-white">
        <Text className="text-base text-center text-red-500">
          Nenhum aluno selecionado.
        </Text>
      </View>
    );
  }

  const handleGenerateWorkout = async () => {
    if (!name || !metas) {
      Alert.alert("Atenção", "Preencha o nome e as metas do aluno!");
      return;
    }

    setLoading(true);
    try {
      const prompt = `Nome do aluno: ${name}. Metas: ${metas} - Crie um plano de treino personalizado. Retorne separado por dias da semana, incluindo sabado e domingo (Gere numero de series e repeticoes, não use Markdown)`;
      const generatedText = await generateWorkout(prompt);
      setTreinoScript(generatedText);
      Alert.alert("Treino Gerado!", "O treino foi gerado com sucesso!");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível gerar o treino. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTreino = async () => {
    if (!treinoScript || !nomeAluno) {
      Alert.alert("Erro", "Dados do treino incompletos");
      return;
    }

    setIsSaving(true);
    try {
      await prismaClient.treino.create({
        data: {
          treino_gerado: treinoScript,
          id_aluno: alunoId,
          id_personal: userId as string,
        },
      });

      Alert.alert("Sucesso", "Treino salvo com sucesso!");
      router.back();
    } catch (error) {
      console.error("Erro ao salvar treino:", error);
      Alert.alert("Erro", "Não foi possível salvar o treino");
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    setName(nomeAluno as string);
    setMetas(metaAluno as string);
  }, [nomeAluno]);

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-6">
        {/* Header Section */}
        <View className="flex-row items-center mb-8">
          <View className="flex-1">
            <Text className="text-2xl font-bold text-[#2f855a]">
              Gerar Treino
            </Text>
            <Text className="text-gray-600">
              Crie um treino personalizado para seu aluno
            </Text>
          </View>
        </View>

        {!nomeAluno ? (
          <View className="items-center justify-center p-6 bg-gray-50 rounded-xl">
            <Ionicons name="barbell-outline" size={32} color="#9ca3af" />
            <Text className="mt-2 text-gray-500">Nenhum aluno selecionado</Text>
          </View>
        ) : (
          <View className="space-y-4">
            <View>
              <Text className="mb-2 font-medium text-gray-800">
                Nome do Aluno
              </Text>
              <TextInput
                value={name}
                onChangeText={setName}
                className="p-4 border border-gray-200 bg-gray-50 rounded-xl"
                placeholder="Nome do aluno"
              />
            </View>

            <View>
              <Text className="mb-2 font-medium text-gray-800">
                Metas do Treino
              </Text>
              <TextInput
                value={metas}
                onChangeText={setMetas}
                className="p-4 border border-gray-200 bg-gray-50 rounded-xl"
                placeholder="Descreva as metas do treino"
                multiline={true}
              />
            </View>

            <TouchableOpacity
              onPress={handleGenerateWorkout}
              className="mt-6 bg-[#2f855a] py-4 px-6 rounded-xl"
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="font-medium text-center text-white">
                  Gerar Treino
                </Text>
              )}
            </TouchableOpacity>

            {treinoScript && (
              <>
                <View className="p-4 mt-6 bg-gray-50 rounded-xl">
                  <Text className="text-gray-800">{treinoScript}</Text>
                </View>

                <TouchableOpacity
                  onPress={handleSaveTreino}
                  disabled={isSaving}
                  className="mt-4 bg-[#2f855a] py-4 px-6 rounded-xl"
                >
                  {isSaving ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text className="font-medium text-center text-white">
                      Salvar Treino
                    </Text>
                  )}
                </TouchableOpacity>
              </>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
}
