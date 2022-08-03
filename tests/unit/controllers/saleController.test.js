// req6
const sinon = require("sinon");
const { expect } = require("chai");
const saleService = require("../../../services/saleService");
const saleController = require("../../../controllers/saleController");

describe("Testar camada de controle de vendas", () => {
  describe("Função addSale", () => {
    const response = {};
    const request = {};

    beforeEach(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(saleService, "addSale").resolves({
        code: 201,
        sold: { id: 3, itemsSold: [{ productId: 2, quantity: 3 }] },
      });
    });

    afterEach(() => {
      sinon.restore();
    });

    it("Com dados corretos, returna código 201", async () => {
      request.body = [{ productId: 2, quantity: 3 }];
      await saleController.addSale(request, response);

      expect(response.status.calledWith(201)).to.be.true;
    });
  });
});
