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

// // Create child loggers for different modules
// export const createModuleLogger = (moduleName: string) => {
//     return logger.child({ module: moduleName });
// };

// export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
//     const startTime = Date.now();

//     // Log request
//     logger.info({
//         type: 'request',
//         method: req.method,
//         url: req.url,
//         query: req.query,
//         body: req.body,
//         ip: req.ip,
//         userAgent: req.get('user-agent')
//     }, 'Incoming request');

//     // Log response
//     res.on('finish', () => {
//         const duration = Date.now() - startTime;
//         logger.info({
//             type: 'response',
//             method: req.method,
//             url: req.url,
//             statusCode: res.statusCode,
//             duration: `${duration}ms`
//         }, 'Request completed');
//     });

//     next();
// };

// export const apolloLoggingPlugin = {
//     async requestDidStart({ request, contextValue }) {
//         const startTime = Date.now();
//         const operationLogger = logger.child({
//             operation: request.operationName || 'anonymous',
//             type: 'graphql'
//         });

//         operationLogger.info({
//             query: request.query,
//             variables: request.variables
//         }, 'GraphQL operation started');

//         return {
//             async willSendResponse({ response }) {
//                 const duration = Date.now() - startTime;
//                 operationLogger.info({
//                     duration: `${duration}ms`,
//                     errors: response.body,
//                 }, 'GraphQL operation completed');
//             },
//             async didEncounterErrors({ errors }) {
//                 operationLogger.error({
//                     errors: errors.map(err => ({
//                         message: err.message,
//                         path: err.path,
//                         extensions: err.extensions
//                     }))
//                 }, 'GraphQL operation failed');
//             }
//         };
//     }
// } as ApolloServerPlugin;