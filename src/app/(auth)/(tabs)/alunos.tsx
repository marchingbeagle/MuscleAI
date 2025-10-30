import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { Feather, Ionicons } from "@expo/vector-icons";
import ListaAlunos from "src/components/mycomponents/ListaAlunos";
import { useAlunos } from "../../../hooks/useAlunos";
import { LoadingState, EmptyState } from "../../../components/ui";
import { COLORS, ROUTES } from "../../../constants/app.constants";
import Logger from "../../../lib/logger";

export default function Alunos() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Hook customizado gerencia toda a lógica de dados
  const { alunos, loading, error } = useAlunos();

  Logger.debug("Alunos: Renderizando", {
    total: alunos.length,
    loading,
    error,
  });

  // Filtragem local
  const filteredStudents = alunos.filter((student) =>
    student.nm_aluno.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ✅ Estados padronizados
  if (loading) {
    return <LoadingState message="Carregando alunos..." />;
  }

  if (error) {
    return (
      <View className="flex-1 bg-white items-center justify-center p-6">
        <Ionicons name="alert-circle" size={64} color={COLORS.DANGER} />
        <Text className="text-gray-700 font-semibold text-lg mt-4 text-center">
          Erro ao carregar alunos
        </Text>
        <Text className="text-gray-500 text-base mt-2 text-center">
          {error}
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="p-6 border-b border-gray-100">
        <Text className="text-2xl font-bold text-gray-800">Alunos</Text>
        <Text className="text-gray-500">Gerencie seus alunos</Text>
      </View>

      {/* Search Bar */}
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

      {/* Lista de Alunos */}
      <View className="flex-1 px-6">
        {alunos.length === 0 ? (
          // ✅ EmptyState padronizado
          <EmptyState
            icon="people-outline"
            message="Nenhum aluno cadastrado"
            description="Comece cadastrando seu primeiro aluno"
          />
        ) : (
          <FlatList
            data={filteredStudents}
            keyExtractor={(item) => String(item.id_aluno)}
            renderItem={({ item }) => <ListaAlunos data={item} />}
            contentContainerStyle={{ paddingBottom: 100 }}
            ListEmptyComponent={() => (
              <EmptyState
                icon="search-outline"
                message="Nenhum resultado encontrado"
                description="Tente buscar com outros termos"
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      {/* Botão Flutuante */}
      <TouchableOpacity
        onPress={() => router.push(ROUTES.AUTH.CADASTRO)}
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
