import React from "react";
import Stack from "expo-router/stack";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#2f855a",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="cadastro"
        options={{
          title: "Cadastrar Aluno",
          headerTitle: "Muscle AI",
        }}
      />
      <Stack.Screen
        name="treinos"
        options={{
          title: "Gerar Treino",
          headerTitle: "Muscle AI",
        }}
      />
      <Stack.Screen
        name="editarAluno"
        options={{
          title: "Editar Aluno",
          headerTitle: "Muscle AI",
        }}
      />
      <Stack.Screen
        name="editarTreino"
        options={{
          title: "Editar Treino",
          headerTitle: "Muscle AI",
        }}
      />
      <Stack.Screen
        name="detalhesTreino"
        options={{
          title: "Detalhes do Treino",
          headerTitle: "Muscle AI",
        }}
      />
      <Stack.Screen
        name="perfil"
        options={{
          title: "Meu Perfil",
          headerTitle: "Muscle AI",
        }}
      />
      <Stack.Screen
        name="privacidadeESeguranca"
        options={{
          title: "Privacidade",
          headerTitle: "Muscle AI",
        }}
      />
    </Stack>
  );
}
