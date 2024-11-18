import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import InputGreen from "src/components/mycomponents/InputGreen.";
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
  const [meta, setMeta] = useState("Emagrecimento");
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
    setMeta("");
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
          metas_aluno: meta,
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
    if (!meta.trim()) {
      return { isValid: false, message: "Meta é obrigatória" };
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
    <ScrollView>
      <View className="flex items-center p-6 mb-6">
        <View className="w-full mb-4">
          <Text className="text-2xl font-bold">Adicionar Aluno</Text>
        </View>
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
          <Text className="text-base">Data de Nascimento</Text>
          <TextInput
            value={formatDate(dataNascimento)}
            onFocus={() => setShowDatePicker(true)}
            className="p-4 border-2 border-input py-2.5 px-4 rounded-lg border-gray-300"
            placeholder="YYYY-MM-DD"
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
          <Text className="text-base">Deficiências do aluno</Text>
          <InputGreen
            value={deficiencia}
            setValue={setDeficiencia}
            placeholder="Descreva as deficiências do Aluno"
          />
        </View>

        <View className="w-full mb-4">
          <Text className="text-base">Email</Text>
          <InputGreen
            value={email}
            setValue={setEmail}
            placeholder="Email do aluno"
          />
        </View>
        <View className="w-full mb-4">
          <Text className="text-base">Gênero</Text>
          <View className="border-2 border-gray-300 rounded-lg">
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
        <View className="w-full mb-4">
          <Text className="text-base">Metas do Aluno</Text>
          <View className="border-2 border-gray-300 rounded-lg">
            <Picker
              selectedValue={meta}
              onValueChange={(itemValue) => setMeta(itemValue as string)}
              style={{ height: 50 }}
            >
              <Picker.Item label="Emagrecimento" value="emagrecimento" />
              <Picker.Item label="Ganho de Massa" value="ganhom" />
              <Picker.Item label="Definição" value="definicao" />
              <Picker.Item label="Manter" value="manter" />
            </Picker>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            handleSubmit();
          }}
          className="bg-[#198155] py-4 rounded-full w-full"
        >
          <Text className="font-bold text-center text-white">Salvar Aluno</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
