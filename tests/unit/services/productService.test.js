const sinon = require("sinon");
const { expect } = require("chai");
const productModel = require("../../../models/productModel");
const productService = require("../../../services/productService");
const mockProducts = require("../mocks/mockProducts");

describe("Testar a camada de modelo dos produtos", () => {
  // req1
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

  // req3 e 4
  describe("Função addProduct", () => {
    describe("Se o nome está incorreto", () => {
      beforeEach(() => {
        sinon.stub(productModel, "addProduct").resolves({ id: 4 });
      });

      afterEach(() => {
        sinon.restore();
      });

      it("deve retornar um objeto", async () => {
        const response = await productService.addProduct({ name: "Cellphone" });
        expect(response).to.be.a("object");
      });

      it("se não há nome, deve retornar um objeto com código 400", async () => {
        const response = await productService.addProduct({});

        expect(response.code).to.be.equal(400);
      });

      it("se nome tem menos que 5 letras, deve retornar um objeto com código 422", async () => {
        const response = await productService.addProduct({ name: "cel" });

        expect(response.code).to.be.equal(422);
      });

      it("se não há nome, deve retornar uma mensagem", async () => {
        const response = await productService.addProduct({});

        expect(response.message).to.be.equal('"name" is required');
      });
      it("se nome tem menos que 5 letras, deve retornar uma mensagem", async () => {
        const response = await productService.addProduct({ name: "cel" });

        expect(response.message).to.be.equal(
          '"name" length must be at least 5 characters long'
        );
      });
    });

    describe("Se o nome está correto", () => {
      beforeEach(() => {
        sinon.stub(productModel, "addProduct").resolves({ id: 4 });
      });

      afterEach(() => {
        sinon.restore();
      });

      it("deve retornar um objeto", async () => {
        const response = await productService.addProduct({ name: "Cellphone" });

        expect(response).to.be.a("object");
      });
      it("deve retornar um objeto com código 201", async () => {
        const response = await productService.addProduct({ name: "Cellphone" });

        expect(response.code).to.be.equal(201);
      });
      it("deve retornar o produto criado", async () => {
        const response = await productService.addProduct({ name: "Cellphone" });
  
        expect(response.product).to.be.deep.equal({ id: 4, name: "Cellphone" });
      });
    });

    // req10
    describe("Função updateProduct", () => {
      describe("Se o nome está incorreto", () => {
        beforeEach(() => {
          sinon.stub(productModel, "updateProduct").resolves(true);
        });

        afterEach(() => {
          sinon.restore();
        });

        it("deve retornar um objeto", async () => {
          const response = await productService.updateProduct({
            id: 1,
            name: "Cell",
          });

          expect(response).to.be.a("object");
        });

        it("se não há nome, deve retornar um objeto com o código 400", async () => {
          const response = await productService.updateProduct({ id: 1 });

          expect(response.code).to.be.equal(400);
        });

        it("se o nome tem menos que 5 letras, deve retornar um objeto com o código 422", async () => {
          const response = await productService.updateProduct({
            id: 1,
            name: "cel",
          });

          expect(response.code).to.be.equal(422);
        });

        it("se não há nome, deve retornar uma mensagem", async () => {
          const response = await productService.updateProduct({ id: 1 });

          expect(response.message).to.be.equal('"name" is required');
        });

        it("se o nome tem menos que 5 letras, deve retornar uma mensagem", async () => {
          const response = await productService.updateProduct({
            id: 1,
            name: "cel",
          });

          expect(response.message).to.be.equal(
            '"name" length must be at least 5 characters long'
          );
        });
      });

      describe("Se o id está incorreto", () => {
        beforeEach(() => {
          sinon.stub(productModel, "updateProduct").resolves(true);
          sinon.stub(productModel, "findById").resolves([]);
        });

        afterEach(() => {
          sinon.restore();
        });

        it("deve retornar um objeto", async () => {
          const response = await productService.updateProduct({
            id: 99,
            name: "Cellphone",
          });
          expect(response).to.be.a("object");
        });

        it("deve retornar um objeto com o código 404", async () => {
          const response = await productService.updateProduct({
            id: 99,
            name: "cellphone",
          });

          expect(response.code).to.be.equal(404);
        });

        it("deve retornar uma mensagem", async () => {
          const response = await productService.updateProduct({
            id: 1,
            name: "Cellphone",
          });

          expect(response.message).to.be.equal("Product not found");
        });
      });

      describe("Se o nome e id estão corretos", () => {
        beforeEach(() => {
          sinon.stub(productModel, "updateProduct").resolves(true);
          sinon.stub(productModel, "findById").resolves([mockProducts[0]]);

        });

        afterEach(() => {
          sinon.restore();
        });

        it("deve retornar um objeto", async () => {
          const response = await productService.updateProduct({
            id: 1,
            name: "Cellphone",
          });

          expect(response).to.be.a("object");
        });

        it("deve retornar um objeto com o código 200", async () => {
          const response = await productService.updateProduct({
            id: 1,
            name: "Cellphone",
          });

          expect(response.code).to.be.equal(200);
        });

        it("deve retornar o produto criado", async () => {
          const response = await productService.updateProduct({
            id: 1,
            name: "Cellphone",
          });

          expect(response).to.be.deep.equal({
            code: 200,
            id: 1,
            name: "Cellphone",
          });
        });
        
      });
    });

  });

  // req12
  describe("Função delete", () => {
    describe("se o id está correto", () => {
      beforeEach(() => {
        sinon.stub(productModel, "delete").resolves(true);
        sinon.stub(productModel, "findById").resolves([mockProducts[0]]);
      });

      afterEach(() => {
        sinon.restore();
      });

      it("deve retornar um objeto", async () => {
        const response = await productService.delete(1);
        expect(response).to.be.a("object");
      });

      it("deve retornar objeto com um código", async () => {
        const response = await productService.delete(1);
        expect(response).to.be.deep.equal({ code: 204 });
      });
    });

    describe("se o id está incorreto", () => {
      beforeEach(() => {
        sinon.stub(productModel, "delete").resolves(true);
        sinon.stub(productModel, "findById").resolves([]);
      });

      afterEach(() => {
        sinon.restore();
      });

      it("deve retornar um objeto", async () => {
        const response = await productService.delete(99);
        expect(response).to.be.a("object");
      });

      it("deve retornar objeto com um código", async () => {
        const response = await productService.delete(99);
        expect(response.code).to.be.equal(404);
      });

      it("deve retornar object com uma mensagem", async () => {
        const response = await productService.delete(99);
        expect(response.message).to.be.equal("Product not found");
      });
    });
  });

});
