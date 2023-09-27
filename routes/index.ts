const express = require("express");
const router = express.Router();
const inventory = require("./../lib/inventory")

// Our ERP may call the webhook every time inventory changes, and this would be great especially if we had a queue
// to send those events from the ERP side, because we want to avoid out of sequence processing.
// We do not want to process two messages out of order as the end result means we might set the inventory one higher than it is.
// Since we probably do not have this level of sophistication yet our ERP team opted to send inventory change events to the webhook
// periodically, once every ten minutes, for any product that has changed during that window.
// All of that is to say we are going expect an array of products with new inventory amounts, rather than one at a time.
router.post("/webhooks/inventory_changed", function(req, res, next) {
  // Pass the parsed params to the inventory module for handling
  inventory.inventory_changed(req.body)
  // Return an empty head with 200 status
  res.sendStatus(200);
});

module.exports = router;
