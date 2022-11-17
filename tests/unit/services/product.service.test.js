const { expect } = require("chai");
const sinon = require("sinon");

const { productModel } = require("../../../src/models");

const { productService } = require("../../../src/services");

const productMock = require("./mocks/product.service.mock");

describe("Verificando product service", function () {
  describe("Listando os produtos", function () {
    beforeEach(function () {
      sinon.stub(productModel, "findAll").resolves(productMock.productList);
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

      expect(produto.message).to.deep.equal(productMock.productList);
    });
    it("Buscando um produto pelo seu id", async function () {
      sinon.stub(productModel, "findById").resolves(productMock.product);
      const response = await productService.findById(1);
      expect(response.message).to.deep.equal(productMock.product);
    });
    it("Retorna um erro quando  passa um id que nao existe", async function () {
      sinon.stub(productModel, "findById").resolves(null);
      const response = await productService.findById(5);
      expect(response.message).to.deep.equal("Product not found");
      expect(response.type).to.deep.equal("PRODUCT_NOT_FOUND");
    });

  });

  describe("Cadastrando um novo produto com sucesso", function () {
     beforeEach(function () {
      sinon.stub(productModel, "findById").resolves(productMock.product);
     });
    afterEach(function () {
      sinon.restore();
    });
    it("não retorna erros", async function () {
      const response = await productService.createProduct(productMock.productNew);
      expect(response.type).to.equal(null);
    });

    it("retorna o produto cadastrado", async function () {
      const response = await productService.createProduct(productMock.productNew);

      expect(response.message).to.equal(productMock.product);
    });
    it("retorna o produto cadastrado com erro", async function () {
      const response = await productService.createProduct(
        productMock.producError,
      );
      expect(response.type).to.equal("string.min");
    });
  });

  describe("Atualizando um produto com sucesso", function () {
    beforeEach(function () {
      sinon.stub(productModel, "findById").resolves(productMock.product);
    });
    afterEach(function () {
      sinon.restore();
    });
    it("atualiza um produto", async function () {
      const response = await productService.updateProduct(
        productMock.updateProduct.id,
        productMock.updateProduct.name,
      );
      expect(response).to.deep.equal({
        type: null,
        message: productMock.updateProduct,
      });
    });
  });

  describe("Deletando um produto com sucesso", function () {
    beforeEach(function () {
      sinon.stub(productModel, "findAll").resolves(productMock.productList);
      sinon.stub(productModel, "remove").resolves(1);
    });
    afterEach(function () {
      sinon.restore();
    });
    it("deleta um produto", async function () {
      const response = await productService.removeProduct(
        productMock.product.id,
      );
      // expect(response.type).to.deep.equal(null);
      expect(response).to.deep.equal({type: null, message: 1});
    });
  });
});
