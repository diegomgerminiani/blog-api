import Knex from "knex";

export async function up(knex: Knex){
    return knex.schema.createTable('informations', table =>{
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('street').notNullable();
        table.string('complement').notNullable();
        table.string('number').notNullable();
        table.string('neighborhood').notNullable();
        table.string('cep').notNullable();
        table.string('city_uf').notNullable();
        table.string('phone').notNullable();
        table.string('email').notNullable();
        table.string('embedlink').notNullable();
    })
}

export async function down(knex: Knex){
    return knex.schema.dropTable('informations');
}