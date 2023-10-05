import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Featured from "@/components/Featured";
import { Product } from "@/models/Products";
import { mongooseConnection } from "@/libs/mongoose";
import NewProducts from "@/components/NewProducts";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ product, newProducts }) {
  // console.log(product);
  return (
    <>
      <Header />
      <Featured product={product} />
      <NewProducts product={newProducts} />
    </>
  );
}

export async function getServerSideProps() {
  const productId = "648b3df4cda00cd7e469372b";
  await mongooseConnection();
  const product = await Product.findById(productId);
  const newProducts = await Product.find({}, null, { sort: { _id: -1 } });
  // console.log(newProducts);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
