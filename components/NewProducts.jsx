import ProductCard from "./ProductCard";

export default function NewProducts({ product }) {
  return (
    <div className=" flex justify-center items-center p-12">
      <div className="container p-4 flex flex-col justify-center items-center gap-12 ">
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          New Products
        </h1>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {product.map((prod) => (
            <ProductCard details={prod} key={prod._id} />
          ))}
        </div>
      </div>
    </div>
  );
}
