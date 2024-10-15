import { View, Text } from "react-native";
import React, { useState } from "react";
import { Input } from "src/components/Input";

export default function TreinoPage() {
  const [nome, setNome] = React.useState("")
  return (
    <View className="flex items-center justify-center h-full">
      <Text>Treino</Text>
      <Input value={nome}
            setValue={setNome}
            placeholder="johndoe@example.com"/>
    </View>
  );
}
//tela de gerar treino