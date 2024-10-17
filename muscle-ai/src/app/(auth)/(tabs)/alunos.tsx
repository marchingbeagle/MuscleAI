import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStudents, setFilteredStudents] = useState(students);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const filtered = students.filter((student) =>
      student.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredStudents(filtered);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredStudents(students);
  };
  return (
    <View className="flex-1 bg-white">
      {/* Barra de pesquisa */}
      <View className="flex-row items-center p-4">
        {/* Ícone de pesquisa e campo de texto */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#F5F6F7",
            borderRadius: 20,
            paddingHorizontal: 10,
            flex: 1,
            height: 40,
          }}
        >
          <Feather name="search" size={18} color="gray" />
          <TextInput
            value={searchQuery}
            onChangeText={handleSearch}
            placeholder="Pesquisa"
            style={{
              marginLeft: 8,
              fontSize: 16,
              color: "#6C7072",
              flex: 1,
            }}
          />
        </View>

        {/* Botão Cancel */}
        <TouchableOpacity onPress={clearSearch} style={{ marginLeft: 10 }}>
          <Text style={{ color: "black", fontSize: 16 }}>Cancel</Text>
        </TouchableOpacity>
      </View>

      <View className="p-4">
        <Text className="text-xl font-bold text-center">
          Alunos cadastrados
        </Text>
        <View className="mt-4">
          <ScrollView>
            {filteredStudents.map((student, index) => (
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
