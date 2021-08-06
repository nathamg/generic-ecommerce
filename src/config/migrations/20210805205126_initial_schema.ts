import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('items', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.string('code');
      table.double('price').unsigned();
    })
    .createTable('discounts', (table) => {
      table.increments('id').primary();
      table.integer('minItems').unsigned();
      table.double('value').unsigned();
      table.string('type');
      table.integer('itemId').unsigned().references('id').inTable('items');
    })
    .createTable('baskets', (table) => {
      table.increments('id').primary();
      table.double('totalPrice').unsigned();
      table.date('creationDate');
    })
    .createTable('baskets_items', (table) => {
      table.increments('id').primary();
      table.integer('itemId').unsigned().references('id').inTable('items');
      table.integer('basketId').unsigned().references('id').inTable('baskets');
      table.integer('itemsQuantity').unsigned();
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists('baskets_items')
    .dropTableIfExists('discounts')
    .dropTableIfExists('items')
    .dropTableIfExists('baskets');
}
