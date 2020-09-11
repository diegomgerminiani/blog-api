import Knex from "knex";
import bcrypt from 'bcryptjs';

export async function up(knex: Knex){
    return knex('user').insert({
        id: 1,
        name: 'admin',
        password: bcrypt.hashSync('admin'),
        token: 'asdasd'
    })
}

export async function down(knex: Knex){
    return knex('user').where('id', 1).delete();
}