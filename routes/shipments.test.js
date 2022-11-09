"use strict";
const shipItApi = require("../shipItApi");
shipItApi.shipProduct = jest.fn();

const request = require("supertest");
const app = require("../app");

describe("POST /", function () {
  test("valid", async function () {
    shipItApi.shipProduct.mockReturnValue(1001);

    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(resp.body).toEqual({ shipped: 1001 });
  });

  test("throws error if empty request body", async function () {
    const resp = await request(app).post("/shipments").send();
    expect(resp.statusCode).toEqual(400);
  });

  test("throws error if invalid id & missing name", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 100,
      addr: "SOME ADDR",
      zip: "SOME ZIP",
    });

    expect(resp.statusCode).toEqual(400);
    expect(resp.body.error.message).toEqual([
      "instance.productId must be greater than or equal to 1000",
      'instance requires property "name"',
    ]);
  });
});
