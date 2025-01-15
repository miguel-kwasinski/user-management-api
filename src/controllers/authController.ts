import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

// Função para login de usuário
const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Verificando se o usuário existe
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: 'Usuário não encontrado' });
      return;
    }

    // Comparando a senha fornecida com a senha armazenada
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: 'Senha inválida' });
      return;
    }

    // Gerando o token JWT
    const token = jwt.sign(
      { userId: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' } // O token vai expirar em 1 hora
    );

    // Respondendo com o token
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error });
  }
};

export { loginUser };
