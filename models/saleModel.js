// req6
const connection = require('./connection');

const saleModel = {
  addSale: async () => {
    const query = 'INSERT INTO StoreManager.sales (date) VALUES (NOW());';
    const [{ insertId }] = await connection.execute(query);

    return insertId;
  },
  soldProducts: async ({ saleId, productId, quantity }) => {
    const query = `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
      VALUES (?, ?, ?);`;

    await connection.execute(query, [saleId, productId, quantity]);

    return { productId, quantity };
  },
};

module.exports = saleModel;
