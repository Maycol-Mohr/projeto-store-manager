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
    expect(response.message).to.be.deep.equal("Sale not found");
  });
  it("verifica o validateSale com erro apos colocar um id incorreto", async function () {
      const response = await validateSale.validateId([
        {
          saleId: 9999,
          productId: 221,
          quantity: 10,
        },
      ]);
      expect(response.type).to.be.deep.equal("SALE_NOT_FOUND");
      expect(response.message).to.be.deep.equal("Sale not found");
  });
   it("verifica o validateSaleId com erro em saleId nao encontrado", async function () {
     const response = await validateSale.validateSaleId([
       {
         saleId: 9999,
         productId: 221,
         quantity: 10,
       },
     ]);
     expect(response.message).to.be.deep.equal("Product not found");
   });
   it("verifica o validateSales com erro apos colocar um id incorreto", async function () {
     const response = await validateSale.validateSaleId([
       {
         saleId: 9999,
         productId: 221,
         quantity: 10,
       },
     ]);
     expect(response.type).to.be.deep.equal("PRODUCT_NOT_FOUND");
     expect(response.message).to.be.deep.equal("Product not found");
   });
    it("verifica o validateSaleId com erro em saleId nao encontrado", async function () {
      const response = await validateSale.validateSales([
        {
          saleId: 9999,
          productId: 221,
          quantity: 10,
        },
      ]);
      expect(response.message).to.be.deep.equal("Product not found");
    });
    it("verifica o validateSales com erro apos colocar um productId incorreto", async function () {
      const response = await validateSale.validateSales([
        {
          saleId: 9999,
          productId: 221,
          quantity: 10,
        },
      ]);
      expect(response.type).to.be.deep.equal("PRODUCT_NOT_FOUND");
      expect(response.message).to.be.deep.equal("Product not found");
    });
    it("verifica o validateSales com quantidade incorreta", async function () {
      const response = await validateSale.validateSales([
        {
          saleId: 1,
          productId: 1,
          quantity: -10,
        },
      ]);
      expect(response.type).to.be.deep.equal("FIELD_INVALID");
      expect(response.message).to.be.deep.equal(
        '"quantity" must be greater than or equal to 1'
      );
    });
});
