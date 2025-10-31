# Entrega 02 - Análise de Problemas e Estratégia de Refatoração

**Projeto:** MuscleAI - Sistema de Gerenciamento de Treinos  
**Integrantes:** Gabriel Marchetti  
**Data:** 21/10/2025

---

## 1. Principais Problemas Detectados

### 1.1 Code Smells Críticos

#### 1.1.1 Duplicação de Código (40%)

**Problema:**  
Lógica de fetch repetida em 5+ componentes (home.tsx, alunos.tsx, editarAluno.tsx, treinos.tsx, cadastro.tsx).

**Exemplo:**
```typescript
// ❌ Repetido em múltiplos arquivos
const [alunos, setAlunos] = useState<Aluno[]>([]);
const [loading, setLoading] = useState(false);

useEffect(() => {
  const fetchAlunos = async () => {
    setLoading(true);
    try {
      const data = await prismaClient.aluno.findMany();
      setAlunos(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  fetchAlunos();
}, []);
```

**Impacto:** Manutenção difícil, bugs replicados, código verboso

---

#### 1.1.2 Componentes Muito Grandes (Violação SRP)

**Problema:**  
- `editarAluno.tsx`: 272 linhas
- `cadastro.tsx`: 248 linhas
- `home.tsx`: 201 linhas

**Sintomas:**
- Múltiplas responsabilidades em um único componente
- Difícil de testar
- Difícil de entender e manter

---

#### 1.1.3 Acoplamento ao Banco de Dados

**Problema:**  
UI acoplada diretamente ao Prisma Client.

**Exemplo:**
```typescript
// ❌ UI conhece detalhes do banco
const alunos = await prismaClient.aluno.findMany({
  orderBy: { nm_aluno: 'asc' }
});
```

**Consequências:**
- Impossível testar sem banco
- Dificulta mudança de infraestrutura
- Viola princípio da inversão de dependência

---

#### 1.1.4 Tratamento de Erros Inconsistente

**Problema:**  
Mix de `console.error()`, `alert()`, `Alert.alert()` sem padrão.

**Exemplo:**
```typescript
// ❌ Cada lugar trata erro de forma diferente
catch (error) {
  console.error(error);  // Alguns lugares
  alert('Erro!');        // Outros lugares
  Alert.alert('Erro');   // Mais outros lugares
}
```

**Impacto:** UX ruim, sem tracking de erros, sem mensagens claras

---

#### 1.1.5 Validação Inadequada

**Problema:**  
Validações básicas e repetidas em cada formulário.

**Exemplo:**
```typescript
// ❌ Validação manual repetida
if (!nome) {
  Alert.alert('Nome é obrigatório');
  return;
}
if (peso <= 0) {
  Alert.alert('Peso inválido');
  return;
}
```

**Consequências:**
- Mensagens genéricas
- Validações incompletas
- Código duplicado

---

#### 1.1.6 Configurações Hardcoded

**Problema:**  
URLs, API keys e configs no código fonte.

**Exemplo:**
```typescript
// ❌ Hardcoded no código
const API_KEY = 'AIza...';
const color = '#2f855a';
```

**Riscos:**
- Exposição de credenciais
- Dificulta deploy para diferentes ambientes
- Dificulta manutenção

---

### 1.2 Code Smells Moderados

#### 1.2.1 Console.log em Produção (20+ instâncias)

**Problema:** Logs de desenvolvimento em produção.

**Impacto:** Exposição de dados, sem controle de logs

---

#### 1.2.2 Magic Numbers e Strings

**Problema:** 
- Cores hardcoded: `#2f855a`
- Números sem contexto: `take: 4`
- Rotas como strings literais

---

#### 1.2.3 Tipagem com `any`

**Problema:** Perda de type-safety do TypeScript.

**Consequência:** Bugs em runtime, refatoração arriscada

---

#### 1.2.4 Classes CSS Duplicadas

**Problema:** Estilos repetidos em 10+ lugares.

**Impacto:** Inconsistência visual, dificulta mudanças

---

#### 1.2.5 Estados UI Não Padronizados

**Problema:** Cada componente cria seu próprio loading/empty state.

**Impacto:** Inconsistência visual, código duplicado

---

## 2. Estratégia de Refatoração

### 2.1 Fase 1 - Fundação (Semana 1)

#### 2.1.1 Service Layer Pattern

**Objetivo:** Isolar lógica de negócio da UI

**Implementação:**
- Criar `src/services/alunoService.ts`
- Criar `src/services/treinoService.ts`
- Implementar CRUD completo em cada service
- UI chama services, não Prisma diretamente

**Ferramentas:**
- TypeScript para type-safety
- Prisma ORM para acesso ao banco

**Resultado Esperado:**
- ✅ Zero acoplamento UI-Banco
- ✅ Fácil de testar com mocks
- ✅ Lógica centralizada

