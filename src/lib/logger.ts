/**
 * Sistema de logging profissional
 * Substitui console.log com níveis de log e controle por ambiente
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

class Logger {
  private isDevelopment = __DEV__;

  private log(level: LogLevel, message: string, data?: any) {
    // Em produção, não exibe logs de debug
    if (!this.isDevelopment && level === 'debug') return;

    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${level.toUpperCase()}]`;

    if (this.isDevelopment) {
      console[level === 'debug' ? 'log' : level](`${prefix} ${message}`, data || '');
    }

    // TODO: Em produção, integrar com Sentry
    // if (!this.isDevelopment && level === 'error') {
    //   Sentry.captureException(new Error(message), { extra: data });
    // }
  }

  /**
   * Log de debug - apenas em desenvolvimento
   */
  debug(message: string, data?: any) {
    this.log('debug', message, data);
  }

  /**
   * Log de informação
   */
  info(message: string, data?: any) {
    this.log('info', message, data);
  }

  /**
   * Log de aviso
   */
  warn(message: string, data?: any) {
    this.log('warn', message, data);
  }

  /**
   * Log de erro - sempre registrado
   */
  error(message: string, data?: any) {
    this.log('error', message, data);
  }
}

export default new Logger();
