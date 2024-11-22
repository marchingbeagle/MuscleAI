import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { prismaClient } from "src/services/db";
import { Aluno } from "@prisma/client";
import AlunoHomePage from "src/components/mycomponents/AlunoHomePage";

export default function Home() {
  const { user } = useUser();
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [metaSelected, setMetaSelected] = useState("");

  const [templatesTreino, setTemplatesTreino] = useState([
    {
      title: "Treino de Mobilidade e Flexibilidade",
      selected: false,
    },
    {
      title: "Treino de Força",
      selected: false,
    },
    {
      title: "Treino de Hipertrofia",
      selected: false,
    },
    {
      title: "Treino de Resistência",
      selected: false,
    },
    {
      title: "Treino de Potência",
      selected: false,
    },
  ]);

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
    <Text>Carregando...</Text>
  ) : (
    <ScrollView className="p-4 pt-12">
      <View className="flex-row items-center gap-2">
        <Text className="text-xl font-bold text-[#2f855a]">
          Olá! {user?.firstName}, bem vindo de volta!
        </Text>
      </View>

      <Text className="text-lg font-bold text-[#35383f] py-4">
        Opções de treinos sugeridas:
      </Text>

      <View className="flex flex-col gap-4">
        {templatesTreino.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleTemplateTreino(item)}
            className={`${
              item.selected ? "bg-green-800" : "bg-[#38a169]"
            } rounded-xl h-14 flex items-center justify-center`}
          >
            <Text className="text-base font-bold text-white">{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text className="text-lg font-bold text-[#35383f] py-4">
        Selecione um aluno recente:
      </Text>
      <View className="flex-row flex-wrap justify-between gap-4 py-4">
        {alunos.length == 0 ? (
          <Text>Nenhum Aluno Encontrado</Text>
        ) : (
          alunos.map((item, index) => (
            <AlunoHomePage
              key={index}
              nomeAluno={item.nm_aluno}
              metaAluno={metaSelected}
            />
          ))
        )}
      </View>
    </ScrollView>
  );
}
