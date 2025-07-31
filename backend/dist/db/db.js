"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
console.log('DB URL:', process.env.DATABASE_URL);
exports.prisma = new client_1.PrismaClient();
