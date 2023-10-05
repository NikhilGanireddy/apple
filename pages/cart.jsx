import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import Header from "@/components/Header";
import axios from "axios";
import Input from "@/components/Input";
import { useParams } from "next/navigation";
import { set } from "mongoose";

export default function CartPage() {
  const { cartProducts, addProduct, removeProducts, setCartProducts } =
    useContext(CartContext);
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios
        .post("/api/cart", { ids: cartProducts })
        .then((response) => setProducts(response.data));
    } else setProducts([]);
  }, [cartProducts]);

  const productsNumber = (theProduct) => {
    return cartProducts.filter((id) => id === theProduct._id).length;
  };

  const moreOfThis = (id) => {
    addProduct(id);
  };

  const lessOfThis = (id) => {
    removeProducts(id);
  };

  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }

  const goToPayment = async () => {
    const responseee = await axios.post("/api/checkout", {
      name,
      email,
      mobile,
      city,
      postCode,
      address,
      cartProducts,
    });

    setCartProducts([]);
    setProducts([]);
    if (responseee.data.url) {
      window.location = responseee.data.url;
    }
  };

  return (
    <div className=" flex flex-col gap-12 bg-gray-100">
      <Header />
      <div className="container py-12 grid grid-rows-2  lg:grid-cols-3 mx-auto gap-6 px-4 rounded-2xl">
        <div className="bg-white row-span-1 lg:col-span-2 shadow-sm rounded-2xl flex flex-col p-4 gap-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Cart Products</h2>
            <div className="text-2xl font-bold">${total}</div>
          </div>
          {products?.length > 0 ? (
            <div className="rounded-2xl">
              {products.map((product) => (
                <div
                  className="grid grid-cols-6 gap-4 shadow-lg p-4 rounded-2xl"
                  key={product._id}
                >
                  <div className="flex justify-start items-center col-span-4">
                    <img
                      src={product.images}
                      className="max-w-[100px] w-auto"
                    />
                    <h1>{product.title}</h1>
                  </div>
                  <div className="flex justify-center items-center gap-2">
                    <div
                      className="px-4 py-2 rounded-full bg-gray-200 cursor-pointer"
                      onClick={() => moreOfThis(product._id)}
                    >
                      +
                    </div>
                    <h1 className=" px-4  py-2 rounded-lg bg-gray-200">
                      {productsNumber(product)}
                    </h1>
                    <div
                      className="px-4 py-2 rounded-full bg-gray-200 cursor-pointer"
                      onClick={() => lessOfThis(product._id)}
                    >
                      -
                    </div>
                  </div>
                  <div className="col-span-1 flex justify-center items-center">
                    {productsNumber(product) * product.price}$
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>There aren't products in your cart</div>
          )}
        </div>
        <div className="row-span-1 h-max lg:col-span-1 shadow-sm bg-white rounded-2xl p-4 gap-6 flex flex-col">
          <h2 className="text-2xl font-bold">Cart Info</h2>
          <form className="w-full flex flex-col justify-center items-center gap-2">
            <Input
              type="text"
              placeholder="Name"
              value={name}
              name="name"
              onChange={(ev) => setName(ev.target.value)}
            />
            <Input
              type="text"
              placeholder="Email"
              value={email}
              name="email"
              onChange={(ev) => setEmail(ev.target.value)}
            />
            <Input
              type="text"
              placeholder="Mobile"
              value={mobile}
              name="mobile"
              onChange={(ev) => setMobile(ev.target.value)}
            />
            <div className="w-full flex gap-2 flex-col md:flex-row">
              <Input
                type="text"
                placeholder="City"
                value={city}
                name="city"
                onChange={(ev) => setCity(ev.target.value)}
              />
              <Input
                type="text"
                placeholder="Post code"
                value={postCode}
                name="postCode"
                onChange={(ev) => setPostCode(ev.target.value)}
              />
            </div>
            <Input
              type="text"
              placeholder="Sreet Address"
              value={address}
              name="address"
              onChange={(ev) => setAddress(ev.target.value)}
            />
            <input
              type="hidden"
              value={cartProducts.join(",")}
              name="products"
            />
            <button
              onClick={(ev) => {
                ev.preventDefault();
                goToPayment();
              }}
              className="border-btn mt-2"
            >
              Proceed to checkout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
