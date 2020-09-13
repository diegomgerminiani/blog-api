import Knex from "knex";

export async function up(knex: Knex){
    return knex('informations').insert({
        id: 1,
        name: 'Clínica Psiquê e Saúde',
        street: 'Endereço Rua Costa Pereira',
        complement: '4º andar Edifício ACIL',
        number: '45 sala 401',
        neighborhood: 'Vila Brasília',
        cep: '37000-000',
        city_uf: 'Lavras - MG',
        phone: '35 98822-1038',
        email: 'lidianegouveiapsiclinica@yahoo.com',
        embedlink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3718.7632870867596!2d-44.99719164934425!3d-21.241233287197133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9ffdc7a3f8259b%3A0xb6649b77db4f1b0c!2sPsicologa%20Lidiane%20Gouveia%20Garcia!5e0!3m2!1spt-BR!2sbr!4v1598467773581!5m2!1spt-BR!2sbr'
    })
}

export async function down(knex: Knex){
    return knex('informations').where('id', 1).delete();
}
