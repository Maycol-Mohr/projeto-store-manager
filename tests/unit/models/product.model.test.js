const { expect } = require("chai");
const sinon = require("sinon");
const { productModel } = require("../../../src/models");

const connection = require("../../../src/models/connection");
const { products } = require("./mocks/product.model.mock");

describe("Testes de unidade do model de produtos", function () {
  afterEach(sinon.restore);

  it("Recuperando a lista de produtos", async function () {
    sinon.stub(connection, "execute").resolves([products]);
    const result = await productModel.findAll();
    expect(result).to.be.deep.equal(products);
  });

  it("Recuperando um produto a partir do seu id", async function () {
    sinon.stub(connection, "execute").resolves([[products[0]]]);
    const result = await productModel.findById(1);
    expect(result).to.be.deep.equal(products[0]);
  });
});
