import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useAluno } from '../../hooks/useAluno';
import { alunoService } from '../../services/alunoService';
import { Button, LoadingState, ErrorState, Input, ValidationSummary } from '../../components/ui';
import { ROUTES } from '../../constants/app.constants';
import Logger from '../../lib/logger';
import { ErrorHandler } from '../../lib/errorHandler';
import { useFormValidation } from '../../hooks/useFormValidation';
import { alunoSchema } from '../../validation/schemas';

export default function EditarAluno() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  // ✅ Hook customizado busca o aluno
  const { aluno, loading, error } = useAluno(id as string);

  // ✅ Validação com Yup
  const { errors, validateForm, clearErrors } = useFormValidation(alunoSchema);

  const [name, setName] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [deficiencia, setDeficiencia] = useState('');
  const [email, setEmail] = useState('');
  const [genero, setGenero] = useState('Masculino');
  const [dataNascimento, setDataNascimento] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Preenche os campos quando o aluno é carregado
  useEffect(() => {
    if (aluno) {
      setName(aluno.nm_aluno);
      setPeso(aluno.peso.toString());
      setAltura(aluno.altura.toString());
      setDeficiencia(aluno.deficiencias_aluno || '');
      setEmail(aluno.email_aluno);
      setGenero(aluno.genero_aluno);
      setDataNascimento(new Date(aluno.data_nascimento));
    }
  }, [aluno]);

  Logger.debug('EditarAluno: Renderizando', { id, loading, hasAluno: !!aluno });

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDataNascimento(selectedDate);
    }
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleUpdate = async () => {
    if (!aluno) {
      return;
    }

    // ✅ Validação antes de enviar
    const formData = {
      nm_aluno: name,
      email_aluno: email,
      peso: parseFloat(peso) || 0,
      altura: parseFloat(altura) || 0,
      genero_aluno: genero,
      data_nascimento: dataNascimento,
      deficiencias_aluno: deficiencia || null,
      id_personal: aluno.id_personal,
    };

    const isValid = await validateForm(formData);
    if (!isValid) {
      Alert.alert('Validação', 'Por favor, corrija os erros no formulário');
      return;
    }

    setIsSaving(true);
    try {
      Logger.info('EditarAluno: Atualizando aluno', { id: aluno.id_aluno });

      // ✅ Usa o service em vez de prismaClient direto
      await alunoService.atualizarAluno(aluno.id_aluno, {
        nm_aluno: name,
        peso: parseFloat(peso),
        altura: parseFloat(altura),
        deficiencias_aluno: deficiencia,
        email_aluno: email,
        data_nascimento: dataNascimento,
        genero_aluno: genero,
      });

      Logger.info('EditarAluno: Aluno atualizado com sucesso');
      clearErrors();
      Alert.alert('Sucesso', 'Aluno atualizado com sucesso!', [
        { text: 'OK', onPress: () => router.push(ROUTES.AUTH.ALUNOS) },
      ]);
    } catch (error) {
      const errorMessage = ErrorHandler.getErrorMessage(error);
      Logger.error('EditarAluno: Erro ao atualizar', error);
      Alert.alert('Erro', `Não foi possível atualizar: ${errorMessage}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!aluno) {
      return;
    }

    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir este aluno? Esta ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            setIsDeleting(true);
            try {
              Logger.info('EditarAluno: Excluindo aluno', {
                id: aluno.id_aluno,
              });

              // ✅ Usa o service em vez de prismaClient direto
              await alunoService.deletarAluno(aluno.id_aluno);

              Logger.info('EditarAluno: Aluno excluído com sucesso');
              Alert.alert('Sucesso', 'Aluno excluído com sucesso');
              router.push(ROUTES.AUTH.ALUNOS);
            } catch (error) {
              const errorMessage = ErrorHandler.getErrorMessage(error);
              Logger.error('EditarAluno: Erro ao excluir', error);
              Alert.alert('Erro', `Não foi possível excluir: ${errorMessage}`);
            } finally {
              setIsDeleting(false);
            }
          },
        },
      ],
    );
  };

  // ✅ Estados padronizados
  if (loading) {
    return <LoadingState message="Carregando dados do aluno..." />;
  }

  if (error || !aluno) {
    return (
      <View className="flex-1 bg-white">
        <ErrorState message="Erro ao carregar aluno" onRetry={() => router.back()} />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-6">
        <View className="flex-row items-center mb-8">
          <View className="flex-1">
            <Text className="text-2xl font-bold text-[#2f855a]">Atualize os dados do aluno</Text>
          </View>
        </View>

        {/* ✅ Sumário de erros de validação */}
        <ValidationSummary errors={errors} />

        <View className="space-y-4">
          <Input
            label="Nome"
            value={name}
            onChange={setName}
            placeholder="Nome do aluno"
            error={errors.nm_aluno}
            required
          />

          <Input
            label="Email"
            value={email}
            onChange={setEmail}
            placeholder="email@exemplo.com"
            type="email"
            error={errors.email_aluno}
            required
          />

          <Input
            label="Peso (kg)"
            value={peso}
            onChange={setPeso}
            placeholder="67"
            type="numeric"
            error={errors.peso}
            required
          />

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
            <Text className="mb-2 font-medium text-gray-800">Data de Nascimento *</Text>
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              className={`p-4 border rounded-xl ${
                errors.data_nascimento ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'
              }`}
            >
              <Text>{formatDate(dataNascimento)}</Text>
            </TouchableOpacity>
            {errors.data_nascimento && (
              <Text className="text-red-500 text-sm mt-1">{errors.data_nascimento}</Text>
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
            <Text className="mb-2 font-medium text-gray-800">Gênero *</Text>
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
              <Text className="text-red-500 text-sm mt-1">{errors.genero_aluno}</Text>
            )}
          </View>

          <Input
            label="Deficiências (opcional)"
            value={deficiencia}
            onChange={setDeficiencia}
            placeholder="Descreva as deficiências, se houver"
            error={errors.deficiencias_aluno}
            multiline
          />

          {/* ✅ Button components padronizados */}
          <Button onPress={handleUpdate} disabled={isSaving} loading={isSaving} className="mt-6">
            Salvar Alterações
          </Button>

          <Button
            onPress={handleDelete}
            disabled={isDeleting}
            loading={isDeleting}
            variant="secondary"
            className="mt-4 bg-red-100"
          >
            Excluir Aluno
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
