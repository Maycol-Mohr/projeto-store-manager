const { expect } = require("chai");
const sinon = require("sinon");
const { productModel } = require("../../../src/models");

const connection = require("../../../src/models/connection");
const productMock = require("./mocks/product.model.mock");

describe("Testes de unidade do model de produtos", function () {
  afterEach(sinon.restore);

  it("Recuperando a lista de produtos", async function () {
    sinon.stub(connection, "execute").resolves([productMock.products]);
    const result = await productModel.findAll();
    expect(result).to.be.deep.equal(productMock.products);
  });

   it("Recuperando um produto pela letra de seu nome", async function () {
     sinon.stub(connection, "execute").resolves([productMock.productRecover]);
     const result = await productModel.findBySearch();
     expect(result).to.be.deep.equal(productMock.productRecover);
   });

  it("Recuperando um produto a partir do seu id", async function () {
    sinon.stub(connection, "execute").resolves([[productMock.product]]);
    const result = await productModel.findById(1);
    expect(result).to.be.deep.equal(productMock.product);
  });

  describe("Cadastra um novo produto", function () {
    const payload = {
      name: "Bola de futebol",
    };

    it("com sucesso", async function () {
      sinon.stub(connection, "execute").resolves([{
         insertId: 1,
       }]);
      const response = await productModel.insert(payload);
      expect(response).to.equal(1);
    });
  });
   describe("Atualiza um novo produto", function () {
     const payload = {
       id: 1,
       name: "Bola de futebol atualizada",
     };

     it("com sucesso", async function () {
       sinon.stub(connection, "execute").resolves([
         {
           id: 1,
           name: "Bola de futebol atualizada",
         },
       ]);
       const response = await productModel.updateProduct(payload.id, payload.name);
       expect(response).to.deep.equal({
         id: 1,
         name: "Bola de futebol atualizada",
       });
     });
   });
   describe("Deleta um novo produto", function () {
     const payload = {
       name: "Bola de futebol atualizada",
     };

     it("com sucesso", async function () {
       sinon.stub(connection, "execute").resolves([
         {
           affectedRows: 1,
         },
       ]);
       const response = await productModel.remove(payload);
       expect(response).to.equal(1);
     });
   });
});
