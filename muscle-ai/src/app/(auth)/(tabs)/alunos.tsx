import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { PrismaClient } from "@prisma/client";
import { Student } from "src/types/student";

const prisma = new PrismaClient();

export default function AlunosPage() {
  const router = useRouter();
  // Hook para gerenciar a consulta de pesquisa
  const [searchQuery, setSearchQuery] = useState("");
  // Hook para armazenar alunos filtrados
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  // Hook para armazenar todos os alunos
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    // Função assíncrona para buscar alunos do banco de dados
    const fetchStudents = async () => {
      try {
        // Busca alunos usando Prisma
        const studentsPrisma = await prisma.aluno.findMany();
        // Atualiza o estado com os alunos buscados
        setStudents(studentsPrisma);
        setFilteredStudents(studentsPrisma);
      } catch (error) {
        // Log de erro caso a busca falhe
        console.error("Erro ao buscar alunos:", error);
      }
    };

    fetchStudents(); // Chama a função para buscar alunos
  }, []);

  // Função para lidar com a pesquisa de alunos
  const handleSearch = (text: string) => {
    setSearchQuery(text); // Atualiza a consulta de pesquisa
    // Filtra alunos com base na consulta
    const filtered = students.filter((student) =>
      student.nm_aluno.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredStudents(filtered); // Atualiza alunos filtrados
  };

  // Função para limpar a pesquisa
  const clearSearch = () => {
    setSearchQuery(""); // Reseta a consulta de pesquisa
    setFilteredStudents(students); // Restaura a lista de alunos
  };

  return (
    <View className="flex-1 bg-white">
      {/* Barra de pesquisa */}
      <View className="flex-row items-center p-4">
        {/* Ícone de pesquisa e campo de texto */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#F5F6F7",
            borderRadius: 20,
            paddingHorizontal: 10,
            flex: 1,
            height: 40,
          }}
        >
          <Feather name="search" size={18} color="gray" />
          <TextInput
            value={searchQuery}
            onChangeText={handleSearch} // Atualiza a pesquisa ao digitar
            placeholder="Pesquisa"
            style={{
              marginLeft: 8,
              fontSize: 16,
              color: "#6C7072",
              flex: 1,
            }}
          />
        </View>

        {/* Botão Cancel */}
        <TouchableOpacity onPress={clearSearch} style={{ marginLeft: 10 }}>
          <Text style={{ color: "black", fontSize: 16 }}>Cancel</Text>
        </TouchableOpacity>
      </View>

      <View className="p-4">
        <Text className="text-xl font-bold text-center">
          Alunos cadastrados
        </Text>
        <View className="mt-4">
          <ScrollView>
            {filteredStudents.map((student) => (
              <View
                key={student.id_aluno}
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
                    {student.nm_aluno}, {student.data_nascimento?.toString()}
                  </Text>
                </View>
                <View className="flex-row">
                  {/* Botão de adicionar */}
                  <TouchableOpacity
                    onPress={() =>
                      router.push(
                        `/addStudent?name=${student.nm_aluno}&age=${student.data_nascimento}`
                      )
                    }
                    className="mr-4"
                  >
                    <AntDesign name="bars" size={24} color="#767A7B" />
                  </TouchableOpacity>
                  {/* Botão de configuração */}
                  <TouchableOpacity
                    onPress={() =>
                      router.push(`/editarAluno?name=${student.nm_aluno}`)
                    }
                  >
                    <Feather name="edit" size={24} color="#198155" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
      {/* Botão de adicionar aluno */}
      <TouchableOpacity
        onPress={() => router.push("/cadastro")}
        className="absolute bottom-4 right-4 bg-[#198155] p-4 rounded-full"
      >
        <Feather name="plus" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
}
