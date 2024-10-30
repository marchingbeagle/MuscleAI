import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import InputGreen from "src/components/mycomponents/InputGreen.";
import { useAuth } from "@clerk/clerk-expo";
import { prismaClient } from "src/services/db";

export default function AlunosPage() {
  const { userId } = useAuth(); // Obtém o ID do usuário autenticado
  const [name, setName] = React.useState<string>(""); // Estado para o nome do aluno
  const [peso, setPeso] = React.useState<string>(""); // Estado para o peso do aluno
  const [altura, setAltura] = React.useState<string>(""); // Estado para a altura do aluno
  const [deficiencia, setDeficiencia] = React.useState<string>(""); // Estado para deficiências do aluno

  // Função assíncrona para enviar dados do aluno para o banco de dados
  const sendToDB = async (
    name: string,
    peso: string,
    altura: string,
    deficiencia: string
  ) => {
    try {
      const newAluno = await prismaClient.aluno.create({
        data: {
          nm_aluno: name, // Nome do aluno
          peso: parseFloat(peso), // Peso convertido para número
          altura: parseFloat(altura), // Altura convertida para número
          deficiencias_aluno: deficiencia, // Deficiências do aluno
          id_personal: userId as string, // ID do personal trainer
          email_aluno: "", // Email do aluno (placeholder)
          numero_aluno: "", // Número do aluno (placeholder)
          data_nascimento: new Date(), // Data de nascimento (placeholder)
          genero_aluno: "", // Gênero do aluno (placeholder)
          nm_personal: "", // Nome do personal trainer (placeholder)
          id_treino: "", // ID do treino (placeholder)
        },
      });
    } catch (error) {
      console.error("Error saving to database:", error); // Log de erro ao salvar no banco de dados
    }
  };

  return (
    <View className="flex items-center p-6 mb-6">
      <View className="w-32 h-32 rounded-full bg-[#38a169]" />{" "}
      {/* Placeholder para imagem do aluno */}
      <View className="w-full mb-4">
        <Text className="text-base">Nome</Text>
        <InputGreen value={name} setValue={setName} placeholder="John" />{" "}
        {/* Campo para nome do aluno */}
      </View>
      <View className="w-full mb-4">
        <Text className="text-base">Peso</Text>
        <TextInput
          value={peso}
          onChangeText={(value) => {
            setPeso(value); // Atualiza o estado do peso
          }}
          className="p-4 border-2 border-input py-2.5 px-4 rounded-lg border-gray-300"
          placeholder="67kg"
          keyboardType="number-pad" // Teclado numérico para entrada de peso
        />
      </View>
      <View className="w-full mb-4">
        <Text className="text-base">Altura</Text>
        <TextInput
          value={altura}
          onChangeText={(value) => {
            setAltura(value); // Atualiza o estado da altura
          }}
          className="p-4 border-2 border-input py-2.5 px-4 rounded-lg border-gray-300"
          placeholder="175cm"
          keyboardType="number-pad" // Teclado numérico para entrada de altura
        />
      </View>
      <View className="w-full mb-4">
        <Text className="text-base">Deficiências do aluno</Text>
        <InputGreen
          value={deficiencia}
          setValue={setDeficiencia} // Atualiza o estado das deficiências
          placeholder="Descreva as deficiências do Aluno"
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          sendToDB(name, peso, altura, deficiencia); // Chama a função para enviar dados ao banco
        }}
        className="bg-[#198155] py-4 rounded-full w-full"
      >
        <Text className="font-bold text-center text-white">Salvar Aluno</Text>{" "}
        {/* Botão para salvar aluno */}
      </TouchableOpacity>
    </View>
  );
}
