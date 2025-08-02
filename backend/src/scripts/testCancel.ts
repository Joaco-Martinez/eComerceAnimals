import { cancelOldPendingOrders } from './cancelOldPendingOrders';

cancelOldPendingOrders().then(() => {
  console.log('✓ Script ejecutado');
  process.exit(0);
});