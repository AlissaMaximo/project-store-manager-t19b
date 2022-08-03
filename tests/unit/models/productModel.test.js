const sinon = require("sinon");
const { expect } = require("chai");
const productModel = require("../../../models/productModel");
const mockProducts = require("../mocks/mockProducts");
const connection = require("../../../models/connection");

describe("Testar a camada de modelo dos produtos", () => {
  // req1
  describe("Função getAll", () => {
    beforeEach(() => {
      sinon.stub(connection, "execute").resolves([mockProducts]);
    });

    afterEach(() => {
      sinon.restore();
    });

    it("deve retornar um array", async () => {
      const response = await productModel.getAll();

      expect(response).to.be.a("array");
    });

    it("deve retornar um array de produtos", async () => {
      const response = await productModel.getAll();

      expect(response).to.be.deep.equal(mockProducts);
    });
  });

  describe("Função findById", () => {
    beforeEach(() => {
      sinon.stub(connection, "execute").resolves([[mockProducts[0]]]);
    });

    afterEach(() => {
      sinon.restore();
    });

    it("deve retornar um array", async () => {
      const response = await productModel.findById(1);

      expect(response).to.be.a("array");
    });

    it("deve retornar um array com um objeto do produto correto", async () => {
      const response = await productModel.findById(1);

      expect(response).to.be.deep.equal([mockProducts[0]]);
    });
  });

  // req3 e 4
  describe("Função addProduct", () => {
    beforeEach(() => {
      sinon.stub(connection, "execute").resolves([{ insertId: 4 }]);
    });

    afterEach(() => {
      sinon.restore();
    });

    it("deve retornar um objeto", async () => {
      const response = await productModel.addProduct({ name: "Cellphone" });

      expect(response).to.be.a("object");
    });

    it("deve retornar um objeto com id do novo produto", async () => {
      const response = await productModel.addProduct({ name: "Cellphone" });

      expect(response).to.be.deep.equal({ id: 4 });
    });
  });

  // req10
  describe("Função updateProduct", () => {
    beforeEach(() => {
      sinon.stub(connection, "execute").resolves();
    });

    afterEach(() => {
      sinon.restore();
    });

    it("deve retornar um booleano", async () => {
      const response = await productModel.updateProduct({
        id: 1,
        name: "Martelo",
      });

      expect(response).to.be.a("boolean");
    });

    it("deve retornar true", async () => {
      const response = await productModel.updateProduct({
        id: 1,
        name: "Cellphone",
      });

      expect(response).to.be.equal(true);
    });
  });

});
