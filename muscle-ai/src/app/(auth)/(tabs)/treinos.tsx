import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";

import InputGreen from "src/components/mycomponents/InputGreen.";
import { generateWorkout } from "src/services/gemini"; // Serviço para a API Gemini

export default function TreinoPage() {
  // Estado para armazenar o nome, metas e script do treino
  const [name, setName] = useState("");
  const [metas, setMetas] = useState("");
  const [treinoScript, setTreinoScript] = useState("");
  const [loading, setLoading] = useState(false); // Para indicar carregamento

  // Função para gerar treino
  const handleGenerateWorkout = async () => {
    if (!name || !metas) {
      Alert.alert("Atenção", "Preencha o nome e as metas do aluno!");
      return;
    }

    setLoading(true); // Inicia o estado de carregamento
    try {
      const prompt = `Nome do aluno: ${name}\nMetas: ${metas}\n\nCrie um plano de treino personalizado.(faça curto, poucas palvras, não quero texto grande)`;
      const generatedText = await generateWorkout(prompt);
      setTreinoScript(generatedText); // Atualiza o script com o resultado gerado
      Alert.alert("Treino Gerado!", "O treino foi gerado com sucesso!");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível gerar o treino. Tente novamente.");
    } finally {
      setLoading(false); // Finaliza o estado de carregamento
    }
  };

  return (
    <ScrollView className="flex-1 p-6 bg-white">
      {/* Barra de pesquisa */}
      <View className="flex-row items-center mb-4">
        <View className="flex-row items-center bg-[#F5F6F7] rounded-3xl px-3 flex-1 h-10">
          <Feather name="search" size={18} color="gray" />
          <TextInput
            placeholder="Pesquisa"
            className="ml-2 text-base text-[#6C7072] flex-1"
          />
        </View>
        <TouchableOpacity className="ml-4">
          <Text className="text-base text-black">Cancel</Text>
        </TouchableOpacity>
      </View>

      {/* Avatar e inputs de nome/metas */}
      <View className="flex items-center mb-6">
        <View className="w-32 h-32 rounded-full bg-[#38a169]" />
        <View className="w-full mb-4">
          <Text className="text-base">Nome</Text>
          <InputGreen value={name} setValue={setName} placeholder="Nome do aluno" />
        </View>
        <View className="w-full mb-4">
          <Text className="text-base">Metas do aluno</Text>
          <InputGreen
            value={metas}
            setValue={setMetas}
            placeholder="Metas do aluno"
          />
        </View>
      </View>

      {/* Botões "Gerar Novo Treino" e "Editar" */}
      <View className="flex-row justify-between w-full mb-6">
        <TouchableOpacity
          className="bg-[#198155] flex-1 py-4 rounded-full mr-2"
          onPress={handleGenerateWorkout}
          disabled={loading} // Desabilita o botão durante o carregamento
        >
          <Text className="font-bold text-center text-white">
            {loading ? "Gerando..." : "Gerar Novo Treino"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-[#FBBF24] flex-1 py-4 rounded-full ml-2">
          <Text className="font-bold text-center text-white">Editar</Text>
        </TouchableOpacity>
      </View>

      {/* Campo de script de treino */}
      <View className="w-full mb-4">
        <Text className="text-base">Script do seu treino</Text>
        <TextInput
          value={treinoScript}
          onChangeText={setTreinoScript}
          placeholder="Script do seu treino"
          className="w-full h-32 border border-[#6C7072] rounded-lg p-2"
          multiline
          style={{ textAlignVertical: "top" }} // Alinha o texto ao topo
        />
      </View>

      {/* Botão "Salvar treino" */}
      <TouchableOpacity className="bg-[#198155] py-4 rounded-full w-full">
        <Text className="font-bold text-center text-white">Salvar treino</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
