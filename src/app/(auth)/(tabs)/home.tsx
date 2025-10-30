import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import AlunoHomePage from "src/components/mycomponents/AlunoHomePage";
import { useRouter } from "expo-router";
import { useAlunos } from "../../../hooks/useAlunos";
import { LoadingState, EmptyState } from "../../../components/ui";
import { ROUTES, COLORS } from "../../../constants/app.constants";
import Logger from "../../../lib/logger";

// Tipos para templates de treino
interface TreinoTemplate {
  title: string;
  icon: string;
  selected: boolean;
}

export default function Home() {
  const { user } = useUser();
  const router = useRouter();
  const [metaSelected, setMetaSelected] = useState("");

  // ✅ Hook customizado busca todos os alunos
  const { alunos: todosAlunos, loading, error } = useAlunos();

  // Pega apenas os 4 mais recentes
  const alunos = todosAlunos.slice(0, 4);

  const [templatesTreino, setTemplatesTreino] = useState<TreinoTemplate[]>([
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

  Logger.debug("Home: Renderizando", {
    alunosCount: alunos.length,
    loading,
    error,
    metaSelected,
  });

  const handleVerTodosAlunos = () => {
    router.push(ROUTES.AUTH.ALUNOS);
  };

  const handleTemplateTreino = (item: TreinoTemplate) => {
    setTemplatesTreino((prev) =>
      prev.map((template) => ({
        ...template,
        selected: template.title === item.title,
      }))
    );
    setMetaSelected(item.title);
  };

  // ✅ Estado de loading padronizado
  if (loading) {
    return <LoadingState message="Carregando dashboard..." />;
  }

  // ✅ Estado de loading padronizado
  if (loading) {
    return <LoadingState message="Carregando dashboard..." />;
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-6">
        {/* Header */}
        <View className="flex-row items-center mb-8">
          <View className="flex-1">
            <Text className="mb-1 text-gray-600">Bem vindo de volta!</Text>
            <Text className="text-2xl font-bold text-[#2f855a]">
              {user?.firstName} 👋
            </Text>
          </View>
          <TouchableOpacity className="items-center justify-center w-10 h-10 rounded-full bg-gray-50">
            <Ionicons
              name="notifications-outline"
              size={24}
              color={COLORS.PRIMARY}
            />
          </TouchableOpacity>
        </View>

        {/* Opções de Treino */}
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
                    color={item.selected ? "#fff" : COLORS.PRIMARY}
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
                  color={item.selected ? "#fff" : COLORS.PRIMARY}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Alunos Recentes */}
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
              // ✅ EmptyState padronizado
              <View className="w-full">
                <EmptyState
                  icon="people-outline"
                  message="Nenhum Aluno Encontrado"
                  description="Cadastre seu primeiro aluno para começar"
                />
              </View>
            ) : (
              alunos.map((item, index) => (
                <View key={index} className="w-[48%] mb-4">
                  <AlunoHomePage
                    nomeAluno={item.nm_aluno}
                    metaAluno={metaSelected}
                    idAluno={item.id_aluno}
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
