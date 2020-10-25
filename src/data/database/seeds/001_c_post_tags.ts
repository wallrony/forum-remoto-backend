import Knex from 'knex';
import PostTag from '../../../core/models/PostTag';

export async function seed(knex: Knex) {
  const tags: PostTag[] = [
    {
      name: 'Javascript',
    },
    {
      name: 'Typescript'
    },
    {
      name: 'C'
    },
    {
      name: 'Java'
    },
    {
      name: 'Dart'
    },
    {
      name: 'Python'
    },
    {
      name: 'C#'
    },
    {
      name: 'PHP'
    },
    {
      name: 'NodeJS'
    },
    {
      name: 'ReactJS'
    },
    {
      name: 'Next.JS'
    },
    {
      name: 'Composer'
    },
    {
      name: 'Laravel'
    },
    {
      name: 'Django'
    },
    {
      name: 'Criptografia'
    },
    {
      name: 'Autenticação'
    },
    {
      name: 'Spring'
    },
  ];

  return await knex('post_tags').insert(tags);
}