const sinon = require("sinon");
const chai = require("chai");
const sinonChai = require("sinon-chai");

const { saleService } = require("../../../src/services");
const saleMock = require("./mocks/sale.controller.mock");
const { saleController } = require("../../../src/controllers");
const connection = require("../../../src/models/connection");


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

  describe("Listando as vendas", function () {
    beforeEach(function () {
      sinon
        .stub(saleService, "getSales")
        .resolves({ type: null, message: saleMock.validReq });
    });
    it("é chamado o status com o código 200", async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const result = await saleController.getSales(req, res);

      expect(res.status).to.have.been.calledOnceWith(200);
    });

    it("é chamado o json com a lista de vendas", async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await saleController.getSales(req, res);

      expect(res.json).to.have.been.calledWith(saleMock.validReq);
    });

     it("Buscando um venda pelo seu id", async function () {
       const res = {};
       const req = { params: { id: 1 } };

       res.status = sinon.stub().returns(res);
       res.json = sinon.stub().returns();

       sinon.stub(saleService, "findById").resolves(saleMock.validId);

       await saleController.getSaleById(req, res);

       expect(res.status).to.have.been.calledWith(200);
       expect(res.json).to.have.been.calledWith(
         saleMock.validId.message
       );
     });

        it("Buscando um venda pelo seu id com erro por id incorreto", async function () {
          const res = {};
          const req = { params: { id: 111 } };

          res.status = sinon.stub().returns(res);
          res.json = sinon.stub().returns();

          sinon
            .stub(saleService, "findById")
            .resolves({ type: "SALE_NOT_FOUND", message: "Sale not found" });

          await saleController.getSaleById(req, res);

          expect(res.status).to.have.been.calledWith(404);
        });

      it("atualizando uma venda pelo id", async function () {
        sinon.stub(connection, "execute").resolves([{ affectedRows: 1 }]);
        sinon
          .stub(saleService, "updateSale")
          .resolves(saleMock.validId);

        const res = {};
        const req = {
          params: { productId: saleMock.validId.productId },
          body: { quantity: saleMock.validId.quantity },
        };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        await saleController.updateSale(req, res);

        expect(res.status).to.have.been.calledOnceWith(200);
      });

        it("nao atualizando uma venda com id incorreto", async function () {
          sinon.stub(connection, "execute").resolves([{ affectedRows: 1 }]);
          sinon.stub(saleService, "updateSale").resolves(
            { type: 'SALE_NOT_FOUND', message: 'Sale not found' });


          const res = {};
          const req = {
            params: { productId: saleMock.invalidReq.productId },
            body: { quantity: saleMock.invalidReq.quantity },
          };

          res.status = sinon.stub().returns(res);
          res.json = sinon.stub().returns();

          await saleController.updateSale(req, res);

          expect(res.status).to.have.been.calledOnceWith(404);
        });

    it("deletando uma venda pelo id", async function () {
      sinon.stub(connection, "execute").resolves([{ affectedRows: 1 }]);
      sinon.stub(saleService, "removeSale").resolves({type: null, message: 1});

      const res = {};
      const req = {params: {id: 1}};

      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns();

      await saleController.deleteSale(req, res);

      expect(res.status).to.have.been.calledOnceWith(204);
    });
     it("deletando uma venda que nao existe", async function () {
       sinon.stub(connection, "execute").resolves([{ affectedRows: 0 }]);
       sinon
         .stub(saleService, "removeSale")
         .resolves({ type: 'SALE_NOT_FOUND', message: 'Sale not found' });

       const res = {};
       const req = { params: { id: 100 } };

       res.status = sinon.stub().returns(res);
       res.json = sinon.stub().returns();

       await saleController.deleteSale(req, res);

       expect(res.status).to.have.been.calledOnceWith(404);
     });
  });
});
