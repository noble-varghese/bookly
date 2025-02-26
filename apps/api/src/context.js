"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContext = void 0;
// src/context.ts
const dataloaders_1 = require("./dataloaders");
const createContext = () => ({
    loaders: (0, dataloaders_1.createLoaders)()
});
exports.createContext = createContext;
