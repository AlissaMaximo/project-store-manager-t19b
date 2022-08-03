const connection = require('./connection');

const productModel = {
  // req1
  getAll: async () => {
    const query = 'SELECT * FROM StoreManager.products';
    const [products] = await connection.execute(query);

    return products;
  },
  findById: async (id) => {
    const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
    const [product] = await connection.execute(query, [id]);

    return product;
  },

  // req2
  addProduct: async ({ name }) => {
    const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';
    const [{ insertId }] = await connection.execute(query, [name]);

    return { id: insertId };
  },

  // req10
  updateProduct: async ({ id, name }) => {
    const query = `UPDATE StoreManager.products
      SET name = ?
      WHERE id = ?`;
    
    await connection.execute(query, [name, id]);
    
    return true;
  },
};

module.exports = productModel;
