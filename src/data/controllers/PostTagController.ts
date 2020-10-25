import { Request, Response } from 'express';
import connection from '../database/connection';

export default {
  async index(request: Request, response: Response) {
    const userId = request.params['user_id'];

    if(!userId) {
      return response.status(400).json({
        message: 'need user_id param'
      });
    }

    try {
      const result = await connection('post_tags').select('*');

      return response.status(200).json(result);
    }
    catch {
      return response.status(500).send();
    }
  },
}