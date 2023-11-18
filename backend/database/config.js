import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

//Para trabajo local 
const localMongoURI = process.env.LOCAL_MONGO_URI; // Obtener la URL de conexión para desarrollo local desde las variables de entorno
//Para trabajo en Prod
const prodMongoURI = process.env.PROD_MONGO_URI; // Obtener la URL de conexión para producción desde las variables de entorno

export const connectDB = async () => {
  try {
    let mongoURI = localMongoURI; // Configuración inicial para desarrollo local

    // Cambiar a la URL de producción si se está ejecutando en un entorno de producción
    if (process.env.NODE_ENV === 'production') {
      mongoURI = prodMongoURI;
    }

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Conexión exitosa a MongoDB');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error.message);
    process.exit(1);
  }
};

