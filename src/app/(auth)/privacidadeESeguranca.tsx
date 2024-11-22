import { View, Text, ScrollView } from "react-native";
import React from "react";

export default function privacidadeESeguranca() {
  return (
    <ScrollView className="flex-1 p-4 bg-white">
      <View className="mb-6">
        <Text className="mb-2 text-2xl font-bold">Privacidade e Segurança</Text>
        <Text className="mb-4 text-gray-600">
          Saiba como seus dados são protegidos e utilizados em nosso aplicativo.
        </Text>
      </View>

      <Section
        title="Coleta de Dados"
        content="Coletamos apenas os dados necessários para o funcionamento do aplicativo, incluindo informações de perfil e dados de treino. Seus dados são armazenados de forma segura e criptografada."
      />

      <Section
        title="Uso de Informações"
        content="Suas informações são utilizadas exclusivamente para personalizar sua experiência de treino e melhorar nossos serviços. Não compartilhamos seus dados com terceiros sem seu consentimento."
      />

      <Section
        title="Proteção de Dados"
        content="Utilizamos tecnologias avançadas de criptografia e segurança para proteger suas informações pessoais. Nossos servidores são monitorados constantemente contra ameaças."
      />

      <Section
        title="Seus Direitos"
        content="Você tem direito a acessar, corrigir ou excluir seus dados a qualquer momento. Para solicitar alterações, entre em contato com nossa equipe de suporte."
      />

      <Section
        title="Cookies e Rastreamento"
        content="Utilizamos cookies apenas para melhorar sua experiência no aplicativo. Você pode gerenciar as configurações de cookies nas configurações do seu dispositivo."
      />

      <View className="mb-6">
        <Text className="text-xs text-center text-gray-500">
          Última atualização: {new Date().toLocaleDateString()}
        </Text>
      </View>
    </ScrollView>
  );
}

function Section({ title, content }: { title: string; content: string }) {
  return (
    <View className="mb-6">
      <Text className="mb-2 text-lg font-semibold">{title}</Text>
      <Text className="text-gray-600">{content}</Text>
    </View>
  );
}
