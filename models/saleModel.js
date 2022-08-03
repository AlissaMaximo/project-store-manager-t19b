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
  // req8
  getAll: async () => {
    const query = `SELECT sp.sale_id, sp.product_id, sp.quantity, s.date
      FROM StoreManager.sales_products AS sp
      INNER JOIN StoreManager.sales AS s
      ON s.id = sp.sale_id
      ORDER BY sp.sale_id, sp.product_id;`;
    const [sales] = await connection.execute(query);

    return sales;
  },
  findById: async (id) => {
    const query = `SELECT sp.sale_id, sp.product_id, sp.quantity, s.date
      FROM StoreManager.sales_products AS sp
      INNER JOIN StoreManager.sales AS s
      ON s.id = sp.sale_id
      WHERE sp.sale_id = ?
      ORDER BY sp.sale_id, sp.product_id;`;
    const [sales] = await connection.execute(query, [id]);

    return sales;
  },

  // req12
  delete: async (id) => {
    const query = `DELETE FROM StoreManager.sales
      WHERE id = ?;`;
    
    await connection.execute(query, [id]);
    
    return true;
  },
};

module.exports = saleModel;
