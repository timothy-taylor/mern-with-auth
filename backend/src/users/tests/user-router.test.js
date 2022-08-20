const request = require('supertest');
const { app, disconnectServer } = require("../../../app");
const { disconnectDb } = require("../../../db")

//
// this test is currently using the main server and db
// simple smoke tests that don't touch the db, so it should be fine

afterAll(async () => {
  await disconnectDb();
  await disconnectServer();
});

test('GET index, unauthenticated', async () => {
  const res = await request(app).get("/v1/user/");
  expect(res.statusCode).toEqual(401);
});

test('POST index, bad data', async () => {
  const res = await request(app).post("/v1/user/");
  expect(res.statusCode).toEqual(400);
});