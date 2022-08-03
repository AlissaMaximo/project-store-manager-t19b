// req6
const saleModel = require('../models/saleModel');

let idSale;

const addProduct = ({ productId, quantity }) => {
  saleModel.soldProducts({ saleId: idSale, productId, quantity });

  return { productId, quantity };
};

const saleService = {
  addSale: async (products) => {
    idSale = await saleModel.addSale();
    const itemsSold = products.map(addProduct);

    return { code: 201, sold: { id: idSale, itemsSold } };
  },
  // req8
  getAll: async () => {
    const result = await saleModel.getAll();
    const sales = result.map(
      ({ date, product_id: productId, sale_id: saleId, quantity }) => ({
        date,
        saleId,
        productId,
        quantity,
      }),
    );

    return { code: 200, sales };
  },
  findById: async (id) => {
    const result = await saleModel.findById(id);

    if (result.length === 0) return { code: 404, message: 'Sale not found' };

    const sale = result.map(({ date, product_id: productId, quantity }) => ({
      date,
      productId,
      quantity,
    }));

    return { code: 200, sale };
  },

  delete: async (id) => {
    const exactSale = await saleModel.findById(id);
    
    if (exactSale.length === 0) return { code: 404, message: 'Sale not found' };
    
    await saleModel.delete(id);
    
    return { code: 204 };
  },
};

module.exports = saleService;