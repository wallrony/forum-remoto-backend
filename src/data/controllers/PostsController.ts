import { Request, Response } from 'express';
import { verifyMandatoryFields } from '../../core/utils/RequestUtils';
import connection from '../database/connection';

const mandatoryFields = [
  'title', 'description', 'content'
];

export default {
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
        'message': `${emptyFields.join(', ')} are empty`
      });
    }

    try {
      const result = await connection('posts')
        .insert({
          ...request.body,
          user_id: userId
        })
        .returning('id');

      if(result) {
        return response.status(201).send();
      }
      else {
        return response.status(400).send();
      }
    } catch {
      return response.status(500).send();
    }
  },
  async index(request: Request, response: Response) {
    try {
      const result = await connection('posts')
        .column('posts.id', { author_id: 'users.id' }, { author: 'users.name' }, 'title', 'description')
        .select()
        .join('users', 'users.id', '=', 'posts.user_id');

      if(result) {
        return response.status(200).json(result);
      }
      else {
        return response.status(400).send();
      }
    } catch (error) {
      console.log(error)
      return response.status(500).send();
    }
  },
  async userIndex(request: Request, response: Response) {
    const userId = request.params['user_id'];

    if(!userId) {
      return response.status(400).json({
        message: 'need user_id param'
      })
    }

    try {
      const result = await connection('posts')
        .select('title', 'description')
        .where('user_id', '=', userId);

      if(result) {
        return response.status(200).json(result);
      }
      else {
        return response.status(400).send();
      }
    } catch {
      return response.status(500).send();
    }
  },
  async show(request: Request, response: Response) {
    const userId = request.params['user_id'];
    const postId = request.params['post_id'];

    if(!userId) {
      return response.status(400).json({
        message: 'need user_id param'
      });
    }

    if(!postId) {
      return response.status(400).json({
        message: 'need post_id param'
      });
    }

    try {
      const result = await connection('posts')
        .select('*')
        .where('id', '=', postId)
        .andWhere('user_id', '=', userId)
        .first();

      if(result) {
        return response.status(200).json(result);
      }
      else {
        return response.status(400).send();
      }
    } catch {
      return response.status(500).send();
    }
  },
  async update(request: Request, response: Response) {
    const userId = request.params['user_id'];
    const postId = request.params['post_id'];

    if(!userId) {
      return response.status(400).json({
        message: 'need user_id param'
      });
    }

    if(!postId) {
      return response.status(400).json({
        message: 'need post_id param'
      });
    }

    const emptyFields = verifyMandatoryFields(request.body, mandatoryFields);

    if(emptyFields.length) {
      return response.status(400).json({
        'message': `${emptyFields.join(', ')} are empty`
      });
    }

    try {
      const result = await connection('posts')
        .update(request.body)
        .where('id', '=', postId)
        .andWhere('user_id', '=', userId);

      if(result) {
        return response.status(200).send();
      }
      else {
        return response.status(400).send();
      }
    } catch {
      return response.status(500).send();
    }
  },
  async delete(request: Request, response: Response) {
    const userId = request.params['user_id'];
    const postId = request.params['post_id'];

    if(!userId) {
      return response.status(400).json({
        message: 'need user_id param'
      });
    }

    if(!postId) {
      return response.status(400).json({
        message: 'need post_id param'
      });
    }

    try {
      const result = await connection('posts')
        .delete()
        .where('id', '=', postId)
        .andWhere('user_id', '=', userId);
      
      if(result) {
        return response.status(204).send();
      }
      else {
        return response.status(404).send();
      }
    } catch {
      return response.status(500).send();
    }
  },
}