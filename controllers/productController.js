const productService = require('../services/productService');

const productController = {
  // req1
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

  // req2
  addProduct: async (request, response) => {
    const { name } = request.body;
    const { code, message, product } = await productService.addProduct({ name });

    if (message) return response.status(code).json({ message });

    response.status(code).json(product);
  },
  // req10
  updateProduct: async (request, response) => {
    const { id } = request.params;
    const { name } = request.body;
    const { code, message } = await productService.updateProduct({ id, name });

    if (message) return response.status(code).json({ message });

    response.status(code).json({ id, name });
  },

  // req12
  delete: async (request, response) => {
    const { id } = request.params;
    const { code, message } = await productService.delete(id);
    
    if (message) return response.status(code).json({ message });
    
    response.status(code).end();
  },
};

module.exports = productController;
