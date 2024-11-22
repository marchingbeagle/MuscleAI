import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

export default function AlunoHomePage({
  nomeAluno,
  metaAluno,
}: {
  nomeAluno: string;
  metaAluno: string;
}) {
  const router = useRouter();
  return (
    <View className="flex flex-col items-center justify-center basis-1/5">
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/treinos",
            params: {
              nomeAluno: nomeAluno,
              metaAluno: metaAluno,
            },
          })
        }
        className="font-bold text-[#6b7280] text-base text-center leading-5"
      >
        <Text>{nomeAluno}</Text>
      </TouchableOpacity>
    </View>
  );
}
