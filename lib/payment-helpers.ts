import Stripe from "stripe";
import getDbConnection from "./db";
import { NeonQueryFunction } from "@neondatabase/serverless";

export async function handleSubscriptionDeleted({
  subscriptionId,
  stripe,
}: {
  subscriptionId: string;
  stripe: Stripe;
}) {
    try {
        
    } catch (err) {
        console.log("Error removing subscription")
    }
}

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
    await updateUserSubscription(sql, priceId, customer.email as string);
    //Insert payment
    await insertPayment(sql, session, customer.email as string, priceId);
  }
}

async function insertPayment(
  sql: NeonQueryFunction<false, false>,
  session: Stripe.Checkout.Session,
  email: string,
  priceId: string
) {
  try {
    await sql`INSERT INTO payments (amount, status, stripe_payment_id, user_email, price_id)
        VALUES (${session.amount_total}, ${session.status}, ${session.id}, ${email}, ${priceId})`;
  } catch (err) {
    console.log("Error inserting payment");
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
