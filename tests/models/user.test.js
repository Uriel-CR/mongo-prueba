const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const User = require('../../src/models/User');

let mongoServer;

beforeAll(async () => {
  try {
    mongoServer = await MongoMemoryServer.create({
      // Configuraciones adicionales para mayor estabilidad
      binary: {
        version: '6.0.4' // Versión específica de MongoDB
      }
    });
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri, { 
      useNewUrlParser: true,
      useUnifiedTopology: true 
    });
  } catch (error) {
    console.error('Error al iniciar MongoDB Memory Server:', error);
    throw error;
  }
});

afterAll(async () => {
  try {
    if (mongoServer) {
      await mongoose.disconnect();
      await mongoServer.stop();
    }
  } catch (error) {
    console.error('Error al detener MongoDB Memory Server:', error);
  }
});

describe('User Model Test', () => {
  // Tus pruebas existentes
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

  // Resto de tus pruebas...
});
