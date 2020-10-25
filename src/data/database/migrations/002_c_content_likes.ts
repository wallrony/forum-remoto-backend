import Knex from 'knex';

export async function up(knex: Knex) {
  return await knex.schema.createTable('content_likes', table => {
    table.increments('id').primary();
    table.string('like-list').notNullable();
    table.timestamps(true, true);

    table.integer('user_id').notNullable();

    table.foreign('user_id')
      .references('id')
      .inTable('users');
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable('content_likes');
}