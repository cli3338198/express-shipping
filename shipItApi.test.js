"use strict";

const { shipProduct } = require("./shipItApi");

const AxiosMockAdapter = require("axios-mock-adapter");
const axios = require("axios");
const axiosMock = new AxiosMockAdapter(axios);
const BASE_URL = "http://localhost:3001/ship";
const SHIPIT_API_KEY = "SUPER-DUPER-SECRET";

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

test("shipProduct with bad data", async function () {
  axiosMock.onPost(`${BASE_URL}`).reply(200, {
    receipt: {
      itemId: "1001",
      name: "SOME THING",
      addr: "SOME ADDR",
      zip: "SOME ZIP",
      shipId: 1,
    },
  });

  const shipId = await shipProduct({
    productId: "1001",
    name: "SOME THING",
    addr: "SOME ADDR",
    zip: "SOME ZIP",
  });

  expect(shipId).toEqual(1);
});
// test("fact about 7", async function () {
//   axiosMock.onGet(`${BASE_URL}/7`).reply(200, { fact: "7 is lucky" });
//   const res = await getFact(7);
//   expect(res).toEqual("7 is lucky");
// });
