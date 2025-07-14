import { execSync } from 'child_process';

function resetDatabase() {
  console.log("🧨 Reseteando base de datos...");
  execSync("npx prisma db push --force-reset", { stdio: 'inherit' });
  console.log("🌱 Ejecutando seed...");
  execSync("npm run seed", { stdio: 'inherit' });
}

resetDatabase();
