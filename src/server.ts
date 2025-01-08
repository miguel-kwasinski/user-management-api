import express, { Application } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes'; // Importando as rotas de usuário

dotenv.config();

const app: Application = express();

// Middleware para lidar com requisições JSON
app.use(express.json());

// Conectando ao MongoDB
mongoose.connect(process.env.MONGO_URI as string)
.then(() => console.log('Conectado ao MongoDB'))
.catch((error) => console.error('Erro ao conectar ao MongoDB:', error));

// Usando as rotas de usuário
app.use('/api/users', userRoutes);

// Definindo a porta do servidor
const PORT: number = Number(process.env.PORT) || 5000;

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
