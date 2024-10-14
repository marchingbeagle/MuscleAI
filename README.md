# Muscle AI - Seu parceiro de treinos

## O que é o Muscle AI?

O Muscle AI é um aplicativo de treino de musculação que ajuda os Personal Trainers a gerenciarem e gerarem treinos para seus alunos. Ele utiliza o modelo de linguagem GPT para gerar respostas personalizadas e adaptadas para as necessidades de cada aluno. O Muscle AI é uma ferramenta valiosa para ajudar os Personal Trainers a aumentar a eficiência no seu processo de ensinamento de treinos.

## Como rodar o projeto localmente

1. Instalar o [Node.js](https://nodejs.org/en/download/) e o [Android Studio](https://developer.android.com/studio)
```bash
cd muscle-ai
```

```node
npm install
npm i -g prisma
prisma generate // (Caso não funcione rode npx prima generate)
npx expo prebuild --clean // Rodar o projeto com a build se torna necessário devido ao uso do Prisma para manipular o banco de dados SQLite.
```

## Para inicializar o projeto

```nodejs
npx expo run:android
```

> [!IMPORTANT]  
> É Necessario ter a variavel de ambiente ANDROID_HOME e JAVA_HOME definida com o caminho do SDK do Java.
