# Generic E-Commerce

Basic project containing a REST API implemented in Node.js for an E-Commerce offering products with different discounts.

## Requirements

- Node.js
- PostgresDB

## Run locally

Please use `.env.example` as a guide to create a `.env` file and fill it with the details of your database connection.

```bash
npm install
npm run build
npm start
```

The project includes migrations and seeds using `knex` so you can populate your database and start testing the service right away.

```bash
npm run migrate
npm run populate:db
```

## Endpoints

- Create new basket:

```
POST /baskets
```

- Delete basket:

```
DELETE /baskets/{basketId}
```

- Add product to the basket

```
POST /baskets/{basketId}/products

{'itemId': 'string', 'itemsQuantity': 'number'}
```

- Get total price of basket

```
GET /baskets/{basketId}/checkout
```
