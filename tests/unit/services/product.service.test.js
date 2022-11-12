const { expect } = require("chai");
const sinon = require("sinon");

const {productModel} = require("../../../src/models");

const { productService } = require("../../../src/services");

const { productList } = require("./mocks/product.service.mock");

describe("Verificando product service", function () {
  describe("Listando os produtos", function () {
    beforeEach(function () {
      sinon.stub(productModel, "findAll").resolves(productList);
    });

    afterEach(function () {
      sinon.restore();
    });

    it("a lista de produtos é um array", async function () {
      const produto = await productService.getProducts();

      expect(produto.message instanceof Array).to.equal(true);
    });

    it("retorna a lista de produtos com sucesso", async function () {
      const produto = await productService.getProducts();

      expect(produto.message).to.deep.equal(productList);
    });
    it("Buscando um produto pelo seu id", async function () {
      sinon.stub(productModel, "findById").resolves(productList[0]);
      const response = await productService.findById(1);
      expect(response.message).to.deep.equal(productList[0]);
    });
    it("Retorna um erro quando  passa um id que nao existe", async function () {
      sinon.stub(productModel, "findById").resolves(productList[4]);
      const response = await productService.findById(5);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: "Product not found" });
      expect(response.message).to.deep.equal({ message: "Product not found" });
    });
  });

  describe('Cadastrando um novo produto com sucesso', function () {
     it('não retorna erros', async function () {
         const response = await productService.createProduct(body);

         expect(response.type).to.equal(null);
     });

     it('retorna o produto cadastrado', async function () {
         const response = await productService.createProduct(body);

         expect(response.message).to.equal(productList);
     });
   });
});
