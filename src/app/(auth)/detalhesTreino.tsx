import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
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

  const handleDeleteTreino = async (idTreino: string) => {
    Alert.alert(
      "Confirmar exclusão",
      "Tem certeza que deseja excluir este treino?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await prismaClient.treino.delete({
                where: {
                  id_treino: idTreino,
                },
              });
              // Refresh treinos list
              const updatedTreinos = treinos.filter(
                (t) => t.id_treino !== idTreino
              );
              setTreinos(updatedTreinos);
            } catch (error) {
              console.error("Erro ao deletar treino:", error);
              Alert.alert("Erro", "Não foi possível excluir o treino");
            }
          },
        },
      ]
    );
  };

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
              treinos.map((treino, index) => (
                <View
                  key={treino.id_treino}
                  className="mb-4 overflow-hidden bg-gray-50 rounded-xl"
                >
                  <View className="flex-row items-center justify-between p-3 bg-gray-100 border-b border-gray-200">
                    <Text className="font-medium text-gray-800">
                      Treino {treinos.length - index}
                    </Text>
                    <View className="flex-row space-x-2">
                      <TouchableOpacity
                        onPress={() =>
                          router.push(
                            `/editarTreino?idTreino=${treino.id_treino}`
                          )
                        }
                        className="items-center justify-center w-8 h-8 bg-green-100 rounded-full"
                      >
                        <Feather name="edit-2" size={16} color="#2f855a" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleDeleteTreino(treino.id_treino)}
                        className="items-center justify-center w-8 h-8 bg-red-100 rounded-full"
                      >
                        <Feather name="trash-2" size={16} color="#dc2626" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View className="p-4">
                    <Text className="text-gray-800">
                      {treino.treino_gerado}
                    </Text>
                  </View>
                </View>
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
