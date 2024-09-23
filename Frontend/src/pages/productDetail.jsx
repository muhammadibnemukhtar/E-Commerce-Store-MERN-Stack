import { useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import DetailsOrCart from "../components/detailsMapping";

const ProductDetail = () => {
  const [product, setProducts] = useState([{}]);
  const id = useParams().id;

  const Product = async () => {
    const response = await axios.get("http://localhost:5000/products/" + id);
    // console.log(response.data);
    setProducts(response.data);
  };

  useEffect(() => {
    Product();
  },[]);

  return (
    <>
      <Navbar />
      {product.map((product) => {
        return (
            <DetailsOrCart
              title={product.title}
              price={product.price}
              description={product.description}
              imageUrl={product.imageUrl}
              category={product.category}
              quantity={product.quantity}
              item={product}
              key={product._id}
            />
        );
      })}
    </>
  );
};

export default ProductDetail;
