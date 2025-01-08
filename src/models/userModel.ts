import mongoose, { Document, Schema } from 'mongoose';

// Definindo a interface do usuário para o TypeScript
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

// Criando o esquema do modelo de usuário
const userSchema: Schema<IUser> = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Criando o modelo com base no esquema
const User = mongoose.model<IUser>('User', userSchema);

export default User;
