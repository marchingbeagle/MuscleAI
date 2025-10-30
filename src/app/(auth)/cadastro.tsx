import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useAuth } from '@clerk/clerk-expo';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { alunoService } from '../../services/alunoService';
import { Button, Input, ValidationSummary } from '../../components/ui';
import { ROUTES } from '../../constants/app.constants';
import Logger from '../../lib/logger';
import { ErrorHandler } from '../../lib/errorHandler';
import { useFormValidation } from '../../hooks/useFormValidation';
import { alunoSchema } from '../../validation/schemas';

export default function AlunosPage() {
  const { userId } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [deficiencia, setDeficiencia] = useState('');
  const [email, setEmail] = useState('');
  const [genero, setGenero] = useState('masculino');
  const [dataNascimento, setDataNascimento] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // ✅ Hook de validação
  const { errors, validateForm } = useFormValidation(alunoSchema);

  const handleDateChange = (event: any, selectedDate: any | undefined) => {
    const currentDate = selectedDate || dataNascimento;
    setShowDatePicker(false);
    setDataNascimento(currentDate);
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const resetForm = () => {
    setName('');
    setPeso('');
    setAltura('');
    setDeficiencia('');
    setEmail('');
    setGenero('masculino');
    setDataNascimento(new Date());
  };

  const handleSubmit = async () => {
    // Prepara dados para validação
    const formData = {
      nm_aluno: name,
      email_aluno: email,
      peso: parseFloat(peso) || 0,
      altura: parseFloat(altura) || 0,
      genero_aluno: genero,
      data_nascimento: dataNascimento,
      deficiencias_aluno: deficiencia || null,
      id_personal: userId as string,
    };

    // ✅ Valida com Yup antes de enviar
    const isValid = await validateForm(formData);

    if (!isValid) {
      Logger.warn('Cadastro: Validação falhou', { errors });
      return;
    }

    setIsSaving(true);
    try {
      Logger.info('Cadastro: Salvando novo aluno', { name, email });

      await alunoService.criarAluno(formData);

      Logger.info('Cadastro: Aluno salvo com sucesso');
      resetForm();
      alert('Aluno cadastrado com sucesso!');
      router.push(ROUTES.AUTH.ALUNOS);
    } catch (error: any) {
      const errorMessage = ErrorHandler.getErrorMessage(error);
      Logger.error('Cadastro: Erro ao salvar aluno', error);
      alert(`Erro ao salvar aluno: ${errorMessage}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-6">
        <View className="flex-row items-center mb-8">
          <View className="flex-1">
            <Text className="text-2xl font-bold text-[#2f855a]">Adicionar Aluno</Text>
            <Text className="text-gray-600">Preencha os dados do novo aluno</Text>
          </View>
        </View>

        {/* ✅ Resumo de erros de validação */}
        <ValidationSummary errors={errors} />

        <View className="space-y-4">
          {/* ✅ Input com validação */}
          <Input
            label="Nome"
            value={name}
            onChange={setName}
            placeholder="João Silva"
            error={errors.nm_aluno}
            required
          />

          {/* ✅ Input com validação */}
          <Input
            label="Email"
            value={email}
            onChange={setEmail}
            placeholder="joao@email.com"
            type="email"
            error={errors.email_aluno}
            required
          />

          {/* ✅ Input com validação */}
          <Input
            label="Peso (kg)"
            value={peso}
            onChange={setPeso}
            placeholder="70"
            type="numeric"
            error={errors.peso}
            required
          />

          {/* ✅ Input com validação */}
          <Input
            label="Altura (cm)"
            value={altura}
            onChange={setAltura}
            placeholder="175"
            type="numeric"
            error={errors.altura}
            required
          />

          <View>
            <Text className="mb-2 font-medium text-gray-800">
              Data de Nascimento
              <Text className="text-red-500"> *</Text>
            </Text>
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              className={`p-4 border rounded-xl ${
                errors.data_nascimento ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'
              }`}
            >
              <Text className={errors.data_nascimento ? 'text-red-500' : 'text-gray-800'}>
                {formatDate(dataNascimento)}
              </Text>
            </TouchableOpacity>
            {errors.data_nascimento && (
              <Text className="mt-1 text-sm text-red-500">{errors.data_nascimento}</Text>
            )}
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
            <Text className="mb-2 font-medium text-gray-800">Deficiências do aluno</Text>
            <TextInput
              value={deficiencia}
              onChangeText={setDeficiencia}
              className={`p-4 border rounded-xl ${
                errors.deficiencias_aluno
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
              placeholder="Descreva as deficiências e dificuldades do aluno"
              multiline={true}
            />
            {errors.deficiencias_aluno && (
              <Text className="mt-1 text-sm text-red-500">{errors.deficiencias_aluno}</Text>
            )}
          </View>

          <View>
            <Text className="mb-2 font-medium text-gray-800">
              Gênero
              <Text className="text-red-500"> *</Text>
            </Text>
            <View
              className={`border rounded-xl ${
                errors.genero_aluno ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'
              }`}
            >
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
            {errors.genero_aluno && (
              <Text className="mt-1 text-sm text-red-500">{errors.genero_aluno}</Text>
            )}
          </View>

          {/* ✅ Button component padronizado */}
          <Button onPress={handleSubmit} disabled={isSaving} loading={isSaving} className="mt-6">
            Salvar Aluno
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
