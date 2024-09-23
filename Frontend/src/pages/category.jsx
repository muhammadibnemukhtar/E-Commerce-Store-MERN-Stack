import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import axios from "axios";
import ProductsMapping from "../components/productsmapping";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/features/productsSlicer";
import { useParams } from "react-router-dom";
import Clothing from "../assets/clothes_banner.png";
import jewelery from "../assets/jewelery.jpg";
import electronics from "../assets/Electronics.jpg";
import grocery from "../assets/10022428.jpg";

const Category = () => {
  const products = useSelector((state) => state.products.products);
  const cartItems = useSelector((state) => state.cart.cart);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const dispatch = useDispatch();
  const category = useParams().category;
  // console.log(category);

  const allProduct = async () => {
    const response = await axios.get("http://localhost:5000/products");
    // console.log(response.data);
    dispatch(setProducts(response.data));
  };
  const filter = () => {
    const filteredProducts = products.filter((product) => {
      return (
        product.category == category.toLowerCase() ||
        product.category.includes(category.toLowerCase())
      );
    });
    setFilteredProducts(filteredProducts);
  };

  // console.log(cartItems);
  console.log(filteredProducts);

  useEffect(() => {
    if (products.length === 0) allProduct();
  }, []);

  useEffect(() => {
    filter();
  }, [category, products]);

  return (
    <div className="flex flex-col mb-10">
      <Navbar />
      {category == "Clothing" ? (
        <img src={Clothing} alt="banner" className="w-full" />
      ) : category == "Jewelery" ? (
        <img src={jewelery} alt="banner" className="w-full" />
      ) : category == "Electronics" ? (
        <img src={electronics} alt="banner" className="w-full" />
      ) : category == "Grocery" ? (
        <img src={grocery} alt="banner" className="w-full" />
      ) : null}
      <div className="flex items-center justify-center bg-gray-700">
        <h1 className="text-2xl font-semibold text-white self-center my-3 ">
          {category}
        </h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4 gap-9 mt-5 px-16">
        {filteredProducts.map((product) => {
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

export default Category;
