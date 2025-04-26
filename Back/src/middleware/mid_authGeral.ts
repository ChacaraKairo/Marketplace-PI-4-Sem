import { RequestHandler } from 'express';
import { verify } from 'jsonwebtoken';

const JWT_SECRET =
  process.env.JWT_SECRET || 'sua-chave-secreta';

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

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verify(token, JWT_SECRET) as any;
    (req as any).user = decoded;
    next();
  } catch (err) {
    res
      .status(401)
      .json({ error: 'Token inválido ou expirado' });
    return;
  }
};

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
