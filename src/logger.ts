import pino from 'pino';

const logger = pino({
  transport: {
    target: 'pino/file',
    options: {
      destination: 1, // stdout
    },
  },

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

export default logger;
