"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes")); // Importando as rotas de usuário
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware para lidar com requisições JSON
app.use(express_1.default.json());
// Conectando ao MongoDB
mongoose_1.default.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado ao MongoDB'))
    .catch((error) => console.error('Erro ao conectar ao MongoDB:', error));
// Usando as rotas de usuário
app.use('/api/users', userRoutes_1.default);
// Definindo a porta do servidor
const PORT = Number(process.env.PORT) || 5000;
// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
