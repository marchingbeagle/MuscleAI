import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import InputGreen from "src/components/mycomponents/InputGreen.";
import { useAuth } from "@clerk/clerk-expo";
import { prismaClient } from "src/services/db";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

export default function AlunosPage() {
  const { userId } = useAuth(); // Obtém o ID do usuário autenticado
  const [name, setName] = React.useState<string>(""); // Estado para o nome do aluno
  const [peso, setPeso] = React.useState<string>(""); // Estado para o peso do aluno
  const [altura, setAltura] = React.useState<string>(""); // Estado para a altura do aluno
  const [deficiencia, setDeficiencia] = React.useState<string>(""); // Estado para deficiências do aluno
  const [email, setEmail] = React.useState<string>(""); // Estado para deficiências do aluno
  const [genero, setGenero] = React.useState<string>(""); // Estado para o valor selecionado no dropdown

  const [dataNascimento, setDataNascimento] = React.useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = React.useState(false);

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

  const handleSubmit = async (
    name: string,
    peso: string,
    altura: string,
    deficiencia: string,
    email: string,
    dataNascimento: Date,
    genero: string
  ) => {
    try {
      const birthDate = dataNascimento;
      if (isNaN(birthDate.getTime())) {
        throw new Error("Invalid date format");
      }

      const newAluno = await prismaClient.aluno.create({
        data: {
          nm_aluno: name, // Nome do aluno
          peso: parseFloat(peso), // Peso convertido para número
          altura: parseFloat(altura), // Altura convertida para número
          deficiencias_aluno: deficiencia, // Deficiências do aluno
          id_personal: userId as string, // ID do personal trainer
          email_aluno: email, // Email do aluno
          data_nascimento: birthDate.toISOString(), // Format the date as ISO 8601 string
          genero_aluno: genero, // Gênero do aluno
        },
      });
    } catch (error) {
      console.error("Error saving to database:", error);
    }
  };

  return (
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
      <TouchableOpacity
        onPress={() => {
          handleSubmit(
            name,
            peso,
            altura,
            deficiencia,
            email,
            dataNascimento,
            genero
          );
        }}
        className="bg-[#198155] py-4 rounded-full w-full"
      >
        <Text className="font-bold text-center text-white">Salvar Aluno</Text>
      </TouchableOpacity>
    </View>
  );
}
