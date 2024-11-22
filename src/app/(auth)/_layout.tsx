import React from "react";
import Stack from "expo-router/stack";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="cadastro" options={{ title: "Cadastro" }} />
      <Stack.Screen name="treinos" options={{ title: "Treinos" }} />
      <Stack.Screen name="editarAluno" options={{ title: "Editar Aluno" }} />
      <Stack.Screen name="editarTreino" options={{ title: "Editar Treino" }} />
      <Stack.Screen
        name="detalhesTreino"
        options={{ title: "Detalhes do Treino" }}
      />
      <Stack.Screen name="perfil" options={{ title: "Perfil" }} />
      <Stack.Screen
        name="privacidadeESeguranca"
        options={{ title: "Privacidade e Segurança" }}
      />
    </Stack>
  );
}
