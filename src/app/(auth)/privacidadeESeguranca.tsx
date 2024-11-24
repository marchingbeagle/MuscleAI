import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

interface SectionProps {
  title: string;
  content: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const PrivacySection = ({ title, content, icon }: SectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View className="mb-4">
      <TouchableOpacity
        onPress={() => setIsExpanded(!isExpanded)}
        className="flex-row items-center p-4 bg-gray-50 rounded-xl"
      >
        <View className="items-center justify-center w-10 h-10 mr-4 bg-white rounded-full">
          <Ionicons name={icon} size={24} color="#2f855a" />
        </View>
        <Text className="flex-1 font-medium text-gray-800">{title}</Text>
        <Ionicons
          name={isExpanded ? "chevron-up" : "chevron-down"}
          size={20}
          color="#2f855a"
        />
      </TouchableOpacity>
      {isExpanded && (
        <View className="p-4 mt-2 bg-white border border-gray-100 rounded-xl">
          <Text className="leading-5 text-gray-600">{content}</Text>
        </View>
      )}
    </View>
  );
};

export default function PrivacidadeESeguranca() {
  const sections: SectionProps[] = [
    {
      title: "Coleta de Dados",
      icon: "document-text-outline",
      content:
        "Coletamos apenas os dados necessários para o funcionamento do aplicativo, como informações de perfil e histórico de treinos. Seus dados são armazenados de forma segura e não são compartilhados com terceiros.",
    },
    {
      title: "Uso de Informações",
      icon: "information-circle-outline",
      content:
        "Suas informações são utilizadas exclusivamente para personalizar sua experiência de treino e melhorar nossos serviços. Não vendemos ou compartilhamos seus dados pessoais.",
    },
    {
      title: "Segurança da Conta",
      icon: "shield-checkmark-outline",
      content:
        "Utilizamos criptografia de ponta a ponta e as melhores práticas de segurança para proteger sua conta e informações pessoais. Recomendamos o uso de senhas fortes e autenticação em duas etapas.",
    },
    {
      title: "Seus Direitos",
      icon: "lock-closed-outline",
      content:
        "Você tem direito a acessar, corrigir ou deletar seus dados pessoais a qualquer momento. Entre em contato conosco para exercer esses direitos.",
    },
    {
      title: "Cookies e Rastreamento",
      icon: "analytics-outline",
      content:
        "Utilizamos cookies apenas para melhorar sua experiência no aplicativo. Você pode gerenciar suas preferências de cookies nas configurações.",
    },
  ];

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-6">
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-800">
            Privacidade e Segurança
          </Text>
          <Text className="mt-2 text-gray-600">
            Saiba como seus dados são protegidos e utilizados em nosso
            aplicativo.
          </Text>
        </View>

        {sections.map((section, index) => (
          <PrivacySection
            key={index}
            title={section.title}
            content={section.content}
            icon={section.icon}
          />
        ))}

        <TouchableOpacity className="flex-row items-center p-4 mt-4 bg-green-50 rounded-xl">
          <Ionicons name="mail-outline" size={24} color="#2f855a" />
          <View className="flex-1 ml-4">
            <Text className="font-medium text-green-800">
              Precisa de ajuda?
            </Text>
            <Text className="text-sm text-green-600">
              Entre em contato com nossa equipe de suporte
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#2f855a" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
