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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../index");
describe('User API', () => {
    let createdUserId;
    it('should create a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.app).post('/users').send({
            name: 'Test User',
            email: 'testuser@mail.com',
            password: '123456',
        });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        createdUserId = res.body.id;
    }));
    it('should get all users', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.app).get('/users');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    }));
    it('should get user by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.app).get(`/users/${createdUserId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('id', createdUserId);
    }));
    it('should update user', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.app).put(`/users/${createdUserId}`).send({
            name: 'Updated Name',
        });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('name', 'Updated Name');
    }));
    it('should delete user', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.app).delete(`/users/${createdUserId}`);
        expect(res.statusCode).toBe(204);
    }));
});
