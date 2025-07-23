import cron from 'node-cron';
import { deleteUnverifiedUsers } from '../scripts/deleteUnverifiedUsers';

// Ejecutar todos los días a las 3 AM
cron.schedule('0 3 * * *', async () => {
  await deleteUnverifiedUsers();
});
