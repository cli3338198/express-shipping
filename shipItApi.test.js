"use strict";

const AxiosMockAdapter = require("axios-mock-adapter");
const axios = require("axios");
const axiosMock = new AxiosMockAdapter(axios);

const { shipProduct } = require("./shipItApi");
const BASE_URL = "http://localhost:3001/ship";

test("shipProduct", async function () {
  axiosMock.onPost(`${BASE_URL}`).reply(200, {
    receipt: {
      itemId: 1001,
      name: "SOME THING",
      addr: "SOME ADDR",
      zip: "SOME ZIP",
      shipId: 1,
    },
  });
  const shipId = await shipProduct({
    productId: 1001,
    name: "SOME THING",
    addr: "SOME ADDR",
    zip: "SOME ZIP",
  });
  expect(shipId).toEqual(1);
});
