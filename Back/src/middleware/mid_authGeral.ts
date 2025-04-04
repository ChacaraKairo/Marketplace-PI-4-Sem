import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

const JWT_SECRET =
  process.env.JWT_SECRET || 'sua-chave-secreta';

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

    (req as any).user = decoded;

    next();
  } catch (err) {
    return res
      .status(401)
      .json({ error: 'Token inválido ou expirado' });
  }
};
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
