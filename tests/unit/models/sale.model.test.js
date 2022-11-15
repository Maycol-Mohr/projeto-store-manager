const { expect } = require("chai");
const sinon = require("sinon");
const { salesModel } = require("../../../src/models");

const connection = require("../../../src/models/connection");

describe("Testes de unidade do model de vendas", function () {
  afterEach(sinon.restore);

  describe("Cadastra uma nova venda", function () {
    const payload = {
      saleId: 1,
      productId: 1,
      quantity: 1,
    };

    it("com sucesso", async function () {
      sinon.stub(connection, "execute").resolves([
        {
          insertId: 1,
        },
      ]);
      const response = await salesModel.insertSalesProducts(payload);
      expect(response).to.equal(1);
    });
    it("com sucesso a data", async function () {
      sinon.stub(connection, "execute").resolves([
        {
          insertId: 1,
        },
      ]);
      const response = await salesModel.insertSales(payload);
      expect(response).to.equal(1);
    });
  });
});
