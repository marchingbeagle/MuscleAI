import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";

import InputGreen from "src/components/mycomponents/InputGreen.";
import { generateWorkout } from "src/services/gemini";
import { useLocalSearchParams } from "expo-router";

export default function TreinoPage() {
  const [name, setName] = useState("");
  const [metas, setMetas] = useState("");
  const [treinoScript, setTreinoScript] = useState("");
  const [loading, setLoading] = useState(false);

  const { nomeAluno, metaAluno } = useLocalSearchParams();

  if (!nomeAluno) {
    return (
      <View className="flex-1 p-6 bg-white">
        <Text className="text-base text-center text-red-500">
          Nenhum aluno selecionado.
        </Text>
      </View>
    );
  }

  const handleGenerateWorkout = async () => {
    if (!name || !metas) {
      Alert.alert("Atenção", "Preencha o nome e as metas do aluno!");
      return;
    }

    setLoading(true);
    try {
      const prompt = `Nome do aluno: ${name}. Metas: ${metas} - Crie um plano de treino personalizado.(faça curto, poucas palvras, não quero texto grande, não user Markdown)`;
      const generatedText = await generateWorkout(prompt);
      setTreinoScript(generatedText);
      Alert.alert("Treino Gerado!", "O treino foi gerado com sucesso!");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível gerar o treino. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setName(nomeAluno as string);
    setMetas(metaAluno as string);
  }, [nomeAluno]);

  return (
    <ScrollView className="flex-1 p-4 bg-white">
      <View className="flex items-center mb-6">
        <View className="w-full mb-4">
          <Text className="py-4 text-lg">
            Nome: {Array.isArray(nomeAluno) ? nomeAluno.join(", ") : nomeAluno}
          </Text>
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

      <View className="flex-row justify-between w-full mb-6">
        <TouchableOpacity
          className="bg-[#198155] flex-1 py-4 rounded-full mr-2"
          onPress={handleGenerateWorkout}
          disabled={loading}
        >
          <Text className="font-bold text-center text-white">
            {loading ? "Gerando o seu treino..." : "Gerar Treino"}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="w-full mb-4">
        <Text className="text-base">Treino:</Text>
        <TextInput
          value={treinoScript}
          onChangeText={setTreinoScript}
          placeholder="Seu treino irá aparecer aqui"
          className="w-full h-64 border border-[#6C7072] rounded-lg p-2"
          multiline
          style={{ textAlignVertical: "top" }}
        />
      </View>

      <TouchableOpacity className="bg-[#198155] py-4 rounded-full w-full">
        <Text className="font-bold text-center text-white">Salvar treino</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
