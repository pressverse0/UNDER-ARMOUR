import { Router, type IRouter } from "express";

const checkoutRouter: IRouter = Router();

checkoutRouter.post("/checkout", async (req, res): Promise<void> => {
  const { items, customerInfo } = req.body as {
    items?: Array<{ price: number; quantity?: number }>;
    customerInfo?: { email?: string };
  };

  if (!items || !Array.isArray(items) || items.length === 0) {
    res.status(400).json({ error: "No items provided" });
    return;
  }

  if (!customerInfo?.email) {
    res.status(400).json({ error: "Customer email is required" });
    return;
  }

  const orderId = `UA-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  const total = items.reduce(
    (sum, item) => sum + item.price * (item.quantity ?? 1),
    0,
  );

  const successUrl = `/checkout/success?orderId=${orderId}&total=${total.toFixed(2)}&email=${encodeURIComponent(customerInfo.email)}`;

  req.log.info({ orderId, total, email: customerInfo.email }, "Checkout order created");

  res.json({ url: successUrl });
});

export default checkoutRouter;
