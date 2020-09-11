import Knex from "knex";

export async function up(knex: Knex){
    return knex.schema.createTable('message', table =>{
        table.increments('id').primary();
        table.string('subject').notNullable();
        table.string('text').notNullable();

        //Relacionamentos
        table.integer('subscriber_id')
            .notNullable()
            .references('id')
            .inTable('subscriber')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
    })
}

export async function down(knex: Knex){
    return knex.schema.dropTable('message');
}