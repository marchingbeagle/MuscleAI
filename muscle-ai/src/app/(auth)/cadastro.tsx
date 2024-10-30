import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import InputGreen from "src/components/mycomponents/InputGreen.";
import { useAuth } from "@clerk/clerk-expo";
import { prismaClient } from "src/services/db";

export default function AlunosPage() {
  const { userId } = useAuth();
  const [name, setName] = React.useState<string>("");
  const [peso, setPeso] = React.useState<string>("");
  const [altura, setAltura] = React.useState<string>("");
  const [deficiencia, setDeficiencia] = React.useState<string>("");

  const sendToDB = async (
    name: string,
    peso: string,
    altura: string,
    deficiencia: string
  ) => {
    try {
      const newAluno = await prismaClient.Aluno.create({
        data: {
          nm_aluno: name,
          peso: parseFloat(peso),
          altura: parseFloat(altura),
          deficiencias_aluno: deficiencia,
          id_personal: userId as string,
        },
      });
    } catch (error) {
      console.error("Error saving to database:", error);
    }
  };

  return (
    <View className="flex items-center p-6 mb-6">
      <View className="w-32 h-32 rounded-full bg-[#38a169]" />
      <View className="w-full mb-4">
        <Text className="text-base">Nome</Text>
        <InputGreen value={name} setValue={setName} placeholder="John" />
      </View>
      <View className="w-full mb-4">
        <Text className="text-base">Peso</Text>
        <TextInput
          value={peso}
          onChangeText={(value) => {
            setPeso(value);
          }}
          className="p-4 border-2 border-input py-2.5 px-4 rounded-lg border-gray-300"
          placeholder="67kg"
          keyboardType="number-pad"
        />
      </View>
      <View className="w-full mb-4">
        <Text className="text-base">Altura</Text>
        <TextInput
          value={altura}
          onChangeText={(value) => {
            setAltura(value);
          }}
          className="p-4 border-2 border-input py-2.5 px-4 rounded-lg border-gray-300"
          placeholder="175cm"
          keyboardType="number-pad"
        />
      </View>

      <View className="w-full mb-4">
        <Text className="text-base">Deficiências do aluno</Text>
        <InputGreen
          value={deficiencia}
          setValue={setDeficiencia}
          placeholder="Descreva as deficiências do Aluno"
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          sendToDB(name, peso, altura, deficiencia);
        }}
        className="bg-[#198155] py-4 rounded-full w-full"
      >
        <Text className="font-bold text-center text-white">Salvar Aluno</Text>
      </TouchableOpacity>
    </View>
  );
}
