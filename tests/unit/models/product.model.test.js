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
});
