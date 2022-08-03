const productModel = require('../models/productModel');

const productService = {
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
};

module.exports = productService;