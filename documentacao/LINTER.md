# ESLint - Configuração e Uso

## Visão Geral

Este projeto utiliza **ESLint** como ferramenta de linting para garantir qualidade e consistência do código TypeScript e React Native.

## Configuração

### Plugins Instalados

- **@typescript-eslint/parser** - Parser TypeScript para ESLint
- **@typescript-eslint/eslint-plugin** - Regras TypeScript
- **eslint-plugin-react** - Regras React
- **eslint-plugin-react-native** - Regras React Native
- **eslint-plugin-react-hooks** - Regras React Hooks

### Arquivo de Configuração

O ESLint está configurado no arquivo `eslint.config.js` (formato flat config - ESLint v9+).

**Principais regras ativadas:**

**TypeScript:**

- Aviso para uso de `any`
- Aviso para variáveis não utilizadas
- Aviso para non-null assertions
- Desabilitado `explicit-module-boundary-types` (inferência automática)

**React:**

- `react-in-jsx-scope` desabilitado (React 17+)
- `prop-types` desabilitado (TypeScript já faz validação)
- Regras de hooks ativadas (rules-of-hooks, exhaustive-deps)

**React Native:**

- Aviso para estilos inline
- Aviso para estilos não utilizados
- Cores literais permitidas (uso do Tailwind)

**Geral:**

- Aviso para `console.log` (permite apenas `console.warn` e `console.error`)
- Proibido uso de `var` (usar `const` ou `let`)
- Obrigatório uso de `===` (igualdade estrita)
- Obrigatório uso de chaves em blocos `if/else`

## Scripts Disponíveis

```bash
# Executar linter
npm run lint

# Executar linter e corrigir automaticamente
npm run lint:fix

# Executar linter com zero warnings (CI)
npm run lint:check
```

## Uso Durante o Desenvolvimento

### 1. Verificar Código Antes de Commit

```bash
npm run lint
```

### 2. Corrigir Problemas Automaticamente

```bash
npm run lint:fix
```

### 3. Integração com VSCode

Instale a extensão **ESLint** no VSCode para ter feedback em tempo real.

Configuração recomendada (`.vscode/settings.json`):

```json
{
  "eslint.enable": true,
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## Status Atual do Projeto

**Resultado da última verificação:**

```
✖ 50 problemas (0 erros, 50 warnings)
```

**Melhorias Aplicadas:**

- Removidos 17 warnings de imports/variáveis não utilizados (67 → 50 warnings)
- 8 arquivos limpos: cadastro.tsx, editarAluno.tsx, treinos.tsx, detalhesTreino.tsx, ListaAlunos.tsx, ValidationSummary.tsx, \_layout.tsx (2 arquivos)

### Principais Warnings

- **22 warnings** - Uso de `any` em tipos TypeScript
- **10 warnings** - `console.log` em código (deveria usar Logger)
- **8 warnings** - Estilos inline (preferir classes Tailwind)
- **5 warnings** - Dependências faltando em hooks
- **5 warnings** - Outros (non-null assertions, etc)

### Plano de Correção

**Prioridade ALTA:**

1. ~~Remover imports não utilizados~~ **CONCLUÍDO**
2. Substituir `console.log` por `Logger.debug()`
3. Adicionar dependências faltando em `useEffect`

**Prioridade MÉDIA:**

4. Substituir `any` por tipos específicos
5. Extrair estilos inline para classes

**Prioridade BAIXA:**

6. Remover non-null assertions onde possível

## Arquivos Ignorados

O ESLint ignora automaticamente:

- `node_modules/`
- `android/`
- `ios/`
- `.expo/`
- `build/` e `dist/`
- `coverage/`
- `*.config.js` (arquivos de configuração)
- `__tests__/` e `*.test.ts(x)` (arquivos de teste)
- `prisma/migrations/`

## Desabilitar Regras Específicas

### Para uma linha:

```typescript
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const data: any = await fetchData();
```

### Para um bloco:

```typescript
/* eslint-disable @typescript-eslint/no-explicit-any */
function processData(data: any) {
  // código que realmente precisa de any
}
/* eslint-enable @typescript-eslint/no-explicit-any */
```

### Para um arquivo inteiro:

```typescript
/* eslint-disable @typescript-eslint/no-explicit-any */
// Todo o arquivo
```

**IMPORTANTE:** Use com moderação! Sempre prefira corrigir o problema ao invés de desabilitar a regra.

## Referências

- [ESLint Documentation](https://eslint.org/)
- [TypeScript ESLint](https://typescript-eslint.io/)
- [ESLint Plugin React](https://github.com/jsx-eslint/eslint-plugin-react)
- [ESLint Plugin React Native](https://github.com/Intellicode/eslint-plugin-react-native)

---

## Integração com CI/CD

Para integrar o linter no pipeline de CI/CD, adicione ao seu workflow:

```yaml
# .github/workflows/ci.yml
- name: Run Linter
  run: npm run lint:check
```

Isso garante que código com erros de lint não seja mergeado.

---

**Configurado em:** 29/10/2025  
**Versão ESLint:** 9.38.0  
**Status:** Funcional com 50 warnings a serem corrigidos
