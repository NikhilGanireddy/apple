import Link from "next/link";
import { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "./CartContext";

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  return (
    <header
      className={
        "  w-full bg-neutral-800 text-white flex justify-center items-center"
      }
    >
      <nav className={"container  items-center flex justify-between p-4"}>
        <div className={"text-xl font-bold"}>Ecommerce</div>
        <div className={"justify-center gap-4 hidden md:flex"}>
          <Link href={"/"}>Home</Link>
          <Link href={"/products"}>All products</Link>
          <Link href={"/categories"}>Categories</Link>
          <Link href={"/account"}>Account</Link>
          <Link
            href={"/cart"}
            className={"flex justify-center items-center gap-2"}
          >
            <FaShoppingCart /> ({cartProducts.length})
          </Link>
        </div>
      </nav>
    </header>
  );
}
