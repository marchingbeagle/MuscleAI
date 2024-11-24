import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { prismaClient } from "src/services/db";
import { Aluno } from "@prisma/client";
import { Ionicons } from "@expo/vector-icons";
import AlunoHomePage from "src/components/mycomponents/AlunoHomePage";
import { useRouter } from "expo-router";

export default function Home() {
  const { user } = useUser();
  const router = useRouter();
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [metaSelected, setMetaSelected] = useState("");

  const [templatesTreino, setTemplatesTreino] = useState([
    {
      title: "Treino de Mobilidade e Flexibilidade",
      icon: "body-outline",
      selected: false,
    },
    {
      title: "Treino de Força",
      icon: "barbell-outline",
      selected: false,
    },
    {
      title: "Treino de Hipertrofia",
      icon: "fitness-outline",
      selected: false,
    },
    {
      title: "Treino de Resistência",
      icon: "timer-outline",
      selected: false,
    },
    {
      title: "Treino de Potência",
      icon: "flash-outline",
      selected: false,
    },
  ]);

  const handleVerTodosAlunos = () => {
    return router.push("/alunos");
  };

  useEffect(() => {
    async function fetchLastAlunos() {
      try {
        const last4Alunos = await prismaClient.aluno.findMany({
          take: 4,
          orderBy: {
            id_aluno: "desc",
          },
        });
        if (last4Alunos && last4Alunos.length > 0) {
          setAlunos(last4Alunos);
        } else {
          setAlunos([]);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Erro ao encontrar alunos:", error);
        setAlunos([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchLastAlunos();
  }, []);

  const handleTemplateTreino = (item: any) => {
    setTemplatesTreino((prev) =>
      prev.map((template) => ({
        ...template,
        selected: template.title === item.title,
      }))
    );
    setMetaSelected(item.title);
  };

  return isLoading ? (
    <View className="items-center justify-center flex-1 bg-white">
      <ActivityIndicator size="large" color="#2f855a" />
      <Text className="mt-4 text-gray-600">Carregando...</Text>
    </View>
  ) : (
    <ScrollView className="flex-1 bg-white">
      <View className="p-6">
        {/* Header Section */}
        <View className="flex-row items-center mb-8">
          <View className="flex-1">
            <Text className="mb-1 text-gray-600">Bem vindo de volta!</Text>
            <Text className="text-2xl font-bold text-[#2f855a]">
              {user?.firstName} 👋
            </Text>
          </View>
          <TouchableOpacity className="items-center justify-center w-10 h-10 rounded-full bg-gray-50">
            <Ionicons name="notifications-outline" size={24} color="#2f855a" />
          </TouchableOpacity>
        </View>

        {/* Training Options Section */}
        <View className="mb-8">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-bold text-gray-800">
              Opções de Treinos
            </Text>
          </View>

          <View className="space-y-3">
            {templatesTreino.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleTemplateTreino(item)}
                className={`${
                  item.selected ? "bg-green-800" : "bg-gray-50"
                } rounded-xl p-4 flex-row items-center`}
              >
                <View
                  className={`${
                    item.selected ? "bg-green-700" : "bg-white"
                  } w-12 h-12 rounded-full items-center justify-center`}
                >
                  <Ionicons
                    name={item.icon as any}
                    size={24}
                    color={item.selected ? "#fff" : "#2f855a"}
                  />
                </View>
                <Text
                  className={`flex-1 ml-4 font-medium ${
                    item.selected ? "text-white" : "text-gray-800"
                  }`}
                >
                  {item.title}
                </Text>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={item.selected ? "#fff" : "#2f855a"}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Students Section */}
        <View>
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-bold text-gray-800">
              Alunos Recentes
            </Text>
            <TouchableOpacity onPress={handleVerTodosAlunos}>
              <Text className="text-[#2f855a]">Ver todos</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row flex-wrap justify-between">
            {alunos.length === 0 ? (
              <View className="items-center w-full p-6 bg-gray-50 rounded-xl">
                <Ionicons name="people-outline" size={32} color="#9ca3af" />
                <Text className="mt-2 text-gray-500">
                  Nenhum Aluno Encontrado
                </Text>
              </View>
            ) : (
              alunos.map((item, index) => (
                <View key={index} className="w-[48%] mb-4">
                  <AlunoHomePage
                    nomeAluno={item.nm_aluno}
                    metaAluno={metaSelected}
                  />
                </View>
              ))
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
