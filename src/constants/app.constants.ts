/**
 * Constantes da aplicação
 * Elimina magic numbers e strings hardcoded
 */

/**
 * Paleta de cores do app
 */
export const COLORS = {
  PRIMARY: '#2f855a',
  PRIMARY_DARK: '#276749',
  SECONDARY: '#38a169',
  DANGER: '#e53e3e',
  WARNING: '#f59e0b',
  SUCCESS: '#10b981',
  GRAY: '#9ca3af',
  GRAY_LIGHT: '#f3f4f6',
  GRAY_DARK: '#4b5563',
  WHITE: '#ffffff',
  BLACK: '#000000',
} as const;

/**
 * Rotas do aplicativo (type-safe)
 */
export const ROUTES = {
  AUTH: {
    HOME: '/(auth)/(tabs)/home' as const,
    ALUNOS: '/(auth)/(tabs)/alunos' as const,
    CONFIGURACOES: '/(auth)/(tabs)/configuracoes' as const,
    CADASTRO: '/(auth)/cadastro' as const,
    EDITAR_ALUNO: '/(auth)/editarAluno' as const,
    TREINOS: '/(auth)/treinos' as const,
    DETALHES_TREINO: '/(auth)/detalhesTreino' as const,
    EDITAR_TREINO: '/(auth)/editarTreino' as const,
    PERFIL: '/(auth)/perfil' as const,
    PRIVACIDADE: '/(auth)/privacidadeESeguranca' as const,
  },
  PUBLIC: {
    SIGNIN: '/(public)/signin' as const,
    SIGNUP: '/(public)/signup' as const,
    WELCOME: '/(public)/welcome' as const,
  },
} as const;

/**
 * Constantes gerais da aplicação
 */
export const APP_CONSTANTS = {
  // Paginação
  RECENT_STUDENTS_LIMIT: 4,
  DEFAULT_PAGINATION: 20,
  
  // Arquivos
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  SUPPORTED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/jpg'] as const,
  
  // Validação
  MIN_PASSWORD_LENGTH: 8,
  MIN_NAME_LENGTH: 3,
  MAX_NAME_LENGTH: 100,
  
  // Limites físicos
  MIN_WEIGHT: 30, // kg
  MAX_WEIGHT: 300, // kg
  MIN_HEIGHT: 100, // cm
  MAX_HEIGHT: 250, // cm
  MIN_AGE: 13, // anos
  MAX_AGE: 100, // anos
} as const;

/**
 * Mensagens padrão do sistema
 */
export const MESSAGES = {
  SUCCESS: {
    ALUNO_CREATED: 'Aluno cadastrado com sucesso!',
    ALUNO_UPDATED: 'Aluno atualizado com sucesso!',
    ALUNO_DELETED: 'Aluno excluído com sucesso!',
    TREINO_CREATED: 'Treino criado com sucesso!',
    TREINO_UPDATED: 'Treino atualizado com sucesso!',
    TREINO_DELETED: 'Treino excluído com sucesso!',
  },
  ERROR: {
    GENERIC: 'Ocorreu um erro. Tente novamente.',
    NETWORK: 'Erro de conexão. Verifique sua internet.',
    NOT_FOUND: 'Registro não encontrado.',
    UNAUTHORIZED: 'Você não tem permissão para esta ação.',
  },
  VALIDATION: {
    REQUIRED_FIELD: 'Este campo é obrigatório',
    INVALID_EMAIL: 'Email inválido',
    INVALID_PHONE: 'Telefone inválido',
  },
} as const;
