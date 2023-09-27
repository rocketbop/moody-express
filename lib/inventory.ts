const mailer = require("./mailer")

const thresholds = {
  blue_gummies: 10,
  green_gummies: 10
}

const thresholdIsExceeded = (product_id, num_inventory) => {
  return (num_inventory < thresholds[product_id]) ? true : false
}

const inventory_changed = (data) => {
  const notificationNeeded = data.reduce((accumulator, { product_id, num_inventory }) => {
    if (thresholdIsExceeded(product_id, num_inventory)) {
      threshold = thresholds[product_id]
      accumulator.push({ product_id, num_inventory, threshold });
    }
    return accumulator;
  }, []);

  if (notificationNeeded.length != 0) {
    mailer.notify_orders_team(notificationNeeded)
  }

  return "OK";
}

exports.inventory_changed = inventory_changed
