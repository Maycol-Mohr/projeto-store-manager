const { expect } = require("chai");
const sinon = require("sinon");
const { salesModel } = require("../../../src/models");
const saleService = require("../../../src/services/sale.service");

const validateSale = require("../../../src/services/validations/validateSale");

const saleServiceMock = require("./mocks/sale.service.mock");

describe("Verificando sales service", function () {
  describe("Cadastrando uma nova venda com sucesso", function () {
    beforeEach(function () {
      sinon.stub(salesModel, "insertSales").resolves(1);
      sinon.stub(salesModel, "insertSalesProducts").resolves([{ insertId: 1 }]);
    });
    afterEach(function () {
      sinon.restore();
    });
    it("não retorna erros", async function () {
      const response = await saleService.createSale(
        saleServiceMock.validParams
      );
      console.log(response);
      expect(response.type).to.equal(null);
    });

    it("retorna a venda cadastrada", async function () {
      const response = await saleService.createSale(
        saleServiceMock.validParams
      );

      expect(response.message).to.be.deep.equal(saleServiceMock.endValidParams);
    });
    it("retorna a venda cadastrada com erro", async function () {
      const response = await saleService.createSale(
        saleServiceMock.invalidParams
      );
      expect(response.type).to.equal("PRODUCT_NOT_FOUND");
    });
  });
});
