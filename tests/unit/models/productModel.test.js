const sinon = require("sinon");
const { expect } = require("chai");
const conn = require("../../../models/connection");
const productModel = require("../../../models/productModel");
const mockProducts = require("../mocks/mockProducts");

describe("Testar a camada de modelo dos produtos", () => {
  // req1
  describe("Função getAll", () => {
    beforeEach(() => {
      sinon.stub(conn, "execute").resolves([mockProducts]);
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
      sinon.stub(conn, "execute").resolves([[mockProducts[0]]]);
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
      sinon.stub(conn, "execute").resolves([{ insertId: 4 }]);
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
});
