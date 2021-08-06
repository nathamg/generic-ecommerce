import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('baskets_items').del();
  await knex('baskets').del();
  await knex('discounts').del();
  await knex('items').del();

  await knex('items').insert([
    { id: 1, code: 'PEN', name: 'Pen', price: 5 },
    { id: 2, code: 'TSHIRT', name: 'T-shirt', price: 20 },
    { id: 3, code: 'MUG', name: 'Coffee Mug', price: 7.5 },
  ]);

  await knex('discounts').insert([
    {
      id: 1,
      minItems: 2,
      value: 1,
      type: 'ONLY_MIN_QUANTITY',
      itemId: 1,
    },
    {
      id: 2,
      minItems: 3,
      value: 0.25,
      type: 'FROM_MIN_QUANTITY',
      itemId: 2,
    },
  ]);

  await knex('baskets').insert([
    { id: 1, creationDate: '2021-08-06', totalPrice: 0 },
    { id: 2, creationDate: '2021-08-06', totalPrice: 0 },
    { id: 3, creationDate: '2021-08-06', totalPrice: 0 },
    { id: 4, creationDate: '2021-08-06', totalPrice: 0 },
  ]);

  await knex('baskets_items').insert([
    { id: '1', itemId: '1', basketId: '1', itemsQuantity: 1 },
    { id: '2', itemId: '2', basketId: '1', itemsQuantity: 1 },
    { id: '3', itemId: '3', basketId: '1', itemsQuantity: 1 },
    { id: '4', itemId: '1', basketId: '2', itemsQuantity: 2 },
    { id: '5', itemId: '2', basketId: '2', itemsQuantity: 1 },
    { id: '6', itemId: '1', basketId: '3', itemsQuantity: 1 },
    { id: '7', itemId: '2', basketId: '3', itemsQuantity: 4 },
    { id: '8', itemId: '1', basketId: '4', itemsQuantity: 3 },
    { id: '9', itemId: '2', basketId: '4', itemsQuantity: 3 },
    { id: '10', itemId: '3', basketId: '4', itemsQuantity: 1 },
  ]);
}
