const sinon = require("sinon");
const chai = require("chai");
const sinonChai = require("sinon-chai");
const productController = require("../../../src/controllers/product.controller");
const { productService } = require("../../../src/services");
const { productList } = require("./mocks/product.controller.mock");

const { expect } = chai;

chai.use(sinonChai);

describe("Verificando controller Product", function () {
  afterEach(sinon.restore);

  describe("Listando Produtos", function () {
    beforeEach(function () {
      sinon
        .stub(productService, "getProducts")
        .resolves({ type: null, message: productList });
    });

    it("é chamado o status com o código 200", async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const result = await productController.getProducts(req, res);
      console.log(result);

      expect(res.status).to.have.been.calledOnceWith(200);
    });

    it("é chamado o json com a lista de produtos", async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productController.getProducts(req, res);

      expect(res.json).to.have.been.calledWith(productList);
    });
  });
});
