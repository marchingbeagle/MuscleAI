# Muscle AI - Seu parceiro de treinos

## O que é o Muscle AI?

O Muscle AI é um aplicativo de treino de musculação que ajuda os Personal Trainers a gerenciarem e gerarem treinos para seus alunos. Ele utiliza o modelo de linguagem GPT para gerar respostas personalizadas e adaptadas para as necessidades de cada aluno. O Muscle AI é uma ferramenta valiosa para ajudar os Personal Trainers a aumentar a eficiência no seu processo de ensinamento de treinos.

<div style="display: flex; flex-direction: row; align-items: center; justify-content: center">
    <img height="500" src='./src/assets/tela_inicial.png' />
    <img height="500" src='./src/assets/home.png' />
    <img height="500" src='./src/assets/tela_alunos.png' />
    <img height="500" src='./src/assets/tela_treino.png' />
</div>

## Tecnologias utilizadas

1. React Native (Expo)
2. Typescript
3. Expo Router

### Design

1. Tailwind CSS (NativeWind)
2. shadcn (NativeCN)

### Database e Auth

1. Prisma ORM
2. SQLite
3. Clerk

### Apresentação de slides
[Apresentação](https://pitchdeck.hypermatic.com/slides/m3xg4zhr72197/?token=R2UyUXgxTnNrYlUjeVg%3D)

## Como rodar o projeto localmente

1. Instalar o [Node.js](https://nodejs.org/en/download/) e o [Android Studio](https://developer.android.com/studio)

```node
npm install
npm i -g prisma
npx prisma generate
npx expo prebuild --clean // Rodar o projeto com a build se torna necessário devido ao uso do Prisma para manipular o banco de dados SQLite.
```

## Para inicializar o projeto

```nodejs
npx expo run:android

ou

npx expo run:ios
```

## Como configurar as varíaveis JAVA_HOME E ANDROID_HOME

> [!IMPORTANT]  
> É Necessario ter a variavel de ambiente ANDROID_HOME e JAVA_HOME definida com o caminho do SDK do Java.

<details>
<summary>Configurando o JAVA_HOME</summary>

### Instalar o JDK:

Baixe e instale a última versão do JDK (Java Development Kit) do site oficial da Oracle ou de um fornecedor como OpenJDK.

### Encontrar o caminho do JDK:

Após a instalação, vá até o diretório de instalação do JDK. Geralmente, o caminho é algo como:

```bash
C:\Program Files\Java\jdk-<versão>
```

### Definir a variável de ambiente JAVA_HOME:

1. Clique com o botão direito no ícone Este PC ou Meu Computador no Explorador de Arquivos e escolha Propriedades.
2. Clique em Configurações avançadas do sistema no menu à esquerda.
3. Na janela que aparece, clique em Variáveis de Ambiente.
4. Na seção Variáveis do Sistema, clique em Novo.
5. No campo Nome da variável, digite JAVA_HOME.
6. No campo Valor da variável, cole o caminho para a pasta do JDK (exemplo: C:\Program Files\Java\jdk-<versão>).
7. Clique em OK para salvar.

### Adicionar o caminho ao PATH:

1. Ainda na janela de Variáveis de Ambiente, encontre a variável Path na seção Variáveis do Sistema e selecione Editar.
2. Clique em Novo e adicione:

```bash
%JAVA_HOME%\bin
```

3. Clique em OK para salvar.

</details>

<details>
<summary>Configurando o ANDROID_HOME</summary>

### Instalar o Android SDK:

Se ainda não tiver o SDK instalado, baixe-o e instale a partir do Android Studio ou de ferramentas independentes como o Command Line Tools do site oficial do Android.

### Encontrar o caminho do SDK:

O caminho do Android SDK geralmente está em:

```bash
C:\Users\<seu_usuário>\AppData\Local\Android\Sdk
```

### Definir a variável de ambiente ANDROID_HOME:

1. Volte à janela de Variáveis de Ambiente.
2. Na seção Variáveis do Sistema, clique em Novo.
3. No campo Nome da variável, digite ANDROID_HOME.
4. No campo Valor da variável, coloque o caminho da pasta onde o SDK foi instalado (exemplo: C:\Users\<seu_usuário>\AppData\Local\Android\Sdk).
5. Clique em OK para salvar.

### Adicionar o caminho ao PATH:

1. Ainda na janela de Variáveis de Ambiente, edite a variável Path novamente.
2. Adicione dois novos caminhos:

```bash
%ANDROID_HOME%\tools
%ANDROID_HOME%\platform-tools
```

3. Clique em OK para fechar todas as janelas.

### Verificando a configuração

    Abra o Prompt de Comando e execute os seguintes comandos para verificar se as variáveis foram configuradas corretamente:

#### Para o Java:

```bash
java -version
```

#### Para o Android SDK:

```bash
adb --version
```

Se tudo estiver configurado corretamente, os comandos devem exibir a versão instalada de cada ferramenta.

</details>
