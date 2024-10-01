# Muscle AI - Seu parceiro de treinos

## O que é o Muscle AI?

O Muscle AI é um aplicativo de treino de musculação que ajuda os Personal Trainers a gerenciarem e gerarem treinos para seus alunos. Ele utiliza o modelo de linguagem GPT para gerar respostas personalizadas e adaptadas para as necessidades de cada aluno. O Muscle AI é uma ferramenta valiosa para ajudar os Personal Trainers a aumentar a eficiência no seu processo de ensinamento de treinos.

## Como rodar o projeto localmente

1. Instalar o [Node.js](https://nodejs.org/en/download/) e o [Android Studio](https://developer.android.com/studio)
2. cd muscle-ai
3. npm install
4. prisma generate
5. npx expo prebuild --clean
6. npx expo run:android

OBS: é necessario ter a variavel de ambiente ANDROID_HOME definida com o caminho do SDK do Java.

Rodar o projeto com a build se torna necessário devido ao uso do Prisma para manipular o banco de dados SQLite.
