import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import {
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import logo from "src/assets/logo_sem_nome.png";

export default function Signin() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
        setError("Erro ao tentar entrar. Verifique suas credenciais.");
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      setError("Erro ao tentar entrar. Verifique suas credenciais.");
    } finally {
      setLoading(false);
    }
  }, [isLoaded, emailAddress, password]);

  return (
    <View className="flex-1 bg-white">
      <View className="justify-between flex-1 p-6">
        {/* Header Section */}
        <View className="items-center mt-12 mb-8">
          <Image source={logo} className="w-32 h-32 mb-4" />
          <Text className="text-3xl font-bold text-[#2f855a] mb-2">
            Muscle AI
          </Text>
          <Text className="text-center text-gray-600">
            Entre para acessar sua conta
          </Text>
        </View>

        {/* Form Section */}
        <View className="space-y-4">
          <View>
            <Text className="mb-2 font-medium text-gray-800">Email</Text>
            <TextInput
              value={emailAddress}
              onChangeText={setEmailAddress}
              className="p-4 border border-gray-200 bg-gray-50 rounded-xl"
              placeholder="seu@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View>
            <Text className="mb-2 font-medium text-gray-800">Senha</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              className="p-4 border border-gray-200 bg-gray-50 rounded-xl"
              placeholder="Sua senha"
              secureTextEntry
            />
          </View>

          {error && <Text className="text-center text-red-500">{error}</Text>}

          <TouchableOpacity
            onPress={onSignInPress}
            disabled={loading}
            className="mt-6 bg-[#2f855a] py-4 rounded-xl"
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-lg font-medium text-center text-white">
                Entrar
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Footer Section */}
        <View className="mt-8">
          <TouchableOpacity
            onPress={() => router.push("/signup")}
            className="p-4"
          >
            <Text className="text-center text-[#2f855a]">
              Não tem uma conta? Cadastre-se
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
