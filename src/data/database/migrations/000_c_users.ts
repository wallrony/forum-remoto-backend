import Knex from 'knex';

export async function up(knex: Knex) {
  return await knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('email').notNullable();
    table.string('name').notNullable();
    table.string('password').notNullable();
    table.string('birthday').notNullable();
    table.integer('sex').notNullable();
    table.boolean('is_active').defaultTo(true);
    table.boolean('is_admin').defaultTo(false);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable('users');
}