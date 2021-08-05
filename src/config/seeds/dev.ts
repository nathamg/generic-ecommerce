import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('products').del();
  await knex('products').insert([
    { id: 1, code: 'PEN', name: 'Pen', price: 5 },
    { id: 2, code: 'TSHIRT', name: 'T-shirt', price: 20 },
    { id: 3, code: 'MUG', name: 'Coffee Mug', price: 7.5 },
  ]);

  /*await knex('discounts').del();
  await knex('discounts').insert([
    {
      id: 1,
      min_item_quantity: 2,
      value: 1,
      type: 'ONLY_MIN_QUANTITY',
    },
    {
      id: 2,
      min_item_quantity: 3,
      value: 0.25,
      type: 'FROM_MIN_QUANTITY',
    },
  ]);*/
}
