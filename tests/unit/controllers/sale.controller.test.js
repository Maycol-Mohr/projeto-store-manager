const sinon = require("sinon");
const chai = require("chai");
const sinonChai = require("sinon-chai");

const { saleService } = require("../../../src/services");
const saleMock = require("./mocks/sale.controller.mock");
const { saleController } = require("../../../src/controllers");

const { expect } = chai;

chai.use(sinonChai);

describe("Verificando controller Sales", function () {
  afterEach(sinon.restore);

  describe("Cadastrando uma nova venda com sucesso", function () {
    it("é chamado o status 201 e o json correto", async function () {
      sinon
        .stub(saleService, "createSale")
        .resolves({ type: null, message: saleMock.validReq });

      const res = {};
      const req = {
        body: [
          {
            productId: 2,
            quantity: 10,
          },
          {
            productId: 1,
            quantity: 20,
          },
        ],
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await saleController.createSale(req, res);

      expect(res.status).to.have.been.calledOnceWith(201);
      expect(res.json).to.have.been.calledWith(saleMock.validReq);
    });
    it("é chamado 404 com erro", async function () {
      sinon.stub(saleService, "createSale").resolves({
        type: "SALE_NOT_FOUND",
        message: "Sale not found",
      });

      const res = {};
      const req = {
        body: [
          {
            productId: 100,
            quantity: 1000,
          },
          {
            productId: 200,
            quantity: 2000,
          },
        ],
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await saleController.createSale(req, res);

      expect(res.status).to.have.been.calledOnceWith(404);
    });
  });
});
