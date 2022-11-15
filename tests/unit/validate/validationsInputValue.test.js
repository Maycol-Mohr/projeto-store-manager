const { expect } = require("chai");

const { validateProduct, validateId } = require("../../../src/services/validations/validationsInputValue");

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
      const response = await validateId({
        id: "a",
      });
      expect(response.type).to.equal("number.base");
      expect(response.message).to.equal('"value" must be a number');
    });
});

