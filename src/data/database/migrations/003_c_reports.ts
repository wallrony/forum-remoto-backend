import Knex from 'knex';

export async function up(knex: Knex) {
  return await knex.schema.createTable('reports', table => {
    table.increments('id').primary();
    table.string('type').notNullable();
    table.string('title').notNullable();
    table.text('report').notNullable();

    table.integer('user_id').notNullable();

    table.foreign('user_id').references('id').inTable('users');

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable('reports');
}