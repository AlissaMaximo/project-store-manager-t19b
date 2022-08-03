// req6
const sinon = require("sinon");
const { expect } = require("chai");
const connection = require("../../../models/connection");
const saleModel = require("../../../models/saleModel");
const { mockSalesBefore } = require("../mocks/mockSales");

describe("Testar camada modelo de vendas", () => {
  describe("Função addSale", () => {
    sinon.stub(connection, "execute").returns([{ insertId: 3 }]);
  });

  afterEach(() => {
    sinon.restore();
  });

  it("deve retornar o id da venda adicionada", async () => {
    const response = await saleModel.addSale();

    expect(response).to.be.equal(3);
  });

  describe("Função soldProducts", () => {
    beforeEach(() => {
      sinon.stub(connection, "execute");
    });

    afterEach(() => {
      sinon.restore();
    });

    it("deve retornar dados do produto adicionado", async () => {
      const response = await saleModel.soldProds({
        saleId: 1,
        productId: 2,
        quantity: 1,
      });

      expect(response).to.be.deep.equal({ productId: 2, quantity: 1 });
    });
  });

  // req8
  describe("Função getAll", () => {
    beforeEach(() => {
      sinon.stub(connection, "execute").returns([mockSalesBefore]);
    });

    afterEach(() => {
      sinon.restore();
    });

    it("deve retornar um array", async () => {
      const response = await saleModel.getAll();

      expect(response).to.be.a("array");
    });

    it("deve retornar um array de vendas", async () => {
      const response = await saleModel.getAll();

      expect(response).to.be.deep.equal(mockSalesBefore);
    });
  });

  describe("Função findById", () => {
    beforeEach(() => {
      sinon.stub(connection, "execute").returns([[mockSalesBefore[0]]]);
    });
    afterEach(() => {
      sinon.restore();
    });
    it("deve retornar um array", async () => {
      const response = await saleModel.findById();
  
      expect(response).to.be.a("array");
    });
    it("deve retornar um array de vendas", async () => {
      const response = await saleModel.findById();

      expect(response[0]).to.be.deep.equal(mockSalesBefore[0]);
    });
  });

  // req12
  describe("Função delete", () => {
    beforeEach(() => {
      sinon.stub(conn, "execute").resolves();
    });

    afterEach(() => {
      sinon.restore();
    });

    it("deve retornar um booleano", async () => {
      const response = await saleModel.delete(1);

      expect(response).to.be.a("boolean");
    });

    it("deve retornar true", async () => {
      const response = await saleModel.delete(1);

      expect(response).to.be.equal(true);
    });
  });
  
  // req16
  describe("Função updateSale", () => {
    beforeEach(() => {
      sinon.stub(connection, "execute").resolves();
    });

    afterEach(() => {
      sinon.restore();
    });

    it("retorna um objeto", async () => {
      const response = await saleModel.updateSale({
        id: 1,
        productId: 1,
        quantity: 1,
      });
      
      expect(response).to.be.a("object");
    });

    it("o objeto deve ter o productId e a quantidade", async () => {
      const response = await saleModel.updateSale({
        id: 1,
        productId: 1,
        quantity: 1,
      });

      expect(response).to.be.deep.equal({ productId: 1, quantity: 1 });
    });
  });
});
