const sinon = require("sinon");
const { expect } = require("chai");
const productService = require("../../../services/productService");
const productController = require("../../../controllers/productController");
const mockProducts = require("../mocks/mockProducts");

describe("Testar a camada de controle dos produtos", () => {
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
});
