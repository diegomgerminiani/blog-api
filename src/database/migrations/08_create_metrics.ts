import Knex from "knex";

export async function up(knex: Knex){
    return knex.schema.createTable('metrics', table =>{
        table.increments('id').primary();
        table.timestamp('access_at')
            .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
            .notNullable();
    })
}

export async function down(knex: Knex){
    return knex.schema.dropTable('metrics');
}