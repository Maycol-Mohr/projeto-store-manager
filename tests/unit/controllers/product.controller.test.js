const sinon = require("sinon");
const chai = require("chai");
const sinonChai = require("sinon-chai");
const productController = require("../../../src/controllers/product.controller");
const { productService } = require("../../../src/services");
const productList = require("./mocks/product.controller.mock");
const connection = require("../../../src/models/connection");

const { expect } = chai;

chai.use(sinonChai);

describe("Verificando controller Product", function () {
  afterEach(sinon.restore);

  describe("Listando Produtos", function () {
    beforeEach(function () {
      sinon
        .stub(productService, "getProducts")
        .resolves({ type: null, message: productList.productList });
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

      expect(res.json).to.have.been.calledWith(productList.productList);
    });
  });
      it("é chamado o json com a lista de productsBySearch por um nome", async function () {
      const res = {};
        const req = { query: { q: 'atualizada' } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productController.getProductBySearch(req, res);

        expect(res.status).to.have.been.calledWith(200);
    });

  it("Buscando um produto pelo seu id", async function () {
    const res = {};
    const req = { params: { id: 1 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productService, "findById").resolves(productList.productList);

    await productController.getProductById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productList.productList.message);
  });
  it("Retorna um erro quando  passa um id que nao existe", async function () {
    sinon.stub(productService, "findById").resolves({
      type: 'PRODUCT_NOT_FOUND',
      message:'Product not found',
    });
    const req = {
      params: {id: 5},
    }
    const res = {}

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.getProductById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: "Product not found" });
  });

  describe("Cadastrando um novo produto com sucesso", function () {
    it("é chamado o status 201 e o json correto", async function () {
      sinon
        .stub(productService, "createProduct")
        .resolves({ type: null, message: productList.productList });

      const res = {};
      const req = {
        body: {
          name: "Bola de futebol",
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productController.createProduct(req, res);

      expect(res.status).to.have.been.calledOnceWith(201);
      expect(res.json).to.have.been.calledWith(productList.productList);
    });
    it("é chamado 404 com erro", async function () {
      sinon.stub(productService, "createProduct").resolves({
        type: "PRODUCT_NOT_FOUND",
        message: "Product not found",
      });

      const res = {};
      const req = {
        body: {
          name: "Bola de futebol",
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productController.createProduct(req, res);

      expect(res.status).to.have.been.calledOnceWith(404);
    });
    it("atualizando um produto pelo id", async function () {
         sinon.stub(connection, "execute").resolves([{ affectedRows: 1 }]);
         sinon.stub(productService, "updateProduct").resolves(productList.product);

         const res = {};
      const req = {
        params: {id: productList.product.id},
        body: {name:productList.product.name}
         };

         res.status = sinon.stub().returns(res);
         res.json = sinon.stub().returns();

         await productController.updateProduct(req, res);

         expect(res.status).to.have.been.calledOnceWith(200);
    });
     it("deletando um produto pelo id", async function () {
       sinon.stub(connection, "execute").resolves([{ affectedRows: 1 }]);
       sinon
         .stub(productService, "removeProduct")
         .resolves({type: null, message: 1});

       const res = {};
       const req = {
         params: { id: productList.product.id },
       };

       res.status = sinon.stub().returns(res);
       res.end = sinon.stub().returns();

       await productController.deleteProduct(req, res);

       expect(res.status).to.have.been.calledOnceWith(204);
     });
  });
});
