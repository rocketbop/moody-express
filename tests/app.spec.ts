const index = require("./../routes/index.ts")
const express = require("express");
const request = require("supertest")
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", index);

jest.mock("./../lib/mailer");
describe("App", () => {
  beforeEach(() => {
    mockNotifyOrdersTeam = jest.fn();
    require("./../lib/mailer").notify_orders_team = mockNotifyOrdersTeam;
  });

  test("runs", done => {
    const change_data = [{ "product_id": "blue_gummies", "num_inventory": 5 }]

    request(app)
      .post("/webhooks/inventory_changed")
      .send(change_data)
      .expect(200, done);
  });
})
