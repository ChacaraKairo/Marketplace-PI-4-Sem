import ServiceAuth from '../service/Service_Auth';

class ControllerAuth {
  static async login(req: any, res: any) {
    try {
      const data = req.body;
      const token = await ServiceAuth.login(data);
      res.status(200).json({ token });
    } catch (error) {
      console.error('Erro ao fazer login', error);
      res
        .status(500)
        .json({ error: 'Usuário ou senha incorretos' });
    }
  }
}
export default ControllerAuth;
