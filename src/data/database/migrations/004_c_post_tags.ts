import Knex from 'knex';

export async function up(knex: Knex) {
  return await knex.schema.createTable('post_tags', table => {
    table.increments('id').primary();
    table.string('name').notNullable();

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable('post_tags');
}