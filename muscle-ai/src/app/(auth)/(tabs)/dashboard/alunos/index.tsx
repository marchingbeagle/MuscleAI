import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";

const students = [
  { name: "Ana", age: 20 },
  { name: "John", age: 18 },
  { name: "Lilian", age: 32 },
  { name: "Fábio", age: 41 },
  { name: "Lucas", age: 14 },
  { name: "Carol", age: 56 },
  { name: "Júlia", age: 20 },
];

export default function AlunosPage() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      <View className="p-4">
        <Text className="text-xl font-bold text-center">
          Alunos cadastrados
        </Text>
        <View className="mt-4">
          <ScrollView>
            {students.map((student, index) => (
              <View
                key={index}
                className="flex-row justify-between items-center py-2 px-4 border-b"
                style={{
                  borderColor: "#6C7072",
                  width: "100%",
                }}
              >
                <View className="flex-row items-center">
                  {/* Avatar */}
                  <View className="w-10 h-10 bg-gray-300 rounded-full mr-4" />
                  <Text className="text-lg" style={{ color: "#6C7072" }}>
                    {student.name}, {student.age}
                  </Text>
                </View>
                <View className="flex-row">
                  {/* Botão de adicionar */}
                  <TouchableOpacity
                    onPress={() =>
                      router.push(
                        `/addStudent?name=${student.name}&age=${student.age}`
                      )
                    }
                    className="mr-4"
                  >
                    <Feather name="plus" size={24} color="#767A7B" />
                  </TouchableOpacity>
                  {/* Botão de configuração */}
                  <TouchableOpacity
                    onPress={() =>
                      router.push(`/settings?name=${student.name}`)
                    }
                  >
                    <Feather name="settings" size={24} color="#198155" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
      {/* Botão de adicionar aluno */}
      <TouchableOpacity
        onPress={() => router.push("/addNewStudent")}
        className="absolute bottom-4 right-4 bg-[#198155] p-4 rounded-full"
      >
        <Feather name="plus" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
}
