"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
// src/utils/logger.ts
const pino_1 = __importDefault(require("pino"));
// Configure base logger
exports.logger = (0, pino_1.default)({
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
