const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const validateSale = require("../../../src/services/validations/validateSale");

const { expect } = chai;
chai.use(sinonChai);

describe("Verificando o validateSale", function () {
  it("verifica o validateSale com erro em quantidade negativa", async function () {
    const response = await validateSale.validateNewSale([{
      quantity: -20,
    }]);
    expect(response.type).to.equal("INVALID_VALUE");
    expect(response.message).to.equal(
      '"quantity" must be greater than or equal to 1'
    );
  });
  it("verifica o validateSale com erro em saleId nao encontrado", async function () {
    const response = await validateSale.validateId([{
      saleId: 9999,
    }]);
    expect(response.message).to.be.deep.equal([]);
  });
  // it("verifica o validateSale com erro apos colocar um id incorreto", async function () {
  //     const response = await validateSale.validateId({
  //       id: 222,
  //     });
  //     expect(response.type).to.be.deep.equal("SALE_NOT_FOUND");
  //     expect(response.message).to.be.deep.equal("Sale not found");
  //   });
});
