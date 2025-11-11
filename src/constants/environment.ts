/**
 * Configurações de ambiente
 * Centraliza variáveis de ambiente e configurações sensíveis
 */

/**
 * Variáveis de ambiente
 */
export const ENV = {
  // Clerk (Autenticação)
  CLERK_PUBLISHABLE_KEY: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || '',
  CLERK_FRONTEND_API: process.env.EXPO_PUBLIC_CLERK_FRONTEND_API || '',

  // Gemini AI
  GEMINI_API_KEY: process.env.API_GEMINI || '',
  GEMINI_API_URL:
    process.env.GEMINI_API_URL ||
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',

  // Ambiente
  IS_DEV: __DEV__,
  IS_PROD: !__DEV__,
} as const;

/**
 * Validação de variáveis obrigatórias
 */
export function validateEnvironment() {
  const required = {
    CLERK_PUBLISHABLE_KEY: ENV.CLERK_PUBLISHABLE_KEY,
    GEMINI_API_KEY: ENV.GEMINI_API_KEY,
  };

  const missing: string[] = [];

  Object.entries(required).forEach(([key, value]) => {
    if (!value) {
      missing.push(key);
    }
  });

  if (missing.length > 0) {
    throw new Error(
      `Variáveis de ambiente faltando: ${missing.join(', ')}\n` +
        'Configure o arquivo .env na raiz do projeto.',
    );
  }
}
