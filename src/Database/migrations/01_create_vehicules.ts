import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('vehicules', table => {
        table.increments('id').primary();
        table.string('modelo').notNullable();
        table.string('marca').notNullable();
        table.string('ano').notNullable();
        table.string('combustivel').notNullable();
        table.string('motor').notNullable();
        table.string('preco').notNullable();
        table.string('descricao').notNullable();
        table.string('opcionais').notNullable();
        table.string('estilo').notNullable();
        table.string('tipo').notNullable();
        table.string('image_url').notNullable();
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
    });
}
export async function down(knex: Knex) {
    return knex.schema.dropTable('vehicules');
}