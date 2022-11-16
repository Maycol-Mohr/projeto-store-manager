const { expect } = require("chai");

const { validateProduct, validateId, verifyId } = require("../../../src/services/validations/validationsInputValue");

describe("Verificando o validateProductInputValue", function () {
    it("verifica o validate com erro", async function () {
      const response = await validateProduct({
        name: 'ab',
      })
      expect(response.type).to.equal("string.min");
      expect(response.message).to.equal(
        '"name" length must be at least 5 characters long'
      );
    });
    it("verifica o validate com erro apos colocar uma letra", async function () {
      const response = await validateId("a");
      expect(response.type).to.equal("number.base");
      expect(response.message).to.equal('"value" must be a number');
    });
    it("verifica o verify com erro apos colocar um id incorreto", async function () {
      const response = await verifyId(999);
      expect(response.type).to.equal("PRODUCT_NOT_FOUND");
      expect(response.message).to.equal("Product not found");
    });
    it("verifica o verify com sucesso apos colocar um id correto", async function () {
      const response = await verifyId(1)
      expect(response.type).to.equal(null);
      expect(response.message).to.equal("");
    });
    it("verifica o validate com sucesso apos colocar um id correto", async function () {
      const response = await validateId(1);
      expect(response.type).to.equal(null);
      expect(response.message).to.equal("");
  });
});
