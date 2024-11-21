import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { prismaClient } from "src/services/db";
import { Aluno } from "@prisma/client";
import AlunoHomePage from "src/components/mycomponents/AlunoHomePage";
import { useRouter } from "expo-router";

export default function Home() {
  const { user } = useUser();
  const router = useRouter();
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const templatesTreino = [
    "Treino de Mobilidade e Flexibilidade",
    "Treino de Força",
    "Treino de Hipertrofia",
    "Treino de Resistência",
  ];

  useEffect(() => {
    async function fetchLastAlunos() {
      try {
        const last4Alunos = await prismaClient.aluno.findMany({
          take: 4,
          orderBy: {
            id_aluno: "desc",
          },
        });
        setAlunos(last4Alunos);
      } catch (error) {
        console.error("Erro ao encontrar alunos:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchLastAlunos();
  }, []);

  if (isLoading) return <Text>Loading...</Text>;
  return (
    <ScrollView className="p-4 pt-12">
      <View className="flex-row items-center gap-2">
        <Text className="text-xl font-bold text-[#2f855a]">
          Olá! {user?.firstName}, bem vindo de volta!
        </Text>
      </View>

      <Text className="text-lg font-bold text-[#35383f] py-4">
        Opções de Treino:
      </Text>

      <View className="flex flex-col gap-4">
        {templatesTreino.map((item, index) => (
          <TouchableOpacity
            key={index}
            className="bg-[#38a169] rounded-xl h-14 flex items-center justify-center"
            onPress={() => router.push(`/treinos?metasAluno=${item}`)}
          >
            <Text className="text-base font-bold text-white">{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text className="text-lg font-bold text-[#35383f] py-4">
        Alunos Recentes:
      </Text>
      <View className="flex-row flex-wrap justify-between gap-4 py-4">
        {alunos.map((item, index) => (
          <AlunoHomePage key={index} item={item} />
        ))}
      </View>
    </ScrollView>
  );
}