---

#### 2.1.2 Logger Profissional

**Objetivo:** Substituir todos console.log

**Implementação:**
- Criar `src/lib/logger.ts`
- Níveis: debug, info, warn, error
- Preparar para Sentry em produção

**Ferramentas:**
- Custom logger class
- Preparação para integração Sentry

---

#### 2.1.3 Error Handler Centralizado

**Objetivo:** Tratamento consistente de erros

**Implementação:**
- Criar classes de erro customizadas
- `DatabaseError`, `ValidationError`, `NetworkError`
- Handler único para transformar erros em mensagens

**Ferramentas:**
- TypeScript classes
- Custom error types

---

#### 2.1.4 Sistema de Constantes

**Objetivo:** Eliminar magic numbers/strings

**Implementação:**
- Criar `src/constants/app.constants.ts`
- COLORS, ROUTES, APP_CONSTANTS
- Type-safe em toda aplicação

---

### 2.2 Fase 2 - Componentização (Semana 2)

#### 2.2.1 Custom Hooks Pattern

**Objetivo:** Eliminar duplicação de lógica

**Implementação:**
- `useAlunos`: Hook para lista de alunos
- `useAluno`: Hook para aluno individual
- `useTreinos`: Hook para lista de treinos
- `useTreinoForm`: Hook para formulário

**Ferramentas:**
- React Hooks
- React Native Testing Library para testes

**Resultado Esperado:**
- ✅ 60% menos duplicação
- ✅ Componentes 50% menores
- ✅ Testável isoladamente

---

#### 2.2.2 Componentes UI Reutilizáveis

**Objetivo:** Consistência visual e DRY

**Implementação:**
- `Button`: 4 variantes, loading state
- `Input`: 4 tipos, validação visual
- `LoadingState`: Estado de carregamento
- `EmptyState`: Estado vazio
- `ErrorState`: Exibição de erros
- `ValidationSummary`: Sumário de validação

**Ferramentas:**
- React Native + NativeWind
- TypeScript para props type-safe

**Resultado Esperado:**
- ✅ 100% consistência visual
- ✅ 40% menos CSS
- ✅ Mudanças de design facilitadas

---

### 2.3 Fase 3 - Validação (Semana 3)

#### 2.3.1 Schemas de Validação com Yup

**Objetivo:** Validação robusta e reutilizável

**Implementação:**
- Criar `src/validation/schemas.ts`
- `alunoSchema`, `treinoSchema`, `loginSchema`, `signupSchema`
- Mensagens em português
- Validações complexas (idade, força de senha, etc)

**Ferramentas:**
- **Yup**: Biblioteca de validação para JavaScript
- TypeScript para inferência de tipos

**Resultado Esperado:**
- ✅ Validação completa
- ✅ Mensagens claras
- ✅ Type-safe
- ✅ Reutilizável em toda aplicação

---

### 2.4 Fase 4 - Testes e Qualidade (Semana 4)

#### 2.4.1 Suite de Testes (TDD)

**Objetivo:** Cobertura de 50%+ com testes unitários

**Implementação:**
- Testes de services (CRUD completo)
- Testes de hooks (loading, error, success)
- Testes de componentes UI (render, interação)
- Testes de validação (schemas Yup)

**Ferramentas:**
- **Jest**: Framework de testes JavaScript
- **React Native Testing Library**: Utilitários para testar RN
- **@testing-library/react-hooks**: Testar hooks isoladamente

**Configuração:**
```bash
npm install --save-dev jest @testing-library/react-native @testing-library/react-hooks
```

**Coverage Threshold:**
- 70% em branches, functions, lines, statements

**Resultado Esperado:**
- ✅ 68+ testes implementados
- ✅ 85%+ cobertura
- ✅ Confiança em refatorações
- ✅ Previne regressões

---

#### 2.4.2 Linter (ESLint + Prettier)

**Objetivo:** Código consistente e sem erros

**Implementação:**
- Configurar ESLint 9.38 com flat config
- Plugins: TypeScript, React, React Native, React Hooks
- Configurar Prettier para formatação
- Scripts npm: `lint`, `lint:fix`, `lint:check`

**Ferramentas:**
- **ESLint 9.38.0**: Linter JavaScript/TypeScript
- **Prettier 2.x**: Formatador de código
- **Plugins ESLint:**
  - `@typescript-eslint/parser`
  - `@typescript-eslint/eslint-plugin`
  - `eslint-plugin-react`
  - `eslint-plugin-react-native`
  - `eslint-plugin-react-hooks`

**Configuração:**
```bash
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm install --save-dev eslint-plugin-react eslint-plugin-react-native eslint-plugin-react-hooks
npm install --save-dev prettier
```

**Regras Principais:**
- Aviso para uso de `any`
- Proibido `console.log` (permite warn/error)
- Obrigatório `===` (igualdade estrita)
- Rules of Hooks ativadas

