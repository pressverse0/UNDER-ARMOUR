import { Router, type IRouter } from "express";
import Stripe from "stripe";
import { lookupProduct } from "../data/products.js";

const checkoutRouter: IRouter = Router();

checkoutRouter.post("/checkout", async (req, res): Promise<void> => {
  const { items, customerInfo } = req.body as {
    items?: Array<{ id: number; quantity?: number }>;
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

  // Resolve authoritative prices server-side — never trust client-provided prices
  const resolvedItems: Array<{ name: string; price: number; category: string; quantity: number }> = [];
  for (const item of items) {
    if (!item.id || typeof item.id !== "number") {
      res.status(400).json({ error: "Each item must have a numeric product id" });
      return;
    }
    const product = lookupProduct(item.id);
    if (!product) {
      res.status(400).json({ error: `Unknown product id: ${item.id}` });
      return;
    }
    resolvedItems.push({ name: product.name, price: product.price, category: product.category, quantity: item.quantity ?? 1 });
  }

  // Derive base URL from request headers — avoids hardcoded env-var assumptions
  const host = (req.headers["x-forwarded-host"] ?? req.headers.host ?? "") as string;
  const proto = (req.headers["x-forwarded-proto"] ?? (req.socket as { encrypted?: boolean }).encrypted ? "https" : "http") as string;
  const baseUrl = process.env.PUBLIC_URL ?? `${proto}://${host}`;

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  if (stripeSecretKey) {
    try {
      const stripe = new Stripe(stripeSecretKey, { apiVersion: "2025-05-28.basil" });

      const lineItems = resolvedItems.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: { name: item.name, description: item.category },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      }));

      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: { name: "Shipping", description: "Standard shipping" },
          unit_amount: 599,
        },
        quantity: 1,
      });

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

  // Demo fallback — no Stripe key configured
  req.log.warn("STRIPE_SECRET_KEY not set — using demo checkout fallback");
  const orderId = `UA-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  const total = resolvedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const successUrl = `/checkout/success?orderId=${orderId}&total=${total.toFixed(2)}&email=${encodeURIComponent(customerInfo.email)}`;
  res.json({ url: successUrl });
});

export default checkoutRouter;
