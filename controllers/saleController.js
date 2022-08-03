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
    const { code, message, sales } = await saleService.getAll();

    if (message) return response.status(code).json({ message });

    response.status(code).json(sales);
  },
  findById: async (request, response) => {
    const { id } = request.params;
    const { code, message, sale } = await saleService.findById(id);

    if (message) return response.status(code).json({ message });

    response.status(code).json(sale);
  },
};

module.exports = saleController;
