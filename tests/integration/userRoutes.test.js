const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const app = require('../../src/app'); // Asume que tienes un archivo app.js con tu Express app

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('User Routes', () => {
  it('crear un nuevo usuario', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        username: 'integration_test',
        email: 'integration@test.com',
        age: 30
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.username).toBe('integration_test');
  });

  it('obtener usuarios', async () => {
    const response = await request(app).get('/users');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });
});
