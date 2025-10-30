import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { Aluno } from '@prisma/client';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  data: Aluno;
}

export default function ListaAlunos({ data }: Props) {
  const router = useRouter();

  const handleStudentPress = () => {
    router.push(`/editarAluno?id=${data.id_aluno}`);
  };

  const handleGerarTreinoRoute = () => {
    router.push(`/treinos?nomeAluno=${data.nm_aluno}&idAluno=${data.id_aluno}`);
  };

  const handleDetalhesTreinoRoute = () => {
    router.push(`/detalhesTreino?nomeAluno=${data.nm_aluno}&idAluno=${data.id_aluno}`);
  };

  return (
    <TouchableOpacity
      onPress={handleDetalhesTreinoRoute}
      className="flex-row items-center p-4 mb-3 bg-gray-50 rounded-xl"
    >
      {/* Avatar Section */}
      <View className="items-center justify-center w-12 h-12 mr-4 bg-white rounded-full">
        <Ionicons name="person-outline" size={24} color="#2f855a" />
      </View>

      {/* Info Section */}
      <View className="flex-1">
        <Text className="text-base font-medium text-gray-800">{data.nm_aluno}</Text>
      </View>

      {/* Action Buttons */}
      <View className="flex-row items-center">
        <TouchableOpacity
          onPress={handleStudentPress}
          className="items-center justify-center w-10 h-10 bg-gray-100 rounded-full"
        >
          <Ionicons name="pencil-outline" size={20} color="#2f855a" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleGerarTreinoRoute}
          className="items-center justify-center w-10 h-10 mx-2 bg-green-100 rounded-full"
        >
          <Ionicons name="add-outline" size={20} color="#2f855a" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleDetalhesTreinoRoute}
          className="items-center justify-center w-10 h-10 mr-2 bg-green-100 rounded-full"
        >
          <Ionicons name="barbell-outline" size={20} color="#2f855a" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
