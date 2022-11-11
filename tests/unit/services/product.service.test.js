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
  });
});
