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
import { PrismaClient } from "@prisma/client"; // Importar o PrismaClient

const prisma = new PrismaClient(); // Instanciar o PrismaClient

export default function AlunosPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const studentsPrisma = await prisma.aluno.findMany(); // Buscar alunos do Prisma
        setStudents(studentsPrisma);
        setFilteredStudents(studentsPrisma);
      } catch (error) {
        console.error("Erro ao buscar alunos:", error);
      }
    };

    fetchStudents();
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = students.filter((student) =>
      student.nm_aluno.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredStudents(filtered);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredStudents(students);
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
            onChangeText={handleSearch}
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
