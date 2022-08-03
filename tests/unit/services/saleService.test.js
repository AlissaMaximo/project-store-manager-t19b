const sinon = require("sinon");
const { expect } = require("chai");
const saleModel = require("../../../models/saleModel");
const saleService = require("../../../services/saleService");

describe("Testa camada de serviço de vendas", () => {
  describe("Função addSale", () => {
    beforeEach(() => {
      sinon.stub(saleModel, "addSale").returns({ saleId: 3 });
      sinon.stub(saleModel, "soldProducts").returns({ productId: 2, quantity: 2 });
    });

    afterEach(() => {
      sinon.restore();
    });

    it("deve retornar um objeto", async () => {
      const response = await saleService.addSale([
        { productId: 2, quantity: 2 },
      ]);
      expect(response).to.be.a("object");
    });

    it("deve retornar o código 201", async () => {
      const response = await saleService.addSale([
        { productId: 2, quantity: 2 },
      ]);

      expect(response.code).to.be.equal(201);
    });

    it("produto vendido deve ser um objeto", async () => {
      const response = await saleService.addSale([
        { productId: 2, quantity: 2 },
      ]);

      expect(response.sold).to.be.a("object");
    });

    it("deve retornar o id da venda e os itens vendidos", async () => {
      const response = await saleService.addSale([
        { productId: 2, quantity: 2 },
      ]);

      expect(response.sold).to.be.deep.equal({
        id: { saleId: 3 },
        itemsSold: [{ productId: 2, quantity: 2 }],
      });
    });

  });
});
