import request from 'supertest';
import { app } from '../index'; 

describe('User API', () => {
  let createdUserId: number;

  it('should create a user', async () => {
    const res = await request(app).post('/users').send({
      name: 'Test User',
      email: 'testuser@mail.com',
      password: '123456',
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    createdUserId = res.body.id;
  });

  it('should get all users', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get user by id', async () => {
    const res = await request(app).get(`/users/${createdUserId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', createdUserId);
  });

  it('should update user', async () => {
    const res = await request(app).put(`/users/${createdUserId}`).send({
      name: 'Updated Name',
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('name', 'Updated Name');
  });

  it('should delete user', async () => {
    const res = await request(app).delete(`/users/${createdUserId}`);
    expect(res.statusCode).toBe(204);
  });
});
