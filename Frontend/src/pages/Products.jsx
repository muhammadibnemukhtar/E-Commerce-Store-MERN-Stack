import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import axios from "axios";
import ProductsMapping from "../components/productsmapping";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/features/productsSlicer";
import banner from "../assets/all_products.jpg";

const Products = () => {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  const allProduct = async () => {
    const response = await axios.get("http://localhost:5000/products");
    console.log(response.data);
    dispatch(setProducts(response.data));
  };

  useEffect(() => {
    if (products.length === 0) allProduct();
  }, []);

  return (
    <div className="flex flex-col mb-10">
      <Navbar />
      <img src={banner} alt="banner" className="w-full" />
      {/* <h1>Products</h1> */}
      <div className="flex items-center justify-center bg-gray-700">
        <h1 className="text-2xl font-semibold text-white self-center my-2 pb-0.5 ">
          All Products
        </h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4 gap-9 mt-5 px-16">
        {products.map((product) => {
          return (
            <div key={product._id} className="flex items-center justify-center">
              <ProductsMapping
                title={product.title}
                price={product.price}
                imageUrl={product.imageUrl}
                category={product.category}
                _id={product._id}
                item={product}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
