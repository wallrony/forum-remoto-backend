import { Request, Response } from 'express';
import { verifyMandatoryFields } from '../../core/utils/RequestUtils';
import connection from '../database/connection';

const mandatoryFields = [
  'like-list'
];

export default {
  async index(request: Request, response: Response) {
    const userId = request.params['user_id'];

    if(!userId) {
      return response.status(400).json({
        message: 'need user_id param'
      });
    }

    try {
      const result = await connection('content_likes')
        .select('*')
        .where('user_id', '=', userId)
        .first();

      if(result) {
        return response.status(200).json(result);
      }
      else {
        return response.status(400).send();
      }
    }
    catch {
      return response.status(500).send();
    }
  },
  async add(request: Request, response: Response) {
    const userId = request.params['user_id'];

    if(!userId) {
      return response.status(400).json({
        message: 'need user_id param'
      });
    }

    const emptyFields = verifyMandatoryFields(request.body, mandatoryFields);

    if(emptyFields.length) {
      return response.status(400).json({
        message: `${emptyFields.join(', ')} are empty`
      });
    }

    try {
      const result = await connection('content_likes')
        .insert({
          ...request.body,
          user_id: userId
        });

      if(result) {
        return response.status(201).send();
      }
      else {
        return response.status(400).send();
      }
    }
    catch {
      return response.status(500).send();
    }
  },
  async update(request: Request, response: Response) {
    const userId = request.params['user_id'];

    if(!userId) {
      return response.status(400).json({
        message: 'need user_id param'
      });
    }

    const emptyFields = verifyMandatoryFields(request.body, mandatoryFields);

    if(emptyFields.length) {
      return response.status(400).json({
        message: `${emptyFields.join(', ')} are empty`
      });
    }

    try {
      const result = await connection('content_likes')
        .update({
          ...request.body,
          user_id: userId
        }).where('user_id', '=', userId);

      if(result) {
        return response.status(201).send();
      }
      else {
        return response.status(400).send();
      }
    }
    catch {
      return response.status(500).send();
    }
  },
}