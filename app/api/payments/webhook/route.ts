import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/mongodb";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    // For mock payments, we'll simulate webhook handling
    // In a real implementation, you'd verify the Stripe signature

    let event;

    try {
      // Parse the mock event
      event = JSON.parse(body);
    } catch (err) {
      console.error("Webhook error: Invalid JSON");
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        const userId = paymentIntent.metadata?.userId;

        if (userId) {
          // Create order from cart
          await handleSuccessfulPayment(userId, paymentIntent.id);
        }
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

async function handleSuccessfulPayment(userId: string, paymentIntentId: string) {
  try {
    // Get user's cart
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      console.error("No cart found for user:", userId);
      return;
    }

    // Calculate total
    const totalAmount = cart.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    // Create order
    const order = await prisma.order.create({
      data: {
        userId,
        totalAmount,
        status: "PAID",
        paymentIntent: paymentIntentId,
        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
    });

    // Clear cart
    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    // Simulate order status progression
    setTimeout(() => updateOrderStatus(order.id, "PROCESSING"), 5000);
    setTimeout(() => updateOrderStatus(order.id, "SHIPPED"), 15000);
    setTimeout(() => updateOrderStatus(order.id, "DELIVERED"), 30000);

    console.log("Order created successfully:", order.id);
  } catch (error) {
    console.error("Error handling successful payment:", error);
  }
}

async function updateOrderStatus(orderId: string, status: string) {
  try {
    await prisma.order.update({
      where: { id: orderId },
      data: { status: status as any },
    });
    console.log(`Order ${orderId} status updated to ${status}`);
  } catch (error) {
    console.error("Error updating order status:", error);
  }
}