import Stripe from "stripe";
import getDbConnection from "./db";
import { NeonQueryFunction } from "@neondatabase/serverless";

export async function handleCheckoutSessionCompleted({
  session,
  stripe,
}: {
  session: Stripe.Checkout.Session;
  stripe: Stripe;
}) {
  const customerId = session.customer as string;
  const customer = await stripe.customers.retrieve(customerId);
  const priceId = session.line_items?.data[0].price?.id;
  if ("email" in customer && priceId) {
    const sql = await getDbConnection();
    await createOrUpdateUser(sql, customer, customerId);
    //Updating the user
    await updateUserSubscription(sql, priceId, customer.email as string)
    //Insert payment
    await insertPayment
  }
}

async function createOrUpdateUser(
  sql: NeonQueryFunction<false, false>,
  customer: Stripe.Customer,
  customerId: string
) {
  try {
    // const sql = await getDbConnection();
    const user = await sql`SELECT * FROM users WHERE email=${customer.email}`;
    if (user.length === 0) {
      await sql`INSERT INTO users (email, full_name, customer_id) VALUES (${customer.email}, ${customer.name}, ${customerId})`;
    }
  } catch (err) {
    console.log("Error inserting/updating customer");
  }
}

async function updateUserSubscription(
  sql: NeonQueryFunction<false, false>,
  priceId: string,
  email: string
) {
  try {
    // const sql = await getDbConnection();
    await sql`UPDATE users SET price_id=${priceId}, status="active" WHERE email=${email}`;
  } catch (err) {
    console.log("Error updating customer");
  }
}
