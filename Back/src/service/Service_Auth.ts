import { PrismaClient } from '@prisma/client';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

const prisma = new PrismaClient();

const JWT_SECRET =
  process.env.JWT_SECRET || 'sua-chave-secreta'; // Sempre prefira usar .env

export class ServiceAuth {
  static async login(data: {
    email: string;
    senha: string;
  }) {
    const user = await prisma.usuarios.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const issenhaValid = await compare(
      data.senha,
      user.senha,
    );

    if (!issenhaValid) {
      throw new Error('Senha inválida');
    }

    // Gera o token JWT com dados úteis (como id e tipo de usuário)
    const token = sign(
      {
        id: user.id,
        email: user.email,
        tipo: user.tipo,
      },
      JWT_SECRET,
      {
        expiresIn: '1h',
      },
    );

    // Retorna token e dados úteis do usuário (sem a senha)
    return {
      token,
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        tipo: user.tipo,
      },
    };
  }
}
export default ServiceAuth;
