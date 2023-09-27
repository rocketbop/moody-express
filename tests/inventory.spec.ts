const inventory = require("./../lib/inventory")

jest.mock("./../lib/mailer");

describe("inventory_change", () => {
  let mockNotifyOrdersTeam;

  beforeEach(() => {
    mockNotifyOrdersTeam = jest.fn();
    require("./../lib/mailer").notify_orders_team = mockNotifyOrdersTeam;
  });

  describe("when the inventory for an item is below a threshold", () => {
    test("It notifies the ordering team", () => {
      inventory_changes = [{ "product_id": "blue_gummies", "num_inventory": 5 }]
      const result = inventory.inventory_changed(inventory_changes);

      expected_inventory_changes = [{ "product_id": "blue_gummies", "num_inventory": 5 , "threshold": 10}]
      expect(mockNotifyOrdersTeam).toHaveBeenCalledWith(expected_inventory_changes);
      expect(inventory.inventory_changed(inventory_changes)).toBe("OK")
    })
  })

  describe("when the inventory for an item is not below a threshold", () => {
    test("It does not notifies the ordering team", () => {
      inventory_changes = [{ "product_id": "blue_gummies", "num_inventory": 15 }]
      const result = inventory.inventory_changed(inventory_changes);

      expect(mockNotifyOrdersTeam).not.toHaveBeenCalled();
      expect(inventory.inventory_changed(inventory_changes)).toBe("OK")
    })
  })

  describe("when the inventory for one item is below a threshold and other is not", () => {
    test("It notifies the ordering team for the WARNING item", () => {
      inventory_changes = [
        { "product_id": "blue_gummies", "num_inventory": 5 },
        { "product_id": "green_gummies", "num_inventory": 15 }
      ]
      const result = inventory.inventory_changed(inventory_changes);

      const expected_inventory_changes = [{ "product_id": "blue_gummies", "num_inventory": 5, "threshold": 10 }]
      expect(mockNotifyOrdersTeam).toHaveBeenCalledWith(expected_inventory_changes);
      expect(inventory.inventory_changed(inventory_changes)).toBe("OK")
    })
  })

  describe("when the inventory change is empty", () => {
    test("It does not notify the orders team", () => {
      inventory_changes = []
      const result = inventory.inventory_changed(inventory_changes);
      expect(mockNotifyOrdersTeam).not.toHaveBeenCalled();
      expect(inventory.inventory_changed(inventory_changes)).toBe("OK")
    })
  })
})
