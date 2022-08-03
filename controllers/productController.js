const productService = require('../services/productService');

const productController = {
  getAll: async (_request, response) => {
    const { code, products } = await productService.getAll();

    response.status(code).json(products);
  },
  findById: async (request, response) => {
    const { id } = request.params;
    const { code, message, product } = await productService.findById(id);

    if (message) return response.status(code).json({ message });

    response.status(code).json(product);
  },
};

module.exports = productController;
