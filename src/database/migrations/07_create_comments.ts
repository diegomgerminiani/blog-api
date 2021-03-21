import Knex from "knex";

export async function up(knex: Knex){
    return knex.schema.createTable('comments', table =>{
        table.increments('id').primary();
        table.string('subject').notNullable();
        table.string('comment').notNullable();
        table.integer('likes').unsigned().defaultTo(0);
        table.timestamp('created_at')
            .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
            .notNullable();
        table.integer('subscriber_id').unsigned();
        table.integer('post_id').unsigned();

        //Relacionamentos
        table.foreign('subscriber_id')
            .references('id')
            .inTable('subscriber')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        table.foreign('post_id')
            .references('id')
            .inTable('posts')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
    })
}

export async function down(knex: Knex){
    return knex.schema.dropTable('comments');
}