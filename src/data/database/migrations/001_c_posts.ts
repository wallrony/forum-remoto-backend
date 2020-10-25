import Knex from 'knex';

export async function up(knex: Knex) {
  return await knex.schema.createTable('posts', table => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.text('description').notNullable();
    table.text('content').notNullable();
    table.integer('applause').defaultTo(0);
    table.timestamps(true, true);

    table.integer('user_id').notNullable();

    table.foreign('user_id')
      .references('id')
      .inTable('users');
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable('posts');
}