const nodemailer = require("nodemailer");

// Setup needed
const transporter = nodemailer.createTransport({});

const mailOptions = {
  from: "paul@example.com",
  to: "orders_team@example.com"
};

const generateInventoryList = (data) => {
  if (Array.isArray(data) && data.length > 0) {
    const items = data.map(({ product_id, num_inventory }) => {
      return `Product: ${product_id}, Inventory: ${num_inventory}`;
    });
    return items.join("\n");
  } else {
    return "No items to display.";
  }
}

const notifyOrdersTeamBody = (inventoryData) => {
  const message = `
Dear Team,

Some of our inventory is running low. We are including the list of items and the threshold we like to keep on hand.

${generateInventoryList(inventoryData)}`;

  return message;
}

const notifyOrdersTeam = (inventoryData) => {
  const text = notifyOrdersTeamBody(inventoryData)
  const options = { ...text, ...mailOptions };

  transporter.sendMail(options, (error, info) => {
    if (error) {
      console.error("Error:", error);
    }
  });
}

exports.notify_orders_team = notifyOrdersTeam
exports.notify_orders_team_body = notifyOrdersTeamBody
