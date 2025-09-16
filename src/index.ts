#!/usr/bin/env node

/**
 * Simple TypeScript application entry point
 */

import logger, { createChildLogger } from './logger.js';

// Application startup logging
logger.info('Hello, TypeScript world!', {
  nodeVersion: process.version,
  workingDirectory: process.cwd(),
  environment: process.env.NODE_ENV || 'development',
});

// Example of modern TypeScript features
const greetUser = (name: string = 'Developer'): string => {
  return `Welcome, ${name}! 🚀`;
};

const currentTime = new Date().toISOString();
const greeting = greetUser();

logger.info('Application initialization', {
  greeting,
  startTime: currentTime,
  processId: process.pid,
});

// Example async function with structured logging
async function main(): Promise<void> {
  const mainLogger = createChildLogger({ component: 'main' });

  try {
    mainLogger.info('Starting main application logic');

    // Simulate some work with logging
    mainLogger.debug('Performing initialization tasks');

    // Example of logging with context
    const config = {
      timeout: 5000,
      retries: 3,
      environment: process.env.NODE_ENV || 'development',
    };

    mainLogger.info('Application configuration loaded', { config });

    // Simulate async work
    await new Promise((resolve) => setTimeout(resolve, 100));

    mainLogger.info('Main application logic completed successfully', {
      duration: '100ms',
      status: 'success',
    });
  } catch (error) {
    mainLogger.error('Application error occurred', {
      error:
        error instanceof Error
          ? {
              message: error.message,
              stack: error.stack,
              name: error.name,
            }
          : error,
    });

    // Log fatal error and exit
    logger.fatal('Application terminating due to unhandled error');
    process.exit(1);
  }
}

// Handle uncaught exceptions and unhandled rejections
process.on('uncaughtException', (error) => {
  logger.fatal('Uncaught exception', { error });
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.fatal('Unhandled promise rejection', {
    reason,
    promise: promise.toString(),
  });
  process.exit(1);
});

// Graceful shutdown handling
process.on('SIGINT', () => {
  logger.info('Received SIGINT, shutting down gracefully');
  process.exit(0);
});

process.on('SIGTERM', () => {
  logger.info('Received SIGTERM, shutting down gracefully');
  process.exit(0);
});

// Run the main function
main();
