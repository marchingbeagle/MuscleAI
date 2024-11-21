import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import ListaAlunos from "src/components/mycomponents/ListaAlunos";
import { prismaClient } from "src/services/db";
import { Aluno } from "@prisma/client";

export default function AlunosPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStudents, setFilteredStudents] = useState<Aluno[]>([]);
  const [students, setStudents] = useState<Aluno[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const studentsPrisma = await prismaClient.aluno.findMany();

        setStudents(studentsPrisma);
        setFilteredStudents(students);
      } catch (error) {
        console.error("Erro ao buscar alunos:", error);
      }
    };
    fetchStudents(); // Chama a função para buscar alunos
  }, []);

  const handleSearch = (text: string) => {
    setSearchQuery(text); // Atualiza a consulta de pesquisa

    const filtered = students.filter((student) =>
      student.nm_aluno.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredStudents(filtered); // Atualiza alunos filtrados
  };

  const clearSearch = () => {
    setSearchQuery(""); // Reseta a consulta de pesquisa
    setFilteredStudents(students); // Restaura a lista de alunos
  };

  return (
    <View className="flex-1 p-4 pt-12 bg-white">
      <View className="flex-row items-center">
        <View className="flex-row items-center bg-[#F5F6F7] rounded-full px-4 flex-1 h-10">
          <Feather name="search" size={18} color="gray" />
          <TextInput
            value={searchQuery}
            onChangeText={handleSearch}
            placeholder="Pesquisa"
            className="flex-1 pl-2 text-lg text-gray-300"
          />
        </View>
        <TouchableOpacity onPress={clearSearch} className="ml-4">
          <Text className="text-base text-black">Cancel</Text>
        </TouchableOpacity>
      </View>

      <View className="mt-6">
        <Text className="text-xl font-bold text-center">
          Alunos cadastrados
        </Text>
        <View className="mt-4">
          <FlatList
            data={students}
            keyExtractor={(item) => String(item.id_aluno)}
            renderItem={({ item }) => <ListaAlunos data={item} />}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => router.push("/cadastro")}
        className="absolute bottom-4 right-4 bg-[#198155] p-4 rounded-full"
      >
        <Feather name="plus" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
}
