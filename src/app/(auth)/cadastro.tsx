import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useAuth } from "@clerk/clerk-expo";
import { prismaClient } from "src/services/db";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";

interface ValidationResult {
  isValid: boolean;
  message: string;
}

export default function AlunosPage() {
  const { userId } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [deficiencia, setDeficiencia] = useState("");
  const [email, setEmail] = useState("");
  const [genero, setGenero] = useState("Masculino");
  const [dataNascimento, setDataNascimento] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event: any, selectedDate: any | undefined) => {
    const currentDate = selectedDate || dataNascimento;
    setShowDatePicker(false);
    setDataNascimento(currentDate);
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const resetForm = () => {
    setName("");
    setPeso("");
    setAltura("");
    setDeficiencia("");
    setEmail("");
    setGenero("");
    setDataNascimento(new Date());
  };

  const saveAluno = async () => {
    try {
      await prismaClient.aluno.create({
        data: {
          nm_aluno: name,
          peso: parseFloat(peso),
          altura: parseFloat(altura),
          deficiencias_aluno: deficiencia,
          id_personal: userId as string,
          email_aluno: email,
          data_nascimento: dataNascimento.toISOString(),
          genero_aluno: genero,
        },
      });
    } catch (error) {
      console.error("Erro ao salvar no banco de dados:", error);
    }
  };

  const validateFields = (): ValidationResult => {
    if (!name.trim()) {
      return { isValid: false, message: "Nome é obrigatório" };
    }
    if (!peso.trim()) {
      return { isValid: false, message: "Peso é obrigatório" };
    }
    if (!altura.trim()) {
      return { isValid: false, message: "Altura é obrigatória" };
    }
    if (!deficiencia.trim()) {
      return { isValid: false, message: "Deficiência é obrigatória" };
    }
    if (!email.trim()) {
      return { isValid: false, message: "Email é obrigatório" };
    }
    if (!genero.trim()) {
      return { isValid: false, message: "Gênero é obrigatório" };
    }

    if (isNaN(parseFloat(peso)) || isNaN(parseFloat(altura))) {
      return {
        isValid: false,
        message: "Peso e altura devem ser números válidos",
      };
    }

    if (isNaN(dataNascimento.getTime())) {
      return { isValid: false, message: "Data de nascimento inválida" };
    }

    return { isValid: true, message: "" };
  };

  const handleSubmit = async () => {
    const validation = validateFields();
    try {
      if (!validation.isValid) {
        alert(validation.message);
        return;
      }
      saveAluno();
      resetForm();
      alert("Aluno cadastrado com sucesso!");

      router.push("/alunos");
    } catch (error) {
      console.error("Erro ao salvar aluno:", error);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-6">
        {/* Header Section */}
        <View className="flex-row items-center mb-8">
          <View className="flex-1">
            <Text className="text-2xl font-bold text-[#2f855a]">
              Adicionar Aluno
            </Text>
            <Text className="text-gray-600">
              Preencha os dados do novo aluno
            </Text>
          </View>
        </View>

        {/* Form Fields */}
        <View className="space-y-4">
          <View>
            <Text className="mb-2 font-medium text-gray-800">Nome</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              className="p-4 border border-gray-200 bg-gray-50 rounded-xl"
              placeholder="John"
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
            <Text className="mb-2 font-medium text-gray-800">
              Deficiências do aluno
            </Text>
            <TextInput
              value={deficiencia}
              onChangeText={setDeficiencia}
              className="p-4 border border-gray-200 bg-gray-50 rounded-xl"
              placeholder="Descreva as deficiências e dificuldades do aluno"
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
            onPress={handleSubmit}
            className="mt-6 bg-[#2f855a] py-4 px-6 rounded-xl"
          >
            <Text className="font-medium text-center text-white">
              Salvar Aluno
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
