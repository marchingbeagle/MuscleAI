
# Landing to Bronze

Este trecho de código define os schemas (estruturas) das tabelas para o processo ETL landing-to-bronze.
### Principais aspectos:

Define 7 tabelas principais: estado, cidade, categoria, localizacao, imovel, locacao
Cada tabela tem seus campos fortemente tipados

Este schema serve como base para validação e estruturação dos dados quando são movidos da camada landing para bronze, garantindo integridade e consistência dos dados.

Principais recursos:
- Aplicação de tipo de dados
- Tratamento de valor nulo
- Padronização de texto
- Validação de campo obrigatória
- Rastreamento de linhagem
- Verificações de consistência de esquema
- Isso garante a qualidade e a consistência dos dados ao passar da camada de destino para a camada bronze.

# Bronze to Silver

Este código implementa o processo ETL da camada bronze para silver, realizando transformações e enriquecimentos nos dados.

### Principais Funções:

1. **Funções de Limpeza**:

- [clean_cpf()](vscode-file://vscode-app/c:/Users/eriks/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html): Remove caracteres não numéricos do CPF
- [clean_phone()](vscode-file://vscode-app/c:/Users/eriks/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html): Padroniza formato do telefone
- [validate_date()](vscode-file://vscode-app/c:/Users/eriks/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html): Valida e converte campos de data

2. **Processamento por Tabela**:

- [process_pessoas()](vscode-file://vscode-app/c:/Users/eriks/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html):    
    - Remove duplicatas por CPF
    - Limpa CPF e telefone
    - Padroniza nome em maiúsculo
    - Valida data de nascimento
- [process_locacao()](vscode-file://vscode-app/c:/Users/eriks/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html):
    - Enriquece dados com joins em imovel e pessoas
    - Filtra contratos com valor válido
    - Valida data de vigência
- [process_imovel()](vscode-file://vscode-app/c:/Users/eriks/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html):
    - Join com localizacao
    - Valida preços de compra e aluguel

### Principais recursos:

- Limpeza e padronização de dados
- Remoção de duplicatas
- Validação de regras de negócio
- Enriquecimento via joins
- Rastreamento com metadados
- Tratamento de erros
- Validações específicas por domínio

Isso garante que os dados na camada silver estejam limpos, enriquecidos e prontos para análise, seguindo regras de negócio específicas para cada domínio.

# Silver to Gold

Este trecho de código implementa a transformação final dos dados para análise na camada gold, criando um modelo dimensional e views analíticas.

### Principais aspectos:

Define 3 tipos principais de estruturas:
- Dimensões (localização, pessoas)
- Fatos (locação)
- Views analíticas (média de aluguel por região, top corretores)

Este processo implementa um modelo dimensional (Star Schema) e views otimizadas para análise de negócio.

### Principais recursos:

- Criação de modelo dimensional:
    - [dim_localizacao](vscode-file://vscode-app/c:/Users/eriks/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html): Combina informações geográficas
    - [dim_pessoas](vscode-file://vscode-app/c:/Users/eriks/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html): Dados de pessoas envolvidas
    - [fact_locacao](vscode-file://vscode-app/c:/Users/eriks/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html): Métricas de locação
- Views analíticas:
    - Média de aluguel por região
    - Ranking de corretores
    - Tendências de locação
- Aspectos técnicos:
    - Uso de Delta Lake para persistência
    - Tratamento de exceções
    - Gerenciamento de sessão Spark
    - Otimização de joins e agregações

Isso garante que os dados na camada gold estejam:

- Modelados para análise eficiente
- Agregados conforme necessidades do negócio
- Otimizados para consultas
- Prontos para consumo em dashboards e relatórios