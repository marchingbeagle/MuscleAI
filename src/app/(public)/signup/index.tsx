import * as React from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import logo from "../../../assets/logo.png";

export default function SignUp() {
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSignUp = async () => {
    if (!isLoaded) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      await signUp.create({
        firstName: name,
        lastName: surname,
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err: any) {
      setError("Erro ao criar conta. Tente novamente.");
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async () => {
    if (!isLoaded) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace("/");
      } else {
        setError("Código de verificação inválido. Tente novamente.");
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      setError("Erro ao verificar código. Tente novamente.");
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 p-6 pt-0">
        {/* Header */}
        <View className="items-center mt-4 mb-4">
          <Image source={logo} className="w-32 h-32 " />
          <Text className="text-3xl font-bold text-[#2f855a] mb-2">
            Criar Conta
          </Text>
          <Text className="text-center text-gray-600">
            Preencha seus dados para começar
          </Text>
        </View>

        {!pendingVerification ? (
          /* Registration Form */
          <View className="space-y-4">
            <View>
              <Text className="mb-2 font-medium text-gray-800">Nome</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                className="p-4 border border-gray-200 bg-gray-50 rounded-xl"
                placeholder="Seu nome"
              />
            </View>

            <View>
              <Text className="mb-2 font-medium text-gray-800">Sobrenome</Text>
              <TextInput
                value={surname}
                onChangeText={setSurname}
                className="p-4 border border-gray-200 bg-gray-50 rounded-xl"
                placeholder="Seu sobrenome"
              />
            </View>

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
              onPress={handleSignUp}
              disabled={loading}
              className="mt-6 bg-[#2f855a] py-4 rounded-xl"
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-lg font-medium text-center text-white">
                  Criar Conta
                </Text>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          /* Verification Form */
          <View className="space-y-4">
            <Text className="text-center text-gray-600">
              Digite o código enviado para seu email
            </Text>
            <TextInput
              value={code}
              onChangeText={setCode}
              className="p-4 border border-gray-200 bg-gray-50 rounded-xl"
              placeholder="000000"
              keyboardType="number-pad"
            />

            <TouchableOpacity
              onPress={handleVerification}
              disabled={loading}
              className="mt-6 bg-[#2f855a] py-4 rounded-xl"
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-lg font-medium text-center text-white">
                  Verificar
                </Text>
              )}
            </TouchableOpacity>
          </View>
        )}

        {/* Footer */}
        <TouchableOpacity
          onPress={() => router.push("/signin")}
          className="p-4 mt-8"
        >
          <Text className="text-center text-[#2f855a]">
            Já tem uma conta? Entre aqui
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
