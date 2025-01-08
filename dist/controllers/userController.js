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
exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userModel_1 = __importDefault(require("../models/userModel")); // Importando o modelo de usuário
// Função para registrar um novo usuário
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        // Verificando se o usuário já existe
        const existingUser = yield userModel_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'Usuário já existe' });
            return;
        }
        // Criptografando a senha do usuário
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        // Criando um novo usuário
        const newUser = new userModel_1.default({
            name,
            email,
            password: hashedPassword,
        });
        // Salvando o novo usuário no banco de dados
        yield newUser.save();
        // Respondendo com sucesso
        res.status(201).json({ message: 'Usuário registrado com sucesso' });
    }
    catch (error) {
        res.status(500).json({ message: 'Erro no servidor', error });
    }
});
exports.registerUser = registerUser;
