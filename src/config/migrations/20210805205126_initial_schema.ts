import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTableIfNotExists('products', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.string('code');
      table.double('price').unsigned();
    })
    .createTableIfNotExists('discounts', (table) => {
      table.increments('id').primary();
      table.integer('minProducts').unsigned();
      table.double('value').unsigned();
      table.double('productsQuantity').unsigned();
      table.string('type');
      table
        .integer('productId')
        .unsigned()
        .references('id')
        .inTable('products');
    })
    .createTableIfNotExists('baskets', (table) => {
      table.increments('id').primary();
      table.double('totalPrice').unsigned();
      table.date('creationDate');
    })
    .createTableIfNotExists('baskets_products', (table) => {
      table.increments('id').primary();
      table
        .integer('productId')
        .unsigned()
        .references('id')
        .inTable('products');
      table.integer('basketId').unsigned().references('id').inTable('baskets');
      table.integer('productQuantity').unsigned();
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists('products')
    .dropTableIfExists('discounts')
    .dropTableIfExists('baskets');
}
