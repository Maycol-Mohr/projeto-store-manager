const invalidReq = {
  body: [
    {
      productId: 1,
      quantity: 0,
    },
  ],
};

const validReq = {
  body: [
    {
      productId: 99,
      quantity: 15,
    },
    {
      productId: 100,
      quantity: 25,
    },
  ],
};

module.exports = {
  invalidReq,
  validReq,
};
