import Knex from 'knex';
import User from '../../../core/models/User';

export async function seed(knex: Knex) {
  const users: User[] = [
    {
      name: 'Administrador',
      email: 'admin@admin.com',
      birthday: '01-01-1950',
      password: 'e7a4111800cdcea6761fba2e89305517',
      sex: 1,
      is_admin: true,
    }
  ];

  return await knex('users').insert(users);
}