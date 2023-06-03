const request = require("supertest");
const assert = require("assert");
const app = require("../index");
const fs = require("fs");
const { Customer, Product, User, Category, Wishlist } = require("../models");

const dataCustomer = JSON.parse(
  fs.readFileSync("./data/user.json", "utf-8")
).map((el) => {
  el.role = "Customer";
  el.createdAt = new Date();
  el.updatedAt = new Date();
  return el;
});
const dataProdcts = JSON.parse(
  fs.readFileSync("./data/product.json", "utf-8")
).map((el) => {
  el.createdAt = new Date();
  el.updatedAt = new Date();
  return el;
});
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJiYWdhc0BnbWFpbC5jb20iLCJpYXQiOjE2ODU1ODQ0MDksImV4cCI6MTY4NTY3MDgwOX0.PIc2IkqrUUEIf_8GQucIHReVGKZh9vAGHNb-xE7245M";
//register
describe("post /pub/register", function () {
  afterAll(async () => {
    await Customer.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  });
  it("Berhasil registerl", async function () {
    const response = await request(app)
      .post(`/pub/register`)
      .send({
        email: "bagas@gmail.com",
        password: "123",
      })
      .set("Accept", "application/json");
    expect(response.status).toEqual(201);
  });
  it("Email tidak diberikan / tidak diinput", async function () {
    const response = await request(app)
      .post(`/pub/register`)
      .send({
        email: undefined,
        password: "123",
      })
      .set("Accept", "application/json");
    expect(response.status).toEqual(400);
  });
  it("Email diberikan string kosong", async function () {
    const response = await request(app)
      .post(`/pub/register`)
      .send({
        email: "",
        password: "123",
      })
      .set("Accept", "application/json");

    expect(response.status).toEqual(400);
  });
  it("Password diberikan string kosong", async function () {
    const response = await request(app)
      .post(`/pub/register`)
      .send({
        email: "bagas@gmail.com",
        password: "",
      })
      .set("Accept", "application/json");
    expect(response.status).toEqual(400);
  });
  it("Email sudah terdaftar", async function () {
    const response = await request(app)
      .post(`/pub/register`)
      .send({
        email: "bagas@gmail.com",
        password: "123",
      })
      .set("Accept", "application/json");

    expect(response.status).toEqual(409);
  });
  it("Format Email salah / invalid", async function () {
    const response = await request(app)
      .post(`/pub/register`)
      .send({
        email: "test",
        password: "123",
      })
      .set("Accept", "application/json");

    expect(response.status).toEqual(400);
  });
});
//login
describe("post /pub/login", function () {
  it("Berhasil login", async function () {
    const response = await request(app)
      .post(`/pub/login`)
      .send({
        email: "bagas@gmail.com",
        password: "123",
      })
      .set("Accept", "application/json");

    expect(response.status).toEqual(200);
  });
  it("Memberikan password yang salah", async function () {
    const response = await request(app)
      .post(`/pub/login`)
      .send({
        email: "bagas@gmail.com",
        password: "1232",
      })
      .set("Accept", "application/json");

    expect(response.status).toEqual(401);
  });
  it("Email yang diinput tidak terdaftar di database", async function () {
    const response = await request(app)
      .post(`/pub/login`)
      .send({
        email: "bagaas@gmail.com",
        password: "123",
      })
      .set("Accept", "application/json");

    expect(response.status).toEqual(401);
  });
});
//Home
describe("post /pub/home", function () {
  beforeAll(async () => {
    await Customer.bulkCreate(dataCustomer);
    await Product.bulkCreate(dataProdcts);
  });
  afterAll(async () => {
    await Customer.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
    await Product.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  });
  it("Berhasil mendapatkan Entitas Utama (tanpa access_token) tanpa menggunakan query filter parameter", async function () {
    const response = await request(app).post(`/pub/home`).set({
      Accept: "application/json",
    });
    expect(response.status).toEqual(200);
  });
  it("Berhasil mendapatkan Entitas Utama (tanpa access_token) dengan 1 query filter parameter", async function () {
    const response = await request(app).post(`/pub/home`).send({}).set({
      productName: "t-shirt",
      Accept: "application/json",
      access_token: token,
    });

    expect(response.status).toEqual(200);
  });
  it("Berhasil mendapatkan  Entitas Utama serta panjang yang sesuai (tanpa access_token) ketika memberikan page tertentu (cek paginationnya)", async function () {
    const response = await request(app)
      .post(`/pub/home/2`)
      .send({
        productName: "in",
      })
      .set({
        Accept: "application/json",
        access_token: token,
      });

    expect(response.status).toEqual(200);
  });
  it("Gagal mendapatkan Entitas Utama karena params id yang diberikan tidak ada di database / invalid", async function () {
    const response = await request(app).get(`/pub/view/170`).send({}).set({
      Accept: "application/json",
      access_token: token,
    });

    expect(response.status).toEqual(400);
  });
  it("Gagal mendapatkan Entitas Utama karena params id yang diberikan tidak ada di database / invalid", async function () {
    const response = await request(app).get(`/pub/view/170`).send({}).set({
      Accept: "application/json",
      access_token: token,
    });

    expect(response.status).toEqual(400);
  });
});
//Wishlist
describe("post /pub/wishlist/", function () {
  it("Berhasil mendapatkan list bookmark / favorite sesuai dengan user yang login", async function () {
    const response = await request(app).get(`/pub/wishlist`).send({}).set({
      Accept: "application/json",
      access_token: token,
    });
    expect(response.status).toEqual(200);
  });
  it("Berhasil menambahkan bookmark dengan id yang sesuai", async function () {
    const response = await request(app).get(`/pub/wishlist/5`).send({}).set({
      Accept: "application/json",
      access_token: token,
    });
    expect(response.status).toEqual(200);
  });
  it("Gagal menambahkan bookmark karena id entity yang dikirim tidak terdapat di database", async function () {
    const response = await request(app).get(`/pub/wishlist/50`).send({}).set({
      Accept: "application/json",
      access_token: token,
    });
    expect(response.status).toEqual(500);
  });
  it("Gagal mendapatkan list bookmark / favorite karena belum login", async function () {
    const response = await request(app).get(`/pub/wishlist`).send({}).set({
      Accept: "application/json",
      access_token: "",
    });
    expect(response.status).toEqual(401);
  });
  it("Gagal mendapatkan list bookmark / favorite karena token yang diberikan tidak valid (random string)", async function () {
    const response = await request(app)
      .get(`/pub/wishlist`)
      .send({})
      .set({
        Accept: "application/json",
        access_token: `${token}blablabla`,
      });
    expect(response.status).toEqual(401);
  });
});
