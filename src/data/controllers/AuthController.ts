import { Request, Response, NextFunction } from 'express';
import { encriptPass } from '../../core/utils/CryptoUtils';
import { haveUserIdInPath } from '../../core/utils/RequestUtils';
import { createToken, verifyToken } from '../../core/utils/TokenUtils';

import connection from '../database/connection';

export default {
  async treatAuthorization(request: Request, response: Response, next: NextFunction) {
    const freePaths: string[] = [
      '/api/accounts/login',
      '/api/accounts/users/register'
    ];

    console.log(request.path)

    if(freePaths.includes(request.path)) {
      return next();
    }

    if(request.headers['authorization']) {
      const token = request.headers['authorization'].replace(
        'Token ', ''
      );

      const userId = verifyToken(token);
      const pathUserId = haveUserIdInPath(request.path);

      console.log('userId', userId)
      
      if(userId < 1) {
        let message: string;

        if(userId === -1) message = 'expired token';
        else message = 'invalid token';

        return response.status(401).json({ message });
      }
      else if(pathUserId !== 0 && userId !== pathUserId) {
        return response.status(403).send();
      }

      return next();
    }

    return response.status(401).send();
  },
  async login(request: Request, response: Response) {
    const { email, password } = request.body;

    if(!email.length || !password.length) {
      return response.status(400).send();
    }

    try {
      const result = await connection('users')
        .select('id')
        .where('email', '=', email)
        .andWhere('password', '=', encriptPass(password))
        .first();

      if(result['id']) {
        return response.status(200).json({
          token: createToken(result['id'])
        });
      }
    } catch {
      return response.status(500).send();
    }

    return response.status(400).send();
  },
}