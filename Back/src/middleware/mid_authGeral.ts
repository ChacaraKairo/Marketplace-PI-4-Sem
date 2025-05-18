/**
 * @file authMiddleware.ts
 * @author Kairo Chácara
 * @version 1.0
 * @date 18/05/2025
 * @description Middleware de autenticação e autorização usando JWT para rotas protegidas por tipo de usuário (comprador ou vendedor).
 */

import { RequestHandler } from 'express';
import { verify } from 'jsonwebtoken';

// Chave secreta usada para verificar o token JWT
const JWT_SECRET =
  process.env.JWT_SECRET || 'sua-chave-secreta';

/**
 * Middleware responsável por autenticar requisições com base no token JWT.
 *
 * - Verifica se o token está presente no cabeçalho Authorization.
 * - Valida o token utilizando a chave secreta.
 * - Se válido, adiciona os dados decodificados ao objeto `req.user`.
 * - Se inválido ou ausente, retorna erro 401.
 */
export const authMiddleware: RequestHandler = (
  req,
  res,
  next,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res
      .status(401)
      .json({ error: 'Token de autorização ausente' });
    return;
  }

  // Extrai o token do formato "Bearer <token>"
  const token = authHeader.split(' ')[1];

  try {
    const decoded = verify(token, JWT_SECRET) as any;
    // Armazena o payload decodificado no objeto de requisição
    (req as any).user = decoded;
    next();
  } catch (err) {
    res
      .status(401)
      .json({ error: 'Token inválido ou expirado' });
    return;
  }
};

/**
 * Middleware que restringe o acesso a usuários com tipo "comprador".
 *
 * - Verifica se o payload JWT contém o campo `tipo` igual a 'comprador'.
 * - Se não for, retorna erro 403 (proibido).
 */
export const compradorMiddleware: RequestHandler = (
  req,
  res,
  next,
) => {
  const user = (req as any).user;

  if (!user || user.tipo !== 'comprador') {
    res
      .status(403)
      .json({ error: 'Acesso restrito a compradores' });
    return;
  }

  next();
};

/**
 * Middleware que restringe o acesso a usuários com tipo "vendedor".
 *
 * - Verifica se o payload JWT contém o campo `tipo` igual a 'vendedor'.
 * - Se não for, retorna erro 403 (proibido).
 */
export const vendedorMiddleware: RequestHandler = (
  req,
  res,
  next,
) => {
  const user = (req as any).user;

  if (!user || user.tipo !== 'vendedor') {
    res
      .status(403)
      .json({ error: 'Acesso restrito a vendedores' });
    return;
  }

  next();
};
