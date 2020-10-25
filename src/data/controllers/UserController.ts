import { Request, Response } from 'express';
import { encriptPass } from "../../core/utils/CryptoUtils";
import { verifyMandatoryFields } from '../../core/utils/RequestUtils';
import { verifyToken } from '../../core/utils/TokenUtils';
import connection from '../database/connection';

const mandatoryFields = [
  'email', 'name', 'password',
  'birthday', 'sex'
];

export default {
  async add(request: Request, response: Response) {
    const emptyFields = verifyMandatoryFields(request.body, mandatoryFields);

    if(emptyFields.length) {
      return response.status(400).json({
        'message': `${emptyFields.join(', ')} are empty`
      })
    }

    let { password } = request.body;

    password = encriptPass(password);

    delete request.body['password'];

    try {
      const result = await connection('users').insert({
        ...request.body,
        password,
        is_active: true
      }).returning('id').first();
      
      if(result['id']) {
        return response.status(201).send();
      }
      else {
        return response.status(500).send();
      }
    }
    catch {
      return response.status(500).send();
    }
  },
  async show(request: Request, response: Response) {
    const token = request.headers['authorization']?.replace('Token ', '');

    const userId = verifyToken(token ?? '');

    if(!userId) {
      return response.status(400).json({
        message: 'invalid token'
      });
    }

    try {
      const result = await connection('users')
        .select('*')
        .where('id', '=', userId)
        .first();

      if(result) {
        delete result['password'];

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
  async update(request: Request, response: Response) {
    const userId = request.params['user_id'];

    if(!userId) {
      return response.status(400).json({
        'message': 'need user_id param'
      });
    }

    const emptyFields = verifyMandatoryFields(request.body, mandatoryFields);

    if(emptyFields.length === mandatoryFields.length) {
      return response.status(400).send();
    }

    let { password } = request.body;

    if(password) {
      password = encriptPass(password);

      delete request.body['password'];
    }

    try {
      const result = await connection('users').update({
        ...request.body,
        password
      }).where('id', '=', userId).first();

      console.log(result)

      if(result) {
        return response.status(200).send();
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

    if(!userId) {
      return response.status(400).json({
        'message': 'need user_id param'
      });
    }

    try {
      const result = await connection('users').update({
        is_active: false
      }).where('id', '=', userId);

      if(result) {
        return response.status(200).send();
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