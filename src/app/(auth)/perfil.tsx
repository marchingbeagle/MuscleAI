import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";

export default function Perfil() {
  const { user } = useUser();

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-6">
        {/* Header Section */}
        <View className="items-center mb-6">
          <View className="w-32 h-32 mb-4 overflow-hidden rounded-full">
            <Image
              source={{ uri: user?.imageUrl }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
          <Text className="text-2xl font-bold text-gray-800">
            {user?.fullName}
          </Text>
          <Text className="text-gray-500">
            {user?.primaryEmailAddress?.emailAddress}
          </Text>
        </View>

        {/* Profile Info Section */}
        <View className="p-4 mb-6 bg-gray-50 rounded-xl">
          <Text className="mb-4 text-lg font-bold text-gray-800">
            Informações da Conta
          </Text>

          <View className="space-y-4">
            <View className="flex-row items-center">
              <Ionicons name="person-outline" size={24} color="#2f855a" />
              <View className="ml-4">
                <Text className="text-gray-500">Nome</Text>
                <Text className="font-medium text-gray-800">
                  {user?.firstName} {user?.lastName}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center">
              <Ionicons name="mail-outline" size={24} color="#2f855a" />
              <View className="ml-4">
                <Text className="text-gray-500">Email</Text>
                <Text className="font-medium text-gray-800">
                  {user?.primaryEmailAddress?.emailAddress}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center">
              <Ionicons name="calendar-outline" size={24} color="#2f855a" />
              <View className="ml-4">
                <Text className="text-gray-500">Membro desde</Text>
                <Text className="font-medium text-gray-800">
                  {new Date(user?.createdAt || "").toLocaleDateString("pt-BR")}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity className="flex-row items-center p-4 bg-red-50 rounded-xl">
          <Ionicons name="log-out-outline" size={24} color="#ef4444" />
          <Text className="ml-4 font-medium text-red-500">Sair</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
