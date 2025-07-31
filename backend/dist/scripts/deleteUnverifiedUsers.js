"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUnverifiedUsers = void 0;
const db_1 = require("../db/db"); // o donde tengas tu instancia real
const deleteUnverifiedUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const now = new Date();
    const usersToDelete = yield db_1.prisma.user.findMany({
        where: {
            isEmailVerified: false,
            emailVerificationExpires: { lt: now },
        },
        select: { id: true },
    });
    const ids = usersToDelete.map((u) => u.id);
    if (ids.length === 0) {
        console.log('No hay usuarios vencidos para eliminar.');
        return;
    }
    // Relaciones
    yield db_1.prisma.notification.deleteMany({ where: { userId: { in: ids } } });
    yield db_1.prisma.userCoupon.deleteMany({ where: { userId: { in: ids } } });
    yield db_1.prisma.review.deleteMany({ where: { userId: { in: ids } } });
    yield db_1.prisma.order.deleteMany({ where: { userId: { in: ids } } });
    yield db_1.prisma.cart.deleteMany({ where: { userId: { in: ids } } });
    yield db_1.prisma.address.deleteMany({ where: { userId: { in: ids } } });
    yield db_1.prisma.user.deleteMany({ where: { id: { in: ids } } });
    console.log(`Usuarios eliminados: ${ids.length}`);
});
exports.deleteUnverifiedUsers = deleteUnverifiedUsers;
(0, exports.deleteUnverifiedUsers)()
    .then(() => console.log('Tarea completa.'))
    .catch((err) => console.error('Error al eliminar usuarios:', err));
