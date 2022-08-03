const sinon = require("sinon");
const { expect } = require("chai");
const productModel = require("../../../models/productModel");
const productService = require("../../../services/productService");
const mockProducts = require("../mocks/mockProducts");

describe("Testar a camada de modelo dos produtos", () => {
  describe("Função getAll", () => {
    beforeEach(() => {
      sinon.stub(productModel, "getAll").resolves(mockProducts);
    });

    afterEach(() => {
      sinon.restore();
    });

    it("deve retornar um array", async () => {
      const response = await productService.getAll();
  
      expect(response).to.be.a("object");
    });

    it("deve retornar um objeto com um código e um array de produtos", async () => {
      const response = await productService.getAll();

      expect(response).to.be.deep.equal({ code: 200, products: mockProducts });
    });

    it("deve retornar um array listado por id", async () => {
      const response = await productService.getAll();

      expect(response.products[0]).to.have.property("id", 1);
      expect(response.products[1]).to.have.property("id", 2);
    });

    it("deve retornar um objeto com código 200", async () => {
      const response = await productService.getAll();

      expect(response.code).to.be.equal(200);
    });
  });

  describe("Função findById", () => {
    describe("se o produto existe", () => {
      beforeEach(() => {
        sinon.stub(productModel, "findById").resolves([mockProducts[0]]);
      });

      afterEach(() => {
        sinon.restore();
      });

      it("deve retornar um objeto", async () => {
        const response = await productService.findById(1);

        expect(response).to.be.a("object");
      });

      it("deve retornar o código 200", async () => {
        const response = await productService.findById(1);

        expect(response.code).to.be.equal(200);
      });

      it("deve retornar um objeto com a chave do produto e id correto", async () => {
        const response = await productService.findById(1);

        expect(response.product).to.be.deep.equal(mockProducts[0]);
      });
    });

    describe("se o produto não existe", () => {
      beforeEach(() => {
        sinon.stub(productModel, "findById").resolves([]);
      });

      afterEach(() => {
        sinon.restore();
      });

      it("deve retornar um objeto", async () => {
        const response = await productService.findById(4);

        expect(response).to.be.a("object");
      });

      it("deve retornar um objeto com código 404", async () => {
        const response = await productService.findById(4);
  
        expect(response.code).to.be.equal(404);
      });

      it("deve retornar uma mensagem", async () => {
        const response = await productService.findById(4);

        expect(response.message).to.be.equal("Product not found");
      });
    });
  });
});
