/**
 * Utility functions for the application
 */

import logger, { createChildLogger } from './logger.js';

const utilsLogger = createChildLogger({ module: 'utils' });

export const add = (a: number, b: number): number => {
  return a + b;
};

export const multiply = (a: number, b: number): number => {
  return a * b;
};

export const formatGreeting = (name: string, title?: string): string => {
  const prefix = title ? `${title} ` : '';
  return `Hello, ${prefix}${name}!`;
};

export const isEven = (num: number): boolean => {
  return num % 2 === 0;
};

export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const fetchUserData = async (userId: string): Promise<{ id: string; name: string }> => {
  const requestLogger = utilsLogger.child({ function: 'fetchUserData', userId });
  
  requestLogger.debug('Starting user data fetch');
  
  try {
    // Simulate API call
    await delay(100);
    
    if (userId === 'invalid') {
      requestLogger.warn('Invalid user ID provided', { userId });
      throw new Error('User not found');
    }
    
    const userData = {
      id: userId,
      name: `User ${userId}`,
    };
    
    requestLogger.info('User data fetched successfully', { userData });
    return userData;
    
  } catch (error) {
    requestLogger.error('Failed to fetch user data', { 
      error: error instanceof Error ? error.message : error,
      userId 
    });
    throw error;
  }
};
