const productModel = require('../models/productModel');

const productService = {
  // req1
  getAll: async () => {
    const products = await productModel.getAll();
    const sorted = products.sort((a, b) => a.id - b.id);

    return { code: 200, products: sorted };
  },
  findById: async (id) => {
    const product = await productModel.findById(id);

    if (product.length === 0) return { code: 404, message: 'Product not found' };

    return { code: 200, product: product[0] };
  },

  // req2
  addProduct: async ({ name }) => {
    if (!name) return { code: 400, message: 'The product name is required' };

    const { id } = await productModel.addProduct({ name });

    return { code: 201, product: { id, name } };
  },
};

module.exports = productService;