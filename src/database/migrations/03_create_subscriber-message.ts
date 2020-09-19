import Knex from "knex";

export async function up(knex: Knex){
    return knex.schema
        .createTable('subscriber', table =>{
            table.increments('id').primary();
            table.string('name').notNullable();
            table.string('email').notNullable();
            table.string('phone').notNullable();
            table.boolean('is_receiver').notNullable();
        })
        .createTable('message', table =>{
            table.increments('id').primary();
            table.string('subject').notNullable();
            table.string('text').notNullable();
            table.integer('subscriber_id').unsigned();
    
            //Relacionamentos
            table.foreign('subscriber_id')
                .references('id')
                .inTable('subscriber')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
        })
    
}

export async function down(knex: Knex){
    return knex.schema
        .dropTable('message')
        .dropTable('subscriber')
}