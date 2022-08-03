const bodyParser = require('body-parser');
const express = require('express');
const rescue = require('express-rescue');
const productController = require('./controllers/productController');
const saleController = require('./controllers/saleController');
const validateId = require('./middlewares/validateProductId');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', rescue(productController.getAll));

app.post('/products', rescue(productController.addProduct));

app.get('/products/search', rescue(productController.query));

app.put('/products/:id', rescue(productController.updateProduct));

app.get('/products/:id', rescue(productController.findById));

app.delete('/products/:id', rescue(productController.delete));

app.post('/sales', rescue(validateId), rescue(saleController.addSale));

app.get('/sales', rescue(saleController.getAll));

app.get('/sales/:id', rescue(saleController.findById));

app.delete('/sales/:id', rescue(saleController.delete));

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação
module.exports = app;
