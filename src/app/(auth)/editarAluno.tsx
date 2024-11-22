import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import InputGreen from "src/components/mycomponents/InputGreen.";
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
    <ScrollView>
      <View className="flex items-center p-6 mb-6">
        <View className="w-full mb-4">
          <Text className="text-base">Nome</Text>
          <InputGreen value={name} setValue={setName} placeholder="Nome" />
        </View>

        <View className="w-full mb-4">
          <Text className="text-base">Peso</Text>
          <TextInput
            value={peso}
            onChangeText={setPeso}
            className="p-4 border-2 border-input py-2.5 px-4 rounded-lg border-gray-300"
            placeholder="67kg"
            keyboardType="numeric"
          />
        </View>

        <View className="w-full mb-4">
          <Text className="text-base">Altura</Text>
          <TextInput
            value={altura}
            onChangeText={setAltura}
            className="p-4 border-2 border-input py-2.5 px-4 rounded-lg border-gray-300"
            placeholder="175cm"
            keyboardType="numeric"
          />
        </View>

        <View className="w-full mb-4">
          <Text className="text-base">Data de Nascimento</Text>
          <TextInput
            value={formatDate(dataNascimento)}
            onFocus={() => setShowDatePicker(true)}
            className="p-4 border-2 border-input py-2.5 px-4 rounded-lg border-gray-300"
          />
          {showDatePicker && (
            <DateTimePicker
              value={dataNascimento}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>

        <View className="w-full mb-4">
          <Text className="text-base">Deficiências</Text>
          <InputGreen
            value={deficiencia}
            setValue={setDeficiencia}
            placeholder="Deficiências do aluno"
          />
        </View>

        <View className="w-full mb-4">
          <Text className="text-base">Email</Text>
          <InputGreen value={email} setValue={setEmail} placeholder="Email" />
        </View>

        <View className="w-full mb-4">
          <Text className="text-base">Gênero</Text>
          <View className="border-2 border-gray-300 rounded-lg">
            <Picker
              selectedValue={genero}
              onValueChange={setGenero}
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
          className="bg-[#198155] py-4 rounded-full w-full"
        >
          <Text className="font-bold text-center text-white">
            Atualizar Aluno
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
