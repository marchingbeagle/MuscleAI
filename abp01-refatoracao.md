# 🧹 Projeto Intermediário — Clean Code

Neste desafio, vocês deverão escolher um projeto já desenvolvido em alguma disciplina anterior da graduação e aplicar refatorações baseadas nos princípios estudados até agora no curso de Clean Code.

## 🎯 Objetivos

- Identificar e eliminar **code smells**;
- Aplicar princípios do livro **Clean Code** e outros conceitos de boas práticas de programação discutidas em aula;
- Criar uma suíte de testes unitários para cobertura parcial do projeto;
- Produzir documentação da refatoração e apresentar os resultados.

## ✅ Requisitos do Projeto

- [ ] Formar grupos de 2 a 3 integrantes;
- [ ] Escolher um projeto de médio porte já desenvolvido anteriormente no curso, preferencialmente em uma disciplina de Projeto Integrador (não serão aceitos scripts pequenos);
    - Será considerado médio porte um projeto com pelo menos **300 linhas de código**;
    - O projeto deve possuir **funcionalidades reais** (não serão aceitos projetos que sejam apenas exercícios ou exemplos);
    - O projeto deve ser implementado em uma linguagem de programação que suporte testes unitários e ferramentas de linter;
- [ ] Realizar refatorações substanciais que justifiquem **aproximadamente 10+ horas de trabalho**;
- [ ] Aplicar melhorias em organização, nomes, estrutura, modularização e dependências;
- [ ] Implementar pelo menos uma **suíte de testes** para cobertura parcial (cerca de 50% de cobertura);
- [ ] Implementar a estilização do código do projeto usando uma ferramenta de linter;
- [ ] Redesenhar partes do projeto conforme necessário;
- [ ] Eliminar **code smells** detectados;
- [ ] Sugerir **interfaces fluentes** onde fizer sentido implementar (mesmo que não implementem);
- [ ] Organizar dependências e acoplamento de forma adequada;
- [ ] Criar dois branches no repositório:
  - `original` — versão antiga do projeto;
  - `main` — versão refatorada.
- [ ] Incluir um arquivo `README.md` com:
  - Descrição do software e das principais funcionalidades;
  - Análise dos principais problemas detectados;
  - Estratégias de refatoração utilizadas;
  - Descrição dos testes implementados e da cobertura atingida;
  - Descrição de uma implementação de interface fluente (mesmo quando os autores decidiram por não implementar);
  - Descrição da instalação e execução;
