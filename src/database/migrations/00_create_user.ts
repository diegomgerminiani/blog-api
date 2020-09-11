import Knex from "knex";

export async function up(knex: Knex){
    return knex.schema.createTable('user', table =>{
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('password').notNullable();
        table.string('token').notNullable();
    })
}

export async function down(knex: Knex){
    return knex.schema.dropTable('user');
}