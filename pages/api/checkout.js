import { mongooseConnection } from "@/libs/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Products";

const stripe = require("stripe")(
  "sk_test_51NHRwGSH0adHgx41MXj6hjI1jjB5ie7srv5EvewvqWstnxSOe1TbFoBXxPn5VKKpCb6jX9uaBhz5j3BLRoSfDEJ5004R5oNHpQ"
);

export default async function checkoutHanlder(req, res) {
  if (req.method !== "POST") {
    res.json("should be a post ");
    return;
  }
  await mongooseConnection();
  const { name, email, city, postCode, mobile, address, cartProducts } =
    req.body;
  const uniqueIds = [...new Set(cartProducts)];

  const productInfos = await Product.find({ id: uniqueIds._id });

  let line_items = [];
  for (const productId of uniqueIds) {
    const productInfo = productInfos.find(
      (product) => product._id.toString() === productId.toString()
    );
    const quantity = cartProducts.filter((id) => id === productId)?.length || 0;

    if (quantity > 0 && productInfo) {
      line_items.push({
        price_data: {
          currency: "INR",
          unit_amount: quantity * productInfo.price * 100,
          product_data: {
            name: productInfo.title,
          },
        },
        quantity,
      });
    }
  }
  const orderDoc = await Order.create({
    line_items,
    name,
    email,
    address,
    city,
    postCode,
    mobile,
    paid: false,
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    customer_email: email,
    success_url: process.env.PUBLIC_URL + "/cart?success=1",
    cancel_url: process.env.PUBLIC_URL + "/cart?canceled=1",
    metadata: { orderNme: orderDoc.title },
  });

  res.json({
    url: session.url,
  });
}
