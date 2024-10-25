import {
  View,
  Text,
  TouchableOpacity,
  TextInputComponent,
  TextInput,
} from "react-native";
import React from "react";
import InputGreen from "src/components/mycomponents/InputGreen.";

export default function AlunosPage() {
  const [name, setName] = React.useState("");
  const [peso, setPeso] = React.useState("");
  const [altura, setAltura] = React.useState("");
  const [deficiencia, setdeficiência] = React.useState("");

  const sendToDB = async (name: string, peso: any, altura: any, deficiencia: string) => {
    try {
      const newAluno = await prisma.aluno.create({
        data: {
          nm_aluno: name,
          peso: parseFloat(peso),
          altura: parseFloat(altura), 
          deficiencias_aluno: deficiencia,
        },
      });

  return (
    <View className="flex items-center mb-6 p-6">
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
          setValue={setdeficiência}
          placeholder="Descreva as deficiências do Aluno"
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          sendToDB(name, peso, altura, deficiencia);
        }}
        className="bg-[#198155] py-4 rounded-full w-full"
      >
        <Text className="text-white text-center font-bold">Salvar Aluno</Text>
      </TouchableOpacity>
    </View>
  );
}
