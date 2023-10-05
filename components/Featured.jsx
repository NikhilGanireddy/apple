import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";

export default function Featured({ product }) {
  const { addProduct } = useContext(CartContext);

  return (
    <div className={" bg-neutral-800  flex justify-center items-center"}>
      <div className={"container grid gap-12 grid-cols-2 md:grid-cols-6 p-4"}>
        <div
          className={
            "flex col-span-3 flex-col gap-4 text-gray-400 justify-center"
          }
        >
          <h1 className={"text-left w-full text-4xl font-bold text-white"}>
            {product?.title}
          </h1>
          <p className={"text-sm"}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
          <div className={"flex items-center gap-2 mt-4"}>
            <Link className={"primary-btn"} href={"/products/" + product?._id}>
              Read More
            </Link>
            <button
              onClick={() => addProduct(product._id)}
              className={"secondary-btn flex items-center justify-center gap-2"}
            >
              <FaShoppingCart size={20} />
              <span>Add to cart</span>
            </button>
          </div>
        </div>
        <div className={"col-span-3 flex justify-center "}>
          <img
            className={"w-full rounded-2xl h-auto object-cover"}
            src={product?.images}
            alt={"macbook"}
          />
        </div>
      </div>
    </div>
  );
}
