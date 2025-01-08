"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController"); // Importando o controlador de usuários
const router = express_1.default.Router();
// Definindo a rota de registro de usuário
router.post('/register', userController_1.registerUser);
exports.default = router;
