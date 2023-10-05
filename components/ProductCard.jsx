import { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "./CartContext";

const ProductCard = ({ details }) => {
  const { addProduct } = useContext(CartContext);
  const addFeaturedToCart = () => {
    console.log(details._id);
    addProduct(details._id);
  };

  return (
    <div
      className="p-6 cursor-pointer flex flex-col gap-3 justify-center items-center shadow-md hover:shadow-xl transition-all rounded-2xl"
      key={details._id}
    >
      <img
        className="object-cover rounded-lg h-[100px] w-auto"
        src={details.images}
      />
      <h1 className="text-2xl font-semibold ">{details.title}</h1>
      <div className="flex justify-center items-center gap-2 ">
        <h1 className="font-bold">{details.price}$</h1>
        <button
          onClick={addFeaturedToCart}
          className={" primary-btn flex justify-center items-center gap-2"}
        >
          <FaShoppingCart />
          <span>Add to cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
