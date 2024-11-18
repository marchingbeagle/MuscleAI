import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import { Aluno } from "@prisma/client";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router/build/exports";

interface Props {
  data: Aluno;
}

export default function ListaAlunos({ data }: Props) {
  const router = useRouter();
  return (
    <View
      key={data.id_aluno}
      className="flex-row items-center justify-between px-4 py-2 border-b"
      style={{
        borderColor: "#6C7072",
        width: "100%",
      }}
    >
      <View className="flex-row items-center">
        {/* Avatar */}
        <View className="w-10 h-10 mr-4 bg-gray-300 rounded-full" />
        <Text className="text-lg" style={{ color: "#6C7072" }}>
          {data.nm_aluno}, {data.data_nascimento?.toString()}
        </Text>
      </View>
      <View className="flex-row">
        {/* Botão de adicionar */}
        <TouchableOpacity
          onPress={() =>
            router.push(
              `/addStudent?name=${data.nm_aluno}&age=${data.data_nascimento}`
            )
          }
          className="mr-4"
        >
          <AntDesign name="bars" size={24} color="#767A7B" />
        </TouchableOpacity>
        {/* Botão de configuração */}
        <TouchableOpacity
          onPress={() => router.push(`/editarAluno?name=${data.nm_aluno}`)}
        >
          <Feather name="edit" size={24} color="#198155" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
