// req6
const sinon = require("sinon");
const { expect } = require("chai");
const connection = require("../../../models/connection");
const saleModel = require("../../../models/saleModel");

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
});
