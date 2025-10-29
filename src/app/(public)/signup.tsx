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
import logo from "../../assets/logo.png";

export default function SignUp() {
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  // Safe navigation wrapper
  const safeNavigate = React.useCallback(
    (path: string, delay: number = 100) => {
      try {
        setTimeout(() => {
          try {
            router.push(path as any);
          } catch (navErr) {
            console.error("Navigation error:", navErr);
            // Fallback: try router.replace
            try {
              router.replace(path as any);
            } catch (replaceErr) {
              console.error("Replace navigation error:", replaceErr);
            }
          }
        }, delay);
      } catch (err) {
        console.error("Safe navigate error:", err);
      }
    },
    [router]
  );

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
      // Log the full error for debugging
      console.error("Sign up error:", JSON.stringify(err, null, 2));

      // Check if it's a Clerk configuration error
      if (err.errors && err.errors.length > 0) {
        const errorMessages = err.errors
          .map((e: any) => e.longMessage || e.message)
          .join("\n");
        setError(
          `Erro de configuração: ${errorMessages}\n\nPor favor, verifique as configurações do Clerk Dashboard.`
        );
      } else {
        setError("Erro ao criar conta. Tente novamente.");
      }
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
    setSuccessMessage("");

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      console.log("Verification status:", completeSignUp.status);

      if (completeSignUp.status === "complete") {
        try {
          await setActive({ session: completeSignUp.createdSessionId });
          console.log("Session activated, redirecting to home...");
          setSuccessMessage("✓ Verificação concluída! Redirecionando...");

          // Use safe navigation
          safeNavigate("/(auth)/(tabs)/home", 100);
        } catch (activationError) {
          console.error("Error activating session:", activationError);
          // Even if activation fails, the verification was successful
          // Try to redirect anyway
          setSuccessMessage("✓ Verificação concluída! Redirecionando...");
          safeNavigate("/(auth)/(tabs)/home", 500);
        }
      } else {
        setError("Código de verificação inválido. Tente novamente.");
        console.error(
          "Verification incomplete:",
          JSON.stringify(completeSignUp, null, 2)
        );
      }
    } catch (err: any) {
      console.error("Verification error:", JSON.stringify(err, null, 2));

      // Handle "already verified" error - check multiple possible error codes/messages
      const isAlreadyVerified =
        err.errors?.some(
          (e: any) =>
            e.code === "verification_already_verified" ||
            e.code === "form_identifier_exists" ||
            e.message?.toLowerCase().includes("already verified") ||
            e.longMessage?.toLowerCase().includes("already verified")
        ) ||
        (err.status === 400 &&
          err.clerkError &&
          JSON.stringify(err).toLowerCase().includes("already verified"));

      if (isAlreadyVerified) {
        console.log("Already verified, attempting to activate session...");
        try {
          // If already verified, try to get the session and activate it
          if (signUp.createdSessionId) {
            try {
              await setActive({ session: signUp.createdSessionId });
              console.log("Session activated successfully, redirecting...");
              setSuccessMessage("✓ Conta já verificada! Redirecionando...");
              safeNavigate("/(auth)/(tabs)/home", 100);
              return;
            } catch (sessionErr) {
              console.error("Error setting active session:", sessionErr);
              // If session activation fails, redirect to login
              setError(
                "Conta verificada! Por favor, faça login para continuar."
              );
              safeNavigate("/signin", 2000);
              return;
            }
          } else {
            // If no session available, redirect to login
            console.log("No session available, redirecting to login...");
            setError(
              "Esta conta já foi verificada anteriormente. Por favor, faça login."
            );
            safeNavigate("/signin", 2000);
            return;
          }
        } catch (activationErr) {
          console.error("Session activation error:", activationErr);
          setError(
            "Esta conta já foi verificada. Por favor, faça login para continuar."
          );
        }
      } else if (err.errors && err.errors.length > 0) {
        const errorMessage = err.errors[0].longMessage || err.errors[0].message;
        setError(errorMessage);
      } else {
        setError("Erro ao verificar código. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 p-6 pt-0">
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

            {error && (
              <View className="p-3 border border-red-200 rounded-lg bg-red-50">
                <Text className="text-sm text-red-600">{error}</Text>
              </View>
            )}

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

            {successMessage && (
              <View className="p-3 border border-green-200 rounded-lg bg-green-50">
                <Text className="text-sm font-medium text-center text-green-700">
                  {successMessage}
                </Text>
              </View>
            )}

            {error && (
              <View className="p-3 border border-red-200 rounded-lg bg-red-50">
                <Text className="text-sm text-red-600">{error}</Text>
                {(error.toLowerCase().includes("já foi verificada") ||
                  error.toLowerCase().includes("already verified") ||
                  error.toLowerCase().includes("faça login")) && (
                  <TouchableOpacity
                    onPress={() => router.push("/signin")}
                    className="mt-2 p-2 bg-[#2f855a] rounded-lg"
                  >
                    <Text className="text-sm font-medium text-center text-white">
                      Ir para Login
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )}

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
