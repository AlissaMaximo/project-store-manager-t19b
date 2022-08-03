// req6
const saleService = require('../services/saleService');

const saleController = {
  addSale: async (request, response) => {
    const { body } = request;
    const { code, sold } = await saleService.addSale(body);

    response.status(code).json(sold);
  },
};

module.exports = saleController;
