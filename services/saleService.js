// req6
const saleModel = require('../models/saleModel');

let saleId;

const addProduct = ({ productId, quantity }) => {
  saleModel.soldProducts({ saleId, productId, quantity });
  return { productId, quantity };
};

const saleService = {
  addSale: async (products) => {
    saleId = await saleModel.addSale();
    const itemsSold = products.map(addProduct);
    return { code: 201, sold: { id: saleId, itemsSold } };
  },
};

module.exports = saleService;