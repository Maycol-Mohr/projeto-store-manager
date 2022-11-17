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

  describe("Listando as vendas", function () {
    beforeEach(function () {
      sinon.stub(salesModel, "findAll").resolves(saleServiceMock.execute);
    });

    afterEach(function () {
      sinon.restore();
    });

    it("a lista de vendas é um array", async function () {
      const sale = await saleService.getSales();

      expect(sale.message instanceof Array).to.equal(true);
    });

    it("retorna a lista de sales com sucesso", async function () {
      const sales = await saleService.getSales();

      expect(sales.message).to.deep.equal(saleServiceMock.execute);
    });
    it("Buscando uma venda pelo seu id", async function () {
      sinon.stub(salesModel, "findById").resolves(saleServiceMock.saleParams);
      const response = await saleService.findById(1);
      expect(response.message).to.deep.equal(saleServiceMock.saleParams);
    });
    it("Retorna um erro quando passa um id que nao existe", async function () {
      sinon.stub(salesModel, "findById").resolves(undefined);
      const response = await saleService.findById(888);
      expect(response.message).to.deep.equal("Sale not found");
      expect(response.type).to.deep.equal("SALE_NOT_FOUND");
    });
    it("Deleta uma venda", async function () {
      sinon.stub(salesModel, "remove").resolves(1);
      const response = await saleService.removeSale(2);
      expect(response.message).to.deep.equal(1);
      expect(response.type).to.deep.equal(null);
      });
  });


});