- [ ] ChangeLog com descrição das mudanças em um arquivo separado ``CHANGELOG.md`` (seguir recomendações de [Keep a Changelog](https://keepachangelog.com/en/1.0.0/));

## 📅 Cronograma

- **07/10** — Lançamento do projeto, organização dos grupos e ``Entrega 01``
- **14/10** — Aula normal e acompanhamento dos projetos;
- **21/10** — Aula normal e ``Entrega 02``
- **28/10** — ``Entrega 03``
- **04/11** — ``Entrega 04``;
- **11/11** — Entrega final do projeto e Apresentação das equipes;

Cada entrega fora do prazo pode gerar uma penalidade de 1 ponto na nota final do projeto. Cada entrega deverá ser realizada diretamente no AVA. A entrega final do projeto deverá ser realizada por meio de um repositório público no GitHub, cujo o endereço deverá ser enviado também no AVA.

## 📚 Entregas (todos postam)

- **Entrega 01**: Documento contendo nome dos integrantes, descrição do software a ser analisado e suas principais funcionalidades, endereço do repositório do código original;
- **Entrega 02**: Documento contendo a descrição dos principais problemas detectados e da estratégia de refatoração (quais ferramentas vão utilizar);
- **Entrega 03**: Endereço do repositório final contendo o ``README.md`` e descrição das mudanças (``ChangeLog``);
- **Entrega 04**: Descrição dos testes implementados, da sugestão de interface fluente e da instalação e execução do projeto.

## Apresentação

O objetivo das apresentações é compartilhar o software desenvolvido e os desafios encontrados durante a refatoração.

- Cada grupo terá 10 minutos para apresentar o projeto.
- A apresentação deve conter:
  - Descrição do software, principais funcionalidades, finalidade inicial;
  - Comparação entre a versão original e a refatorada;
  - Análise dos principais problemas detectados;
  - Melhorias detectadas no código;
  - Demonstração rápida do projeto funcionando.

Não é necessário detalhar/aprofundar os seguintes tópicos durante a apresentação:

* Code smells identificados;
* Ferramentas e métodos que foram utilizados na refatoração;
* Testes implementados e cobertura atingida;
* Implementação de interface fluente;
* Arquitetura do projeto;
* Gerenciamento de dependências e acoplamento.

## 📊 Rubrica de Avaliação (Total: 10 pontos)

> Cada critério vale 1,0 ponto se estiver ``Excelente``, 0,5 ponto se estiver ``Satisfatório`` e 0,0 ponto se ``Não Atende``. Os critérios possuem multiplicadores indicados ao lado do nome. O resultado de cada critério será dado pela pontuação vezes o seu multiplicador. A média final será a soma de todos os multiplicadores ponderados pelo peso total.

| Critério (Peso) | Excelente (1,0 ponto) | Satisfatório (0,5 ponto) | Não Atende (0,0 ponto) |
|---|---|---|---|
| **``README.md`` e ``ChangeLog`` (2x)** | Documentação clara, completa e ``ChangeLog`` bem organizado | Documentação ou ``ChangeLog`` incompletos | Não entregou documentação |
| **Identificação de Code Smells (2x)** | Documentou diversos code smells relevantes | Documentou apenas alguns code smells relevantes | Nenhum code smell relevante foi identificado |
| **Aplicação de Clean Code (2x)** | Refatoração profunda e consistente segundo os princípios estudados | Refatoração parcial ou apenas estética | Não aplicou princípios de Clean Code |
| **Funcionalidades (1x)** | O projeto apresenta funcionalidades com casos de uso reais | Apresenta funcionalidades limitadas, mas com caso de uso real | Possui poucas funcionalidades ou não apresenta funcionalidades com casos de uso reais |
| **Instalação e Execução (1x)** | Instalação e execução do projeto funcionam e foram documentadas | Projeto funciona, mas precisa de configuração adicional não documentada | Projeto não pode ser executado por falta de documentação |
| **Organização e Modularização (1x)** | Organização e modularização consistentes e bem feitas | Organização e modularização não consistente | Não organizou e/ou modularizou o projeto |
| **Integração com Linter (1x)** | Integrou o uso de linter de forma consistente e em diferentes etapas do projeto (ex.: CICD e Git Hook) | Utilizou linter em até uma etapa do projeto (ex.: instalado no projeto) | Não há integração de linter em nenhuma etapa |
| **Interfaces Fluentes (1x)** | Sugeriu ou aplicou interfaces fluentes no projeto | Aplicou ou sugeriu interfaces fluentes, mas não apresenta boa linguagem de domínio | Não aplicou ou sugeriu interfaces fluentes |
| **Testes Unitários e Cobertura (1x)** | Implementou suíte funcional com cobertura significativa | Criou testes básicos para cobertura mínima | Não implementou testes |

## Exemplos

* [Clean Code Card Game – Adriano Reus Savi e Guilherme da Silva Dalmolin](https://github.com/GuiDalmolin/clean-code-card-game)

* [MyFood Refactor – Ana Carolina Machado e Christian Hederson Giuliani Cypriano](https://github.com/Xiristian/MyFood-Refactor)

* [MedCare – Angelo José da Rosa, Lucas de Oliveira Alano e Tiago Salles Melo](https://github.com/angelum23/MedCare)

* [Trabalho Clean Code Refatorado – Arthur de Luca Honorato, Diego Hahn Fração e João Eduardo Milak Farias](https://github.com/Arthurdelucahonorato/TrabalhoCleanCodeRefatorado)

* [Fluxo Fácil – Arthur de Mello Vieira, Danilo Formanski e João Vitor Brogni Vamerlati](https://github.com/Jvbrogni/fluxo-facil)

* [CardFort – Bruna Pacheco Peruch, Guilherme Brito Pizzollo e Rafael da Silva Castro](https://github.com/guilhermebp030504/cardfort)

* [Estuda Aí API – Bruna Savi e Guilherme Machado Santana](https://github.com/guirms/estuda-ai-api)

* [D&D Player’s Handbook Serv – Bruno Frelo Venturini e Filipe Milaneze de Aguiar](https://github.com/Bruno-Venturini/dnd-players-handbook-serv)

* [BusOn Clean Code – Bruno Jose Dimon Boger e Douglas Kuerten](https://github.com/Douglaskuerten/BusOn-CleanCode)

* [Açaíteria Clean Code – Charles Clezar Pereira e Pedro Henrique Mittmann Hahn](https://github.com/CharlesClezar/acaiteria-clean-code)

* [D&D Player’s Handbook – Eduardo Fraga de Freitas, Lorenzo Trevizol Dal Bó e Sofia Martins Silva](https://github.com/dufrtss/dnd-players-handbook)

* [Jyula Email Frontend & ABP Backend Clean Code – Elói de Matos da Silveira e Joel Francisco da Silva Filho]([https://github.com/oasis-42/abp-backend-clean-code.git](https://github.com/oasis-42/abp-backend-clean-code.git))

* [Cafeteria Design Patterns – Gabriel Canarin Salazar e Naum Marcirio](https://github.com/GabrielCanarin/Cafeteria_DesignPatterns)

* [Bicho.Bet Scheduler – Gabriel Ferreira Guinzani, Guilherme Savio e Higor Goulart Massiroli](https://github.com/higorgoulart/bicho.bet/tree/main/go-scheduler)

* [Gestão de Reservas de Hotel – Gabriel Souza Della Giustina e Miguel Adamante Cimolin](https://github.com/miguelcimolin/Gestao-de-Reservas-de-Hotel)

* [Satc Clean Code Trab02 – Guilherme Machado Darabas, Paulo Roberto Simão, Rubens Scotti Junior e Stephan Anthony Marques dos Santos](https://github.com/gmDarabas/satc-clean-code-trab02)

* [Trabalho Design Patterns – Guilherme Marques Silveira e Luiz Otávio Milanezi Vieira](https://github.com/GuilhermeMSilveira/TrabalhoDesingPatters)

* [Sistema de Gestão de Estacionamento – Gustavo Taufembach Bett e Thiago Dimon Miranda](https://github.com/thiagoDimon/sistema-gestao-estacionamento/tree/main/backend)

* [API Maribel – Henrique Angar e Nicolas Loffi Kaminski](https://github.com/oasis-42/api-maribel.git)

* [FitTrack App Soluções Mobile – Jean Carlos Nesi e Kauã Librelato da Costa](https://github.com/KauaLibrelato/FitTrack-App-Solucoes-Mobile)

* [Design Patterns for IoT Embedded Systems – Jhayne Ketleen Henemam Martins e Renato Ribas Campos](https://github.com/RenatoRibas/Design-Patterns-for-IoT-Embedded-Systems.git)

* [Atendimento Chat – João Gabriel Rosso Dagostin, João Pedro Taufembach Acordi e Rafael Frassetto Pereira](https://github.com/rafafrassetto/AtendimentoChat)

* [Cc Projeto Intermediário – Julia Colombo de Luca, Luz Brenda Guimarães e Oliveira e Yuri Lopes Machado](https://github.com/YuriLopesM/cc-projeto-intermediario)

* [Apera ABP CleanCode – Kauan Laureano Candido e Lucas Ribeiro Guidi](https://github.com/lucasrguidi/Apera-ABP-CleanCode)

* [Hotel Sys Clean Code – Keniel Alves Nunes e Vinícius Pedroso Milanez](https://github.com/kenielnunes/hotel-sys-clean-code)

* [Projeto Final Clean Code – Lucas Dalpont Borges Borba e Luigi Milanez Colonetti](https://github.com/luigimilanez/Projeto-Final-CleanCode)

* [API Cepol Clean Code – Lucas de Castro Zanoni e Oziel Silveira Junior](https://github.com/Castrozan/api-cepol-clean-code)

* [Receitas Dona Benta Refatorado – Juliano Cardoso Felipe](https://github.com/julianocfelipe/ReceitasDonaBentaRefatorado)

* [Projeto V2 Clean Code – Mateus Leal Hemkemeier](https://github.com/Mateuslh/projeto-v2-clean-code.git)

* [CleanCode – Henrique Forgiarini da Silva](https://github.com/HenriqueSilva29/CleanCode/)

* [Banp – Vinícius Albino dos Santos e Vitor Minatto Barp](https://github.com/Shinguek0/banp)

* [Barber API – Pedro Henrique Guedes de Sousa](https://github.com/Pedroguedez/barber-api)