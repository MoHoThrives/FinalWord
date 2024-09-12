import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req: NextRequest) {
  const payload = await req.text();

  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    throw new Error("sig is not defined");
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    throw new Error("STRIPE_SECRET_KEY is not defined");
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded": {
        const session = await stripe.checkout.sessions.retrieve(
          event.data.object.id,
          {
            expand: ["line_items"],
          }
        );
        console.log({ session });
        //Connect to db to create or update user
        break;
      }

      case "checkout.session.completed": {
        const session = await stripe.checkout.sessions.retrieve(
          event.data.object.id,
          {
            expand: ["line_items"],
          }
        );
        console.log({ session });
        break;
      }

      case "customer.subscription.deleted": {
        //connect to db and update user status to cancelled
        const subscriptionId = event.data.object.id
        const subscription = await stripe.subscriptions.retrieve(subscriptionId)
        console.log(subscription)
        break;
      }
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    return NextResponse.json({ status: "success" });
  } catch (err) {
    return NextResponse.json({ status: "failed", err });
  }

  //   Basic Webhook Functionality
  //   return NextResponse.json({
  //     status: "success",
  //   });
}
