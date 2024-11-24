import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { prismaClient } from "src/services/db";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

interface EditAlunoProps {
  id_aluno: string;
  nm_aluno: string;
  email_aluno: string;
  data_nascimento: Date;
  peso: number;
  altura: number;
  genero_aluno: string;
  deficiencias_aluno?: string;
}

export default function EditarAluno() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [name, setName] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [deficiencia, setDeficiencia] = useState("");
  const [email, setEmail] = useState("");
  const [genero, setGenero] = useState("Masculino");
  const [dataNascimento, setDataNascimento] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [alunoId, setAlunoId] = useState<string>("");

  useEffect(() => {
    fetchAluno();
  }, []);

  const fetchAluno = async () => {
    try {
      const aluno = await prismaClient.aluno.findUnique({
        where: {
          id_aluno: id as string,
        },
      });

      if (aluno) {
        setName(aluno.nm_aluno);
        setPeso(aluno.peso.toString());
        setAltura(aluno.altura.toString());
        setDeficiencia(aluno.deficiencias_aluno || "");
        setEmail(aluno.email_aluno);
        setGenero(aluno.genero_aluno);
        setDataNascimento(new Date(aluno.data_nascimento));
        setAlunoId(aluno.id_aluno); // Add state for ID
      } else {
        Alert.alert("Erro", "Aluno não encontrado");
        router.back();
      }
    } catch (error) {
      console.error("Erro ao buscar aluno:", error);
      Alert.alert("Erro", "Não foi possível carregar os dados do aluno");
      router.back();
    }
  };

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDataNascimento(selectedDate);
    }
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleUpdate = async () => {
    try {
      if (!alunoId) {
        throw new Error("ID do aluno não encontrado");
      }

      const updateData: Partial<EditAlunoProps> = {
        nm_aluno: name,
        peso: parseFloat(peso),
        altura: parseFloat(altura),
        deficiencias_aluno: deficiencia,
        email_aluno: email,
        data_nascimento: dataNascimento,
        genero_aluno: genero,
      };

      await prismaClient.aluno.update({
        where: {
          id_aluno: alunoId,
        },
        data: updateData,
      });

      Alert.alert("Sucesso", "Aluno atualizado com sucesso!", [
        { text: "OK", onPress: () => router.push("/alunos") },
      ]);
    } catch (error) {
      console.error("Erro ao atualizar aluno:", error);
      Alert.alert(
        "Erro",
        error instanceof Error
          ? error.message
          : "Não foi possível atualizar o aluno"
      );
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-6">
        <View className="flex-row items-center mb-8">
          <View className="flex-1">
            <Text className="text-2xl font-bold text-[#2f855a]">
              Atualize os dados do aluno
            </Text>
          </View>
        </View>

        <View className="space-y-4">
          <View>
            <Text className="mb-2 font-medium text-gray-800">Nome</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              className="p-4 border border-gray-200 bg-gray-50 rounded-xl"
              placeholder="Nome do aluno"
            />
          </View>

          <View>
            <Text className="mb-2 font-medium text-gray-800">Peso</Text>
            <TextInput
              value={peso}
              onChangeText={setPeso}
              className="p-4 border border-gray-200 bg-gray-50 rounded-xl"
              placeholder="67kg"
              keyboardType="number-pad"
            />
          </View>

          <View>
            <Text className="mb-2 font-medium text-gray-800">Altura</Text>
            <TextInput
              value={altura}
              onChangeText={setAltura}
              className="p-4 border border-gray-200 bg-gray-50 rounded-xl"
              placeholder="175cm"
              keyboardType="number-pad"
            />
          </View>

          <View>
            <Text className="mb-2 font-medium text-gray-800">
              Data de Nascimento
            </Text>
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              className="p-4 border border-gray-200 bg-gray-50 rounded-xl"
            >
              <Text>{formatDate(dataNascimento)}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={dataNascimento}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>

          <View>
            <Text className="mb-2 font-medium text-gray-800">Deficiências</Text>
            <TextInput
              value={deficiencia}
              onChangeText={setDeficiencia}
              className="p-4 border border-gray-200 bg-gray-50 rounded-xl"
              placeholder="Deficiências do aluno"
              multiline={true}
            />
          </View>

          <View>
            <Text className="mb-2 font-medium text-gray-800">Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              className="p-4 border border-gray-200 bg-gray-50 rounded-xl"
              placeholder="Email do aluno"
              keyboardType="email-address"
            />
          </View>

          <View>
            <Text className="mb-2 font-medium text-gray-800">Gênero</Text>
            <View className="border border-gray-200 bg-gray-50 rounded-xl">
              <Picker
                selectedValue={genero}
                onValueChange={(itemValue) => setGenero(itemValue as string)}
                style={{ height: 50 }}
              >
                <Picker.Item label="Masculino" value="masculino" />
                <Picker.Item label="Feminino" value="feminino" />
                <Picker.Item label="Outro" value="outro" />
              </Picker>
            </View>
          </View>

          <TouchableOpacity
            onPress={handleUpdate}
            className="mt-6 bg-[#2f855a] py-4 px-6 rounded-xl"
          >
            <Text className="font-medium text-center text-white">
              Salvar Alterações
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
