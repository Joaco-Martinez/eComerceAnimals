"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cancelOldPendingOrders_1 = require("./cancelOldPendingOrders");
(0, cancelOldPendingOrders_1.cancelOldPendingOrders)().then(() => {
    console.log('✓ Script ejecutado');
    process.exit(0);
});
