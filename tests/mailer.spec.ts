const mailer = require("./../lib/mailer")

describe('notify_orders_team_body', () => {
  test('generates the notification message with inventory list', () => {
    const inventoryData = [{ "product_id": "blue_gummies", "num_inventory": 5 }];
    const expectedMessage = `
Dear Team,

Some of our inventory is running low. We are including the list of items and the threshold we like to keep on hand.

Product: blue_gummies, Inventory: 5`;
    const result = mailer.notify_orders_team_body(inventoryData);
    expect(result).toContain(expectedMessage);
  });
});
