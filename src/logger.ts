import pino from 'pino';

/**
 * Structured logger configuration using Pino
 * Transport: Console only
 */

const isDevelopment = process.env.NODE_ENV !== 'production';

export const logger = pino({
  name: 'llm-notes-cron',
  level: process.env.LOG_LEVEL || (isDevelopment ? 'debug' : 'info'),

  // Base fields to include in every log
  base: {
    pid: process.pid,
    hostname: process.env.HOSTNAME || 'localhost',
  },

  // Timestamp configuration
  timestamp: pino.stdTimeFunctions.isoTime,

  // Transport configuration - console only with JSON output
  transport: {
    target: 'pino/file',
    options: {
      destination: 1, // stdout
    },
  },

  // Redact sensitive information
  redact: {
    paths: ['password', 'token', 'authorization', 'cookie'],
    censor: '[REDACTED]',
  },

  // Serializers for common objects
  serializers: {
    err: pino.stdSerializers.err,
    req: pino.stdSerializers.req,
    res: pino.stdSerializers.res,
  },
});

/**
 * Create a child logger with additional context
 */
export const createChildLogger = (context: Record<string, any>) => {
  return logger.child(context);
};

/**
 * Log levels for reference:
 * - fatal (60): The service/app is going to stop or become unusable
 * - error (50): Fatal for a particular request, but the service/app continues
 * - warn (40): A note on something that should probably be looked at
 * - info (30): General operational entries about what's happening
 * - debug (20): Less granular than trace, but more than info
 * - trace (10): Very granular information, typically only of interest when diagnosing problems
 */

export default logger;
