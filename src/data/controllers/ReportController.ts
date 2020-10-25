import { Request, Response } from 'express';
import { verifyMandatoryFields } from '../../core/utils/RequestUtils';
import connection from '../database/connection';

const mandatoryFields = [
  'type', 'title', 'report'
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
      const userResult = await connection('users')
        .select('is_admin')
        .where('id', '=', userId)
        .first();

      if(userResult['is_admin']) {
        const reportResult = await connection('reports')
          .select('*');
        
        if(reportResult) {
          return response.status(200).json(reportResult);
        }
        else {
          return response.status(400).send();
        }
      }
      else {
        return response.status(403).send();
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
      const result = await connection('reports').insert({
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
  async delete(request: Request, response: Response) {
    const userId = request.params['user_id'];
    const reportId = request.params['report_id'];

    if(!userId) {
      return response.status(400).json({
        message: 'need user_id param'
      });
    }

    if(!reportId) {
      return response.status(400).json({
        message: 'need user_id param'
      });
    }

    try {
      const userResult = await connection('users')
        .select('is_admin')
        .where('id', '=', userId)
        .first();

      if(userResult) {
        const result = await connection('reports').delete().where('id', '=', reportId);

        if(result) {
          return response.status(204).send();
        }
        else {
          return response.status(400).send();
        }
      }
      else {
        return response.status(403).send();
      }
    }
    catch {
      return response.status(500).send();
    }
  },
}