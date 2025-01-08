import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import User from '../models/userModel';

// Função para registrar um novo usuário
const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // Verificando se o usuário já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'Usuário já existe' });
      return;
    }

    // Criptografando a senha do usuário
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criando um novo usuário
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Salvando o novo usuário no banco de dados
    await newUser.save();

    // Respondendo com sucesso
    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error });
  }
};

// Função de login
const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Verificando se o usuário existe
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: 'Usuário não encontrado' });
      return;
    }

    // Verificando a senha
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: 'Senha inválida' });
      return;
    }

    // Login bem-sucedido
    res.status(200).json({ message: 'Login bem-sucedido' });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error });
  }
};

export { registerUser, loginUser };
