// req6
const saleService = require('../services/saleService');

const saleController = {
  addSale: async (request, response) => {
    const { body } = request;
    const { code, message, sold } = await saleService.addSale(body);

    if (message) return response.status(code).json({ message });

    response.status(code).json(sold);
  },
};

module.exports = saleController;
