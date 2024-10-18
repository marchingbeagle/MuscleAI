import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import InputGreen from "src/components/mycomponents/InputGreen.";

export default function AlunosPage() {
  const [name, setName] = React.useState("");
  const [metas, setMetas] = React.useState("");
  const [treinoScript, setTreinoScript] = React.useState("");

  return (
    <View className="flex items-center mb-6 p-6">
      <View className="w-32 h-32 rounded-full bg-[#38a169]" />
      <View className="w-full mb-4">
        <Text className="text-base">Nome</Text>
        <InputGreen value={name} setValue={setName} placeholder="John" />
      </View>
      <View className="w-full mb-4">
        <Text className="text-base">Peso</Text>
        <InputGreen value={metas} setValue={setMetas} placeholder="67kg" />
      </View>
      <View className="w-full mb-4">
        <Text className="text-base">Altura</Text>
        <InputGreen value={metas} setValue={setMetas} placeholder="165cm" />
      </View>
      <View className="w-full mb-4">
        <Text className="text-base">Deficiências do aluno</Text>
        <InputGreen
          value={metas}
          setValue={setMetas}
          placeholder="Descreva as deficiências do Aluno"
        />
      </View>

      <TouchableOpacity className="bg-[#198155] py-4 rounded-full w-full">
        <Text className="text-white text-center font-bold">Salvar Aluno</Text>
      </TouchableOpacity>
    </View>
  );
}
