# Guia de Testes - MuscleAI

## Cobertura de Testes

Este projeto possui testes automatizados para garantir a qualidade e confiabilidade do código.

### Arquivos Testados

- **Services** (100% coverage)

  - `alunoService.test.ts` - 12 testes
  - `treinoService.test.ts` - 11 testes

- **Hooks** (90% coverage)

  - `useAlunos.test.ts` - 4 testes
  - `useAluno.test.ts` - 5 testes

- **Componentes UI** (95% coverage)

  - `Button.test.tsx` - 8 testes
  - `Input.test.tsx` - 13 testes

- **Validação** (100% coverage)
  - `schemas.test.ts` - 15 testes para 4 schemas

**Total: 68 testes**

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

- ✅ **Branches:** 70%+
- ✅ **Functions:** 70%+
- ✅ **Lines:** 70%+
- ✅ **Statements:** 70%+

## 🧪 Estrutura dos Testes

```
src/
├── services/
│   └── __tests__/
│       ├── alunoService.test.ts
│       └── treinoService.test.ts
├── hooks/
│   └── __tests__/
│       ├── useAlunos.test.ts
│       └── useAluno.test.ts
├── components/
│   └── ui/
│       └── __tests__/
│           ├── Button.test.tsx
│           └── Input.test.tsx
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
- Silenciamento de logs durante testes

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
- Aumentar coverage para 90%+

## Referências

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Testing Library](https://testing-library.com/docs/react-native-testing-library/intro/)
- [Jest Expo](https://docs.expo.dev/develop/unit-testing/)

---

**Última atualização:** 29 de Outubro de 2025
