// req6
const saleService = require('../services/saleService');

const saleController = {
  addSale: async (request, response) => {
    const { body } = request;
    const { code, sold } = await saleService.addSale(body);

    response.status(code).json(sold);
  },
  // req8
  getAll: async (_request, response) => {
    const { code, sales } = await saleService.getAll();

    response.status(code).json(sales);
  },
  findById: async (request, response) => {
    const { id } = request.params;
    const { code, message, sale } = await saleService.findById(id);

    if (message) return response.status(code).json({ message });

    response.status(code).json(sale);
  },

  // req14
  delete: async (request, response) => {
    const { id } = request.params;
    const { code, message } = await saleService.delete(id);
    
    if (message) return response.status(code).json({ message });
    
    response.status(code).end();
  },
};

module.exports = saleController;
