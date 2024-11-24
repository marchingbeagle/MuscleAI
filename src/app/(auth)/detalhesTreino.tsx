import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { prismaClient } from "src/services/db";

interface Treino {
  id_treino: string;
  treino_gerado: string;
  id_aluno: string;
  id_personal: string;
}

export default function DetalhesTreino() {
  const { idAluno, nomeAluno } = useLocalSearchParams();
  const [treinos, setTreinos] = useState<Treino[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useFocusEffect(
    React.useCallback(() => {
      async function fetchTreinos() {
        setLoading(true);
        try {
          const treinosData = await prismaClient.treino.findMany({
            where: {
              id_aluno: idAluno as string,
            },
            orderBy: {
              id_treino: "desc",
            },
          });
          setTreinos(treinosData);
        } catch (error) {
          console.error("Erro ao buscar treinos:", error);
        } finally {
          setLoading(false);
        }
      }

      fetchTreinos();
    }, [idAluno])
  );

  if (loading) {
    return (
      <View className="items-center justify-center flex-1 bg-white">
        <ActivityIndicator size="large" color="#2f855a" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <ScrollView>
        <View className="p-6">
          <View className="mb-8">
            <Text className="text-2xl font-bold text-[#2f855a]">
              Treinos de {nomeAluno}
            </Text>
            <Text className="text-gray-600">Histórico de treinos gerados</Text>
          </View>

          <View className="space-y-4">
            {treinos.length === 0 ? (
              <View className="items-center justify-center p-6 bg-gray-50 rounded-xl">
                <Ionicons name="barbell-outline" size={32} color="#9ca3af" />
                <Text className="mt-2 text-gray-500">
                  Nenhum treino encontrado
                </Text>
              </View>
            ) : (
              treinos.map((treino) => (
                <View
                  key={treino.id_treino}
                  className="p-4 bg-gray-50 rounded-xl"
                >
                  <Text className="text-gray-800">{treino.treino_gerado}</Text>
                </View>
              ))
            )}
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() =>
          router.push(`/editarTreino?idTreino=${treinos[0]?.id_treino}`)
        }
        className="absolute bottom-6 right-6 bg-[#2f855a] w-14 h-14 rounded-full items-center justify-center shadow-lg"
        style={{
          elevation: 4,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        }}
      >
        <Feather name="edit-2" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
}
