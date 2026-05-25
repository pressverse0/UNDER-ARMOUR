import { Router, type IRouter } from "express";
import Stripe from "stripe";

const checkoutRouter: IRouter = Router();

checkoutRouter.post("/checkout", async (req, res): Promise<void> => {
  const { items, customerInfo } = req.body as {
    items?: Array<{ name?: string; price: number; quantity?: number; category?: string }>;
    customerInfo?: { email?: string; fullName?: string; phone?: string; address?: string; city?: string; state?: string; zipCode?: string; country?: string };
  };

  if (!items || !Array.isArray(items) || items.length === 0) {
    res.status(400).json({ error: "No items provided" });
    return;
  }

  if (!customerInfo?.email) {
    res.status(400).json({ error: "Customer email is required" });
    return;
  }

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  if (stripeSecretKey) {
    try {
      const stripe = new Stripe(stripeSecretKey, { apiVersion: "2025-05-28.basil" });

      const lineItems = items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name ?? "Product",
            description: item.category,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity ?? 1,
      }));

      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: { name: "Shipping", description: "Standard shipping" },
          unit_amount: 599,
        },
        quantity: 1,
      });

      const baseUrl = process.env.PUBLIC_URL ?? `https://${process.env.REPLIT_DEV_DOMAIN}`;

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/checkout`,
        customer_email: customerInfo.email,
        metadata: {
          customerName: customerInfo.fullName ?? "",
          phone: customerInfo.phone ?? "",
          address: customerInfo.address ?? "",
          city: customerInfo.city ?? "",
          state: customerInfo.state ?? "",
          zipCode: customerInfo.zipCode ?? "",
          country: customerInfo.country ?? "",
        },
      });

      req.log.info({ sessionId: session.id, email: customerInfo.email }, "Stripe checkout session created");
      res.json({ url: session.url });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Stripe error";
      req.log.error({ error }, "Stripe checkout error");
      res.status(500).json({ error: message });
    }
    return;
  }

  // Fallback: no Stripe key configured — return a local success URL for demo mode
  req.log.warn("STRIPE_SECRET_KEY not set — using demo checkout fallback");
  const orderId = `UA-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  const total = items.reduce((sum, item) => sum + item.price * (item.quantity ?? 1), 0);
  const successUrl = `/checkout/success?orderId=${orderId}&total=${total.toFixed(2)}&email=${encodeURIComponent(customerInfo.email)}`;
  res.json({ url: successUrl });
});

export default checkoutRouter;
