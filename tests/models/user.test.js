const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const User = require('../../src/models/User');

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

describe('User Model Test', () => {
  it('crear usuario válido', async () => {
    const userData = {
      username: 'testuser',
      email: 'test@example.com',
      age: 25
    };

    const validUser = new User(userData);
    const savedUser = await validUser.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.username).toBe(userData.username);
  });

  it('fallar al crear usuario sin username', async () => {
    const userData = {
      email: 'test@example.com',
      age: 25
    };

    const invalidUser = new User(userData);
    
    await expect(invalidUser.save()).rejects.toThrow();
  });

  it('validar restricciones de edad', async () => {
    const invalidUserUnder = new User({
      username: 'younguser',
      email: 'young@example.com',
      age: 17
    });

    const invalidUserOver = new User({
      username: 'olduser',
      email: 'old@example.com',
      age: 121
    });

    await expect(invalidUserUnder.save()).rejects.toThrow();
    await expect(invalidUserOver.save()).rejects.toThrow();
  });
});
