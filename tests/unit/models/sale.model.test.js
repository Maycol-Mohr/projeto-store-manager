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

   describe("Encontra uma venda pelo id", function () {
     before(async function () {
       const execute = [
         {
           saleId: 2,
           date: "2022-11-15 16:27:16",
           productId: 2,
           quantity: 2,
         },
       ];

       sinon.stub(connection, "execute").resolves(execute);
     });

     after(async function () {
       sinon.restore;
     });

     const expected = {
       saleId: 2,
       date: '2022-11-15 16:27:16',
       productId: 2,
       quantity: 2,
     };

     const payload = 2;

     it("com sucesso", async function () {
       const response = await salesModel.findById(payload);

       expect(response).to.deep.equal(expected);
     });
   });
  describe("Deleta uma nova venda", function () {
    const payload = {
      saleId: 1,
    };

    it("com sucesso", async function () {
      sinon.stub(connection, "execute").resolves([
        {
          affectedRows: 1,
        },
      ]);
      const response = await salesModel.remove(payload);
      expect(response).to.equal(1);
    });
  });
});