**Integração:**
- Pre-commit hook (opcional)
- CI/CD pipeline
- VSCode extension

**Resultado Esperado:**
- ✅ 0 erros
- ✅ < 50 warnings
- ✅ Código formatado consistente
- ✅ Type-safety garantido

---

## 3. Ferramentas Utilizadas

### 3.1 Desenvolvimento

| Ferramenta | Versão | Finalidade |
|------------|--------|------------|
| TypeScript | 5.3 | Type-safety |
| React Native | 0.74.5 | Framework mobile |
| Expo | 51.0 | Plataforma desenvolvimento |
| Prisma ORM | 5.21 | Acesso ao banco |
| Yup | 1.x | Validação de schemas |

### 3.2 Testes

| Ferramenta | Versão | Finalidade |
|------------|--------|------------|
| Jest | 29.x | Framework de testes |
| React Native Testing Library | 12.7 | Testar componentes |
| @testing-library/react-hooks | Latest | Testar hooks |

### 3.3 Qualidade de Código

| Ferramenta | Versão | Finalidade |
|------------|--------|------------|
| ESLint | 9.38.0 | Linter JavaScript/TS |
| Prettier | 2.x | Formatação de código |
| @typescript-eslint/* | Latest | Regras TypeScript |
| eslint-plugin-react | Latest | Regras React |
| eslint-plugin-react-native | Latest | Regras React Native |
| eslint-plugin-react-hooks | Latest | Validação de hooks |

### 3.4 Infraestrutura

| Ferramenta | Finalidade |
|------------|------------|
| Git | Controle de versão |
| GitHub | Repositório remoto |
| npm | Gerenciador de pacotes |

---

## 4. Cronograma de Execução

### Semana 1 (07-14/10) - Fundação
- ✅ Service Layer (alunoService, treinoService)
- ✅ Logger profissional
- ✅ Error Handler centralizado
- ✅ Sistema de constantes
- ✅ DTOs (aluno.dto, treino.dto)

### Semana 2 (14-21/10) - Componentização
- ✅ Custom Hooks (useAlunos, useAluno, useTreinos, useTreinoForm)
- ✅ Componentes UI (Button, Input, LoadingState, EmptyState, ErrorState, ValidationSummary)
- ✅ Refatoração de telas usando hooks e componentes

### Semana 3 (21-28/10) - Validação e Testes
- ✅ Schemas Yup (alunoSchema, treinoSchema, loginSchema, signupSchema)
- ✅ Testes de services (23 testes)
- ✅ Testes de hooks (9 testes)
- ✅ Testes de componentes (21 testes)
- ✅ Testes de validação (15 testes)

### Semana 4 (28/10-04/11) - Finalização
- ✅ ESLint configurado
- ✅ Prettier configurado
- ✅ Correção de 17 warnings
- ✅ Documentação (TESTING.md, LINTER.md, CHANGELOG.md)
- ✅ README atualizado

---

## 5. Métricas de Sucesso Esperadas

### 5.1 Redução de Código

- **Duplicação:** 40% → < 5% (↓ 88%)
- **Linhas de código:** ~3.000 → ~2.400 (↓ 20%)
- **Tamanho médio componente:** 180 → 100 linhas (↓ 44%)

### 5.2 Qualidade

- **Testes:** 0% → 85%+ cobertura
- **console.log:** 20+ → 0 instâncias
- **Code Smells:** 12 → 0

### 5.3 Manutenibilidade

- **Componentes grandes (200+ linhas):** 4 → 0
- **Arquivos criados:** +32 arquivos (services, hooks, components, tests)
- **Documentação:** +3 arquivos (TESTING.md, LINTER.md, CHANGELOG.md)

---

## 6. Riscos e Mitigações

### 6.1 Risco: Quebrar funcionalidades existentes

**Mitigação:** 
- Implementar testes ANTES de refatorar
- Manter branch `original` intacta
- Testar manualmente cada funcionalidade após refatoração

### 6.2 Risco: Prazo apertado

**Mitigação:**
- Priorizar refatorações de maior impacto
- Automatizar com ferramentas (ESLint, Prettier)
- Focar em atingir 50% de cobertura (meta mínima)

### 6.3 Risco: Learning curve de ferramentas

**Mitigação:**
- Usar documentação oficial
- Começar com exemplos simples
- Testar ferramentas isoladamente antes de integrar

---

## 7. Conclusão

A estratégia de refatoração está dividida em 4 fases bem definidas, com ferramentas específicas para cada problema identificado. O foco está em:

1. **Eliminar duplicação** via Service Layer e Custom Hooks
2. **Componentização** para consistência e reutilização
3. **Validação robusta** com Yup
4. **Qualidade garantida** com testes e linter

**Objetivo final:** Código limpo, testável, manutenível e seguindo princípios de Clean Code e SOLID.
