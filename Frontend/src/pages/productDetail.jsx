import { useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { setProducts } from "../redux/features/productsSlicer";

const ProductDetail = () => {
  //   const dispatch = useDispatch();
  const [product, setProducts] = useState({});
  const id = useParams().id;
  console.log(id);
  //   const products = useSelector((state) => state.products.products);
  //   console.log(products);

  //   const product = products.find((product) => product._id === id);
  //   console.log(product);

  const Product = async () => {
    const response = await axios.get("http://localhost:5000/products/" + id);
    console.log(response.data);
    setProducts(response.data);
  };

  useEffect(() => {
    Product();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex items-start justify-center min-h-screen w-full pb-10">
        <div className="flex flex-col lg:flex-row items-center justify-between h-auto lg:h-2/3 w-4/5 bg-gray-300 p-8 mt-10">
          <div className="w-full lg:w-[40%] h-1/2 lg:h-full bg-white flex items-center justify-center p-5">
            <img
              src={product.imageUrl}
              alt="product"
              className="h-full lg:h-[300px]"
            />
          </div>
          <div className="w-full mt-2 lg:mt-0 lg:w-[55%] flex flex-col items-evenly justify-between h-full lg:h-[350px]">
            <h1 className="text-2xl font-semibold text-gray-700">
              {product.title}
            </h1>
            <p className="text-xl font-semibold text-[#f59800]">
              <span className="text-gray-700 text-xl">Price </span> $
              {product.price}
            </p>
            <p className="text-xl font-semibold text-gray-500 capitalize">
              <span className="text-gray-700 text-xl">Category </span>
              {product.category}
            </p>
            <p className="text-xl font-semibold text-[#f59800]">
              <span className="text-gray-700 text-xl">Stock </span>
              {product.quantity}
            </p>
            <p className="text-md font-semibold text-gray-500">
              <span className="text-gray-700 text-xl">Description: </span>
              {product.description}
            </p>
            <div className="flex items-center justify-between lg:justify-start mt-3 lg:mt-0">
              <div className="flex items-center justify-start w-2/3 lg:w-[45%]">
                <button className="bg-[#f59800] hover:bg-orange-500 text-white text-sm font-semibold px-1.5 py-0.5 lg:py-2 lg:px-4 w-2/3 lg:w-2/3">
                  Add To Cart
                </button>
                <img
                  width="30"
                  height="30"
                  src="https://img.icons8.com/ios-glyphs/30/f59800/fast-cart.png"
                  alt="fast-cart"
                  className="ml-2 lg:ml-5 scale-90 lg:scale-100"
                />
              </div>
              <div className="flex items-center justify-evenly w-1/3">
                <button className="bg-[#f59800] hover:bg-orange-500 text-white font-semibold px-[8px] lg:py-1.5 lg:px-[14px]">
                  {" "}
                  -{" "}
                </button>
                <span className="">1</span>
                <button className="bg-[#f59800] hover:bg-orange-500 text-white font-semibold px-[6px]  lg:py-1.5 lg:px-[14px]">
                  {" "}
                  +{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
