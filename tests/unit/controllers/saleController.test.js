// req6
const sinon = require("sinon");
const { expect } = require("chai");
const saleService = require("../../../services/saleService");
const saleController = require("../../../controllers/saleController");
const { mockSalesAfter, mockSaleAfter } = require("../mocks/mockSales");

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

  // req8
  describe("Função getAll", () => {
    const response = {};
    const request = {};

    beforeEach(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon
        .stub(saleService, "getAll")
        .resolves({ code: 200, sales: mockSalesAfter });
    });

    afterEach(() => {
      sinon.restore();
    });

    it("retorna código 200", async () => {
      await saleController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.true;
    });

    it("retorna um array de vendas", async () => {
      await saleController.getAll(request, response);
      expect(response.json.calledWith(mockSalesAfter)).to.be.true;
    });

  });

  describe("Função findById", () => {
    describe("com id válido", () => {
      const response = {};
      const request = {};

      beforeEach(() => {
        request.params = {
          id: 1,
        };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon
          .stub(saleService, "findById")
          .resolves({ code: 200, sale: mockSaleAfter });
      });

      afterEach(() => {
        sinon.restore();
      });

      it("com dados corretos retorna código 200", async () => {
        await saleController.findById(request, response);
        expect(response.status.calledWith(200)).to.be.true;
      });

      it("retorna array com vendas esperado", async () => {
        await saleController.findById(request, response);
        expect(response.json.calledWith(mockSaleAfter)).to.be.true;
      });

    });
    describe("com id inválido", () => {
      const response = {};
      const request = {};

      beforeEach(() => {
        request.params = {
          id: 99,
        };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon
          .stub(saleService, "findById")
          .resolves({ code: 404, message: "Sale not found" });
      });

      afterEach(() => {
        sinon.restore();
      });

      it("com dados corretos retorna código 404", async () => {
        await saleController.findById(request, response);
        expect(response.status.calledWith(404)).to.be.true;
      });

      it("retorna uma mensagem", async () => {
        await saleController.findById(request, response);
        expect(response.json.calledWith({ message: "Sale not found" })).to.be
          .true;
      });
    });
  });
});
