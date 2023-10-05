import mongoose, { model, models, Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: {
      type: String,
      default:
        "https://images.hindustantimes.com/tech/img/2022/07/29/960x540/IMG_4284_1657976137822_1659067579143_1659067579143.jpg",
    },
    category: { type: mongoose.Types.ObjectId, ref: "Category" },
  },
  { timestamps: true }
);

export const Product = models.Product || model("Product", ProductSchema);
