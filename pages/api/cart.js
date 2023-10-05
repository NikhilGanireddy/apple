import { mongooseConnection } from "@/libs/mongoose";
import { Product } from "@/models/Products";

export default async function cartHandler(req, res) {
  await mongooseConnection();

  const ids = req.body.ids;

  res.json(await Product.find({ _id: ids }));
}
