const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(express.json());

// Conexión a base de datos (opcional, para desarrollo)
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/testdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Conexión a MongoDB establecida');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1);
  }
};

// Rutas
app.use('/users', userRoutes);

// Solo conectar si no estamos en un entorno de pruebas
if (process.env.NODE_ENV !== 'test') {
  connectDB();
}

module.exports = app;
