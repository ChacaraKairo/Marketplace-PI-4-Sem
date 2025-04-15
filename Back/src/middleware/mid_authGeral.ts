/**
 * @author Kairo Chácara
 * @version 1.0
 * @date 07/04/2025
 * @description Middleware de autenticação e autorização utilizando JWT.
 */

import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

const JWT_SECRET =
  process.env.JWT_SECRET || 'sua-chave-secreta';

/**
 * Middleware que verifica se o token JWT foi enviado e é válido.
 * Caso seja válido, adiciona os dados do usuário decodificados ao objeto da requisição.
 * @param req Objeto de requisição do Express.
 * @param res Objeto de resposta do Express.
 * @param next Função para chamar o próximo middleware.
 * @returns Retorna erro 401 caso o token esteja ausente, inválido ou expirado.
 */
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ error: 'Token de autorização ausente' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verify(token, JWT_SECRET) as any;

    // Adiciona os dados do usuário ao request para serem usados em middlewares seguintes
    (req as any).user = decoded;

    next();
  } catch (err) {
    return res
      .status(401)
      .json({ error: 'Token inválido ou expirado' });
  }
};

/**
 * Middleware que permite acesso apenas a usuários do tipo "comprador".
 * @param req Objeto de requisição do Express.
 * @param res Objeto de resposta do Express.
 * @param next Função para chamar o próximo middleware.
 * @returns Retorna erro 403 se o usuário não for do tipo "comprador".
 */
export const compradorMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = (req as any).user;

  if (!user || user.tipo !== 'comprador') {
    return res
      .status(403)
      .json({ error: 'Acesso restrito a compradores' });
  }

  next();
};

/**
 * Middleware que permite acesso apenas a usuários do tipo "vendedor".
 * @param req Objeto de requisição do Express.
 * @param res Objeto de resposta do Express.
 * @param next Função para chamar o próximo middleware.
 * @returns Retorna erro 403 se o usuário não for do tipo "vendedor".
 */
export const vendedorMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = (req as any).user;

  if (!user || user.tipo !== 'vendedor') {
    return res
      .status(403)
      .json({ error: 'Acesso restrito a vendedores' });
  }

  next();
};

export default authMiddleware;
