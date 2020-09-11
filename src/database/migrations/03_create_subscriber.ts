import Knex from "knex";

export async function up(knex: Knex){
    return knex.schema.createTable('subscriber', table =>{
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('phone').notNullable();
        table.boolean('is_receiver').notNullable();
    })
}

export async function down(knex: Knex){
    return knex.schema.dropTable('subscriber');
}