# Guia de Testes - MuscleAI

## Cobertura de Testes

Este projeto possui testes automatizados para garantir a qualidade e confiabilidade do código.

### Arquivos Testados

- **Services** (69.6% coverage)

  - `alunoService.test.ts` - 12 testes
  - `treinoService.test.ts` - 11 testes
  - `gemini.test.ts` - 6 testes

- **Hooks** (97.31% coverage)

  - `useAlunos.test.ts` - 4 testes
  - `useAluno.test.ts` - 5 testes
  - `useFormValidation.test.ts` - 9 testes
  - `useTreinoForm.test.ts` - 10 testes
  - `useTreinos.test.ts` - 7 testes

- **Componentes UI** (100% coverage)

  - `Button.test.tsx` - 8 testes
  - `Input.test.tsx` - 13 testes
  - `EmptyState.test.tsx` - 5 testes
  - `ErrorState.test.tsx` - 4 testes
  - `LoadingState.test.tsx` - 6 testes
  - `ValidationSummary.test.tsx` - 8 testes

- **Componentes MyComponents** (30% coverage)

  - `ListaAlunos.test.tsx` - 5 testes

- **Libs** (96.66% coverage)

  - `utils.test.ts` - 7 testes
  - `errorHandler.test.ts` - 12 testes
  - `logger.test.ts` - 8 testes

- **Validação** (87.5% coverage)
  - `schemas.test.ts` - 15 testes para 4 schemas

### Resumo

- **Total de arquivos de teste:** 19
- **Total de testes:** 162

## Comandos

### Executar Todos os Testes

```bash
npm test
```

### Executar Testes em Modo Watch

```bash
npm run test:watch
```

### Executar Testes com Coverage

```bash
npm run test -- --coverage
```

### Executar Teste Específico

```bash
npm test -- alunoService.test
```

### Executar Testes para CI/CD

```bash
npm run test:ci
```

## 📈 Métricas de Cobertura

O projeto está configurado para exigir um mínimo de 70% de cobertura em:

- ✅ **Statements:** 83.33% (threshold: 70%)
- ✅ **Branches:** 80% (threshold: 70%)
- ✅ **Functions:** 82.85% (threshold: 70%)
- ✅ **Lines:** 83.72% (threshold: 70%)

**Cobertura atual está acima do threshold em todas as métricas!**

## 🧪 Estrutura dos Testes

```text
src/
├── services/
│   └── __tests__/
│       ├── alunoService.test.ts
│       ├── treinoService.test.ts
│       └── gemini.test.ts
├── hooks/
│   └── __tests__/
│       ├── useAlunos.test.ts
│       ├── useAluno.test.ts
│       ├── useFormValidation.test.ts
│       ├── useTreinoForm.test.ts
│       └── useTreinos.test.ts
├── components/
│   ├── ui/
│   │   └── __tests__/
│   │       ├── Button.test.tsx
│   │       ├── Input.test.tsx
│   │       ├── EmptyState.test.tsx
│   │       ├── ErrorState.test.tsx
│   │       ├── LoadingState.test.tsx
│   │       └── ValidationSummary.test.tsx
│   └── mycomponents/
│       └── __tests__/
│           └── ListaAlunos.test.tsx
├── lib/
│   └── __tests__/
│       ├── utils.test.ts
│       ├── errorHandler.test.ts
│       └── logger.test.ts
└── validation/
    └── __tests__/
        └── schemas.test.ts
```

## Ferramentas Utilizadas

- **Jest** - Framework de testes
- **Jest Expo** - Preset para projetos Expo
- **Testing Library React Native** - Utilitários para testar componentes React Native
- **@types/jest** - TypeScript types para Jest

## Convenções

### Nomenclatura de Arquivos

- Todos os arquivos de teste terminam com `.test.ts` ou `.test.tsx`
- Ficam dentro de pasta `__tests__` no mesmo diretório do código testado

### Estrutura dos Testes

```typescript
describe('NomeDoComponente/Service', () => {
  beforeEach(() => {
    // Setup antes de cada teste
    jest.clearAllMocks();
  });

  describe('funcaoEspecifica', () => {
    it('deve fazer X quando Y', async () => {
      // Arrange (preparar)
      const mockData = { ... };

      // Act (executar)
      const result = await funcao(mockData);

      // Assert (verificar)
      expect(result).toEqual(expected);
    });
  });
});
```

## Configuração

### jest.config.js

```javascript
module.exports = {
  preset: 'jest-expo',
  transformIgnorePatterns: [...],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/app/**/*',
    '!src/types/**/*',
    '!src/constants/**/*',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};
```

### jest.setup.js

Configurações globais:

- Mocks do Expo Router
- Mocks do Clerk (autenticação)
- Mocks do Prisma Client
- Mocks do Ionicons (@expo/vector-icons)
- Silenciamento de logs durante testes

### jest.setup.before.js

Setup inicial que roda antes do jest-expo:

- Mock de NativeModules do React Native
- Inicialização de módulos nativos

## Boas Práticas

1. **Sempre limpe mocks** antes de cada teste com `jest.clearAllMocks()`
2. **Use `waitFor`** para operações assíncronas
3. **Teste casos de sucesso E erro**
4. **Use `testID`** para facilitar seleção de elementos
5. **Mantenha testes pequenos e focados**
6. **Mocks devem simular comportamento real**
7. **Coverage mínimo de 70%** para todos os módulos

## Próximos Passos

- Adicionar testes E2E com Detox
- Testes de integração para fluxos completos
- Snapshot testing para componentes visuais
- Testes de performance
- Aumentar coverage de services (alunoService, treinoService) para 80%+
- Adicionar testes para componentes restantes (AlunoHomePage, ConfigItem)

## Referências

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Testing Library](https://testing-library.com/docs/react-native-testing-library/intro/)
- [Jest Expo](https://docs.expo.dev/develop/unit-testing/)

---

**Última atualização:** 04 de Novembro de 2025
