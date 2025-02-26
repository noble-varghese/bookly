// src/utils/logger.ts
import pino from 'pino';


// Configure base logger
export const logger = pino({
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: false,
        levelFirst: true,
        messageFormat: '[{level}] {time} {msg}',
        translateTime: false,
        ignore: 'pid,hostname'
      }
    }
  });