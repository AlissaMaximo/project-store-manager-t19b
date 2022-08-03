const sinon = require("sinon");
const { expect } = require("chai");
const productService = require("../../../services/productService");
const productController = require("../../../controllers/productController");
const mockProducts = require("../mocks/mockProducts");

describe("Testar a camada de controle dos produtos", () => {
  // req1
  describe("Função getAll", () => {
    const request = {};
    const response = {};

    beforeEach(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon
        .stub(productService, "getAll")
        .resolves({ code: 200, products: mockProducts });
    });

    afterEach(() => {
      sinon.restore();
    });

    it("retorna código 200", async () => {
      await productController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.true;
    });

    it("deve retornar array de produtos em json", async () => {
      await productController.getAll(request, response);
      expect(response.json.calledWith({ products: mockProducts }));
    });

  });

  describe("Função findById", () => {
    describe("Se o produto existe", () => {
      const request = {};
      const response = {};

      beforeEach(() => {
        request.params = { id: 1 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon
          .stub(productService, "findById")
          .resolves({ code: 200, product: mockProducts[0] });
      });

      afterEach(() => {
        sinon.restore();
      });

      it("retornar código 200", async () => {
        await productController.findById(request, response);
        expect(response.status.calledWith(200)).to.be.true;
      });

      it("deve retornar um objeto com o produto dentro de um json", async () => {
        await productController.findById(request, response);
        expect(response.json.calledWith(mockProducts[0])).to.be.true;
      });
    });

    describe("Se o produto não existe", () => {
      const request = {};
      const response = {};
  
      beforeEach(() => {
        request.params = { id: 4 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon
          .stub(productService, "findById")
          .resolves({ code: 404, message: "Product not found" });
      });

      afterEach(() => {
        sinon.restore();
      });

      it("deve retornar código 404", async () => {
        await productController.findById(request, response);

        expect(response.status.calledWith(404)).to.be.true;
      });

      it("deve retornar um objeto com o produto dentro de um json", async () => {
        await productController.findById(request, response);
        expect(response.json.calledWith({ message: "Product not found" })).to.be
          .true;
      });
    });
  });

  // req3 e 4
  describe("Função addProduct", () => {
    describe("se o nome é correto", () => {
      const request = {};
      const response = {};

      beforeEach(() => {
        request.body = {
          name: "Cellphone",
        };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon
          .stub(productService, "addProduct")
          .resolves({ code: 201, product: { id: 4, name: "Cellphone" } });
      });

      afterEach(() => {
        sinon.restore();
      });

      it("deve retornar status 201", async () => {
        await productController.addProduct(request, response);
        expect(response.status.calledWith(201)).to.be.true;
      });

      it("deve retornar o produto criado", async () => {
        await productController.addProduct(request, response);
        expect(response.json.calledWith({ id: 4, name: "Cellphone" })).to.be.true;});
    });

    describe("se o nome tem comprimento menor que 5", () => {
      const request = {};
      const response = {};

      beforeEach(() => {
        request.body = {
          name: "Cel",
        };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon
          .stub(productService, "addProduct")
          .resolves({
            code: 422,
            message: '"name" length must be at least 5 characters long',
          });
      });

      afterEach(() => {
        sinon.restore();
      });

      it("deve retornar status 422", async () => {
        await productController.addProduct(request, response);
        expect(response.status.calledWith(422)).to.be.true;
      });

      it("deve retornar uma mensagem", async () => {
        await productController.addProduct(request, response);
        expect(
          response.json.calledWith({
            message: '"name" length must be at least 5 characters long',
          })
        ).to.be.true;
      });

    });
    describe("se não há nome", () => {
      const request = {};
      const response = {};

      beforeEach(() => {
        request.body = {
          name: "",
        };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon
          .stub(productService, "addProduct")
          .resolves({ code: 400, message: '"name" is required' });
      });
  
      afterEach(() => {
        sinon.restore();
      });

      it("deve retornar status 400", async () => {
        await productController.addProduct(request, response);
        expect(response.status.calledWith(400)).to.be.true;
      });

      it("deve retornar uma mensagem", async () => {
        await productController.addProduct(request, response);
        expect(response.json.calledWith({ message: '"name" is required' })).to
          .be.true;
      });
    });
  });
});
