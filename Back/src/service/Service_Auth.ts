/**
 * @author Kairo Chácara
 * @version 1.0
 * @date 07/04/2025
 * @description Serviço responsável pela autenticação de usuários, utilizando Prisma, Bcrypt e JWT.
 */

import { PrismaClient } from '@prisma/client';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

const prisma = new PrismaClient();

const JWT_SECRET =
  process.env.JWT_SECRET || 'sua-chave-secreta'; // Sempre prefira usar .env

/**
 * Classe que fornece métodos de autenticação.
 */
export class ServiceAuth {
  /**
   * Realiza o login de um usuário, verificando email e senha, e gera um token JWT.
   * @param data Objeto contendo email e senha do usuário.
   * @param data.email Email do usuário.
   * @param data.senha Senha do usuário.
   * @returns Um objeto com o token JWT e os dados do usuário autenticado (sem a senha).
   * @throws Error Se o usuário não for encontrado ou a senha estiver incorreta.
   */
  static async login(data: {
    email: string;
    senha: string;
  }) {
    // Busca o usuário no banco de dados com base no email fornecido
    const user = await prisma.usuarios.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      // Usuário não encontrado
      throw new Error('Usuário não encontrado');
    }

    // Compara a senha fornecida com o hash salvo no banco
    const issenhaValid = await compare(
      data.senha,
      user.senha,
    );

    if (!issenhaValid) {
      // Senha incorreta
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
        expiresIn: '1h', // Tempo de expiração do token
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
