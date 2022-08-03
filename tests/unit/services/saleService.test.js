const sinon = require("sinon");
const { expect } = require("chai");
const saleModel = require("../../../models/saleModel");
const saleService = require("../../../services/saleService");
const {
  mockSalesBefore,
  mockSalesAfter,
  mockSaleAfter,
  mockSaleBefore,
} = require("../mocks/mockSales");

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

    // req8
    describe("Função getAll", () => {
      beforeEach(() => {
        sinon.stub(saleModel, "getAll").resolves(mockSalesBefore);
      });

      afterEach(() => {
        sinon.restore();
      });

      it("deve retornar um objeto", async () => {
        const response = await saleService.getAll();

        expect(response).to.be.a("object");
      });

      it("deve retornar um objeto com código 200", async () => {
        const response = await saleService.getAll();
      
        expect(response.code).to.be.equal(200);
      });

      it("deve retornar um objeto com um array das vendas", async () => {
        const response = await saleService.getAll();
      
        expect(response.sales).to.be.deep.equal(mockSalesAfter);
      });
    });
  
    describe("Função findById", () => {
      describe("se o id existe", () => {
        beforeEach(() => {
          sinon.stub(saleModel, "findById").resolves(mockSaleBefore);
        });

        afterEach(() => {
          sinon.restore();
        });

        it("deve retornar um objeto", async () => {
          const response = await saleService.findById(1);

          expect(response).to.be.a("object");
        });

        it("deve retornar um objeto com código 200", async () => {
          const response = await saleService.findById(1);

          expect(response.code).to.be.equal(200);
        });

        it("deve retornar um objeto com um array das vendas", async () => {
          const response = await saleService.findById(1);

          expect(response.sale).to.be.deep.equal(mockSaleAfter);
        });
      });

      describe("Se o id não existe", () => {
        beforeEach(() => {
          sinon.stub(saleModel, "findById").resolves([]);
        });

        afterEach(() => {
          sinon.restore();
        });

        it("deve retornar um objeto", async () => {
          const response = await saleService.findById(1);

          expect(response).to.be.a("object");
        });

        it("deve retornar um objeto com código 404", async () => {
          const response = await saleService.findById(1);

          expect(response.code).to.be.equal(404);
        });
        
        it("deve retornar uma mensagem", async () => {
          const response = await saleService.findById(1);

          expect(response.message).to.be.equal("Sale not found");
        });
      });
    });
  });

  // req12
  describe("Função delete", () => {
    describe("se o id estiver correto", () => {
      beforeEach(() => {
        sinon.stub(saleModel, "delete").resolves(true);
        sinon.stub(saleModel, "findById").resolves(mockSaleBefore);
      });

      afterEach(() => {
        sinon.restore();
      });

      it("deve retornar um objeto", async () => {
        
        const response = await saleService.delete(1);
        expect(response).to.be.a("object");
      });

      it("deve retornar um objeto com um código", async () => {
        const response = await saleService.delete(1);
        expect(response).to.be.deep.equal({ code: 204 });
      });

    });
    describe("se o id estiver incorreto", () => {
      beforeEach(() => {
        sinon.stub(saleModel, "delete").resolves(true);
        sinon.stub(saleModel, "findById").resolves([]);
      });

      afterEach(() => {
        sinon.restore();
      });

      it("deve retornar um objeto", async () => {
        const response = await saleService.delete(99);
        
        expect(response).to.be.a("object");
      });

      it("deve retornar objeto com um código", async () => {
        const response = await saleService.delete(99);
        
        expect(response.code).to.be.equal(404);
      });

      it("deve retornar um objeto com uma mensagem", async () => {
        const response = await saleService.delete(99);
        
        expect(response.message).to.be.equal("Sale not found");
      });
    });
  });


});
