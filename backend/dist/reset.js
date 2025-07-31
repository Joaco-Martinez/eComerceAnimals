"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
function resetDatabase() {
    console.log("🧨 Reseteando base de datos...");
    (0, child_process_1.execSync)("npx prisma db push --force-reset", { stdio: 'inherit' });
    console.log("🌱 Ejecutando seed...");
    (0, child_process_1.execSync)("npm run seed", { stdio: 'inherit' });
}
resetDatabase();
