This app is a small example of an inventory alerting service.

## Running

yarn install
yarn test

## About

We split up the app into three parts;
- Webhook that's a route using Express
- Inventory module that handles the payload from the webhook
- A mailer module

## What is missing

If we were to build this out in a longer timespan, we would do the following

- Test the nodemailer properly using nodemailer-mock
- Test the body slightly differently, here we have an exported _body function that I did to save time because I never used nodemailer before and I didn't have more time_
- Add more typechecks, for example we should check that the inventory_changes function takes an array rather than null
- Perhap notify the team when we receive bad data, because it would indicate a bug in the ERP
- Add an interface to define our threshold data structure
- Importantly, we would want a backoff so we don't keep sending the same email to our orders team. So we can do this with a simple events table in prod, where we ecide we only send a mail for a given product_id once per day or week, etc. 
