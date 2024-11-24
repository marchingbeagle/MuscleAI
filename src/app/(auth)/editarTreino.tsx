import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { prismaClient } from "src/services/db";

export default function EditarTreino() {
  const { idTreino } = useLocalSearchParams();
  const router = useRouter();
  const [treinoGerado, setTreinoGerado] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchTreino() {
      try {
        const treino = await prismaClient.treino.findUnique({
          where: {
            id_treino: idTreino as string,
          },
        });
        if (treino) {
          setTreinoGerado(treino.treino_gerado);
        }
      } catch (error) {
        console.error("Erro ao buscar treino:", error);
        Alert.alert("Erro", "Não foi possível carregar o treino");
      } finally {
        setLoading(false);
      }
    }
    fetchTreino();
  }, [idTreino]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await prismaClient.treino.update({
        where: {
          id_treino: idTreino as string,
        },
        data: {
          treino_gerado: treinoGerado,
        },
      });
      Alert.alert("Sucesso", "Treino atualizado com sucesso!");
      router.back();
    } catch (error) {
      console.error("Erro ao atualizar treino:", error);
      Alert.alert("Erro", "Não foi possível atualizar o treino");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View className="items-center justify-center flex-1 bg-white">
        <ActivityIndicator size="large" color="#2f855a" />
      </View>
    );
  }

  return (
    <View className="flex-1 p-6 bg-white">
      <View className="mb-8">
        <Text className="text-2xl font-bold text-[#2f855a]">Editar Treino</Text>
        <Text className="text-gray-600">
          Faça as alterações necessárias no treino
        </Text>
      </View>

      <View className="flex-1">
        <Text className="mb-2 font-medium text-gray-800">
          Descrição do Treino
        </Text>
        <TextInput
          value={treinoGerado}
          onChangeText={setTreinoGerado}
          className="p-4 border border-gray-200 bg-gray-50 rounded-xl"
          multiline
          numberOfLines={10}
          textAlignVertical="top"
        />
      </View>

      <TouchableOpacity
        onPress={handleSave}
        disabled={saving}
        className="mt-6 bg-[#2f855a] py-4 rounded-xl"
      >
        {saving ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="font-medium text-center text-white">
            Salvar Alterações
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
