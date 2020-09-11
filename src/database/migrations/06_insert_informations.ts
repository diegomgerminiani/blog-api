import Knex from "knex";

export async function up(knex: Knex){
    return knex('informations').insert({
        id: 1,
        name: 'Clínica Psiquê e Saúde',
        street: 'Endereço Rua Costa Pereira',
        complement: '4º andar Edifício ACIL',
        number: '45 sala 401',
        neighborhood: 'Vila Brasília',
        city_uf: 'Lavras - MG',
        phone: '35 98822-1038',
        email: 'lidianegouveiapsiclinica@yahoo.com'
    })
}

export async function down(knex: Knex){
    return knex('informations').where('id', 1).delete();
}
