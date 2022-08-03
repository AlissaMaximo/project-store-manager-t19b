const productService = require('../services/productService');

const validateFields = (prods) => {
  const validId = prods.every(({ productId }) => productId);
  const hasQuantity = prods.every(({ quantity }) => quantity || quantity === 0);
  const validQuantity = prods.every(({ quantity }) => quantity > 0);

  if (!validId) return { code: 400, message: '"productId" is required' };
  if (!hasQuantity) return { code: 400, message: '"quantity" is required' };
  if (!validQuantity) {
    return {
      code: 422,
      message: '"quantity" must be greater than or equal to 1',
    }; 
  }

  return {};
};

const validateProduct = async (prods) => {
  const { products } = await productService.getAll();
  const exists = prods.filter(({ productId }) =>
    products.find(({ id }) => id === productId));

  if (exists.length === 0 || exists.length !== prods.length) return false;

  return true;
};

const validateId = async (request, response, next) => {
  const { body } = request;
  const { code, message } = validateFields(body);

  if (message) return response.status(code).json({ message });

  const isValid = await validateProduct(body);

  if (!isValid) return response.status(404).json({ message: 'Product not found' });

  next();
};

module.exports = validateId;
