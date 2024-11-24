import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { Feather, Ionicons } from "@expo/vector-icons";
import ListaAlunos from "src/components/mycomponents/ListaAlunos";
import { prismaClient } from "src/services/db";
import { Aluno } from "@prisma/client";

export default function Alunos() {
  const router = useRouter();
  const [students, setStudents] = useState<Aluno[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
    try {
      const data = await prismaClient.aluno.findMany({
        orderBy: {
          nm_aluno: "asc",
        },
      });
      setStudents(data);
    } catch (error) {
      console.error("Erro ao buscar alunos:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const filteredStudents = students.filter((student) =>
    student.nm_aluno.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View className="flex-1 bg-white">
      <View className="p-6 border-b border-gray-100">
        <Text className="text-2xl font-bold text-gray-800">Alunos</Text>
        <Text className="text-gray-500">Gerencie seus alunos</Text>
      </View>

      <View className="px-6 py-3">
        <View className="flex-row items-center px-4 bg-gray-50 rounded-xl">
          <Ionicons name="search-outline" size={20} color="#9ca3af" />
          <TextInput
            placeholder="Buscar alunos..."
            className="flex-1 h-12 ml-2 text-gray-800"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color="#9ca3af" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {isLoading ? (
        <View className="items-center justify-center flex-1">
          <ActivityIndicator size="large" color="#2f855a" />
          <Text className="mt-4 text-gray-600">Carregando alunos...</Text>
        </View>
      ) : (
        <View className="flex-1 px-6">
          {students.length === 0 ? (
            <View className="items-center justify-center flex-1">
              <Ionicons name="people-outline" size={48} color="#9ca3af" />
              <Text className="mt-4 text-gray-500">
                Nenhum aluno cadastrado
              </Text>
              <TouchableOpacity
                onPress={() => router.push("/cadastro")}
                className="mt-4 px-6 py-3 bg-[#2f855a] rounded-xl"
              >
                <Text className="font-medium text-white">Cadastrar Aluno</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <FlatList
              data={filteredStudents}
              keyExtractor={(item) => String(item.id_aluno)}
              renderItem={({ item }) => <ListaAlunos data={item} />}
              contentContainerStyle={{ paddingBottom: 100 }}
              ListEmptyComponent={() => (
                <View className="items-center justify-center flex-1 py-8">
                  <Text className="text-gray-500">
                    Nenhum resultado encontrado
                  </Text>
                </View>
              )}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      )}

      <TouchableOpacity
        onPress={() => router.push("/cadastro")}
        className="absolute bottom-6 right-6 bg-[#2f855a] w-14 h-14 rounded-full items-center justify-center shadow-lg"
        style={{
          elevation: 4,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        }}
      >
        <Feather name="plus" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
}
