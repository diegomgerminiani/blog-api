import Knex from "knex";

export async function up(knex: Knex){
    return knex.schema.createTable('posts', table =>{
        table.increments('id').primary();
        table.string('title').notNullable();
        table.string('subtitle').notNullable();
        table.string('text').notNullable();
        table.integer('likes').nullable().defaultTo(0);
        table.string('img').notNullable();
        table.boolean('is_highlight').notNullable();
        table.boolean('is_activated').notNullable();

        table.timestamp('created_at')
            .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
            .notNullable();
    })
}

export async function down(knex: Knex){
    return knex.schema.dropTable('posts');
}