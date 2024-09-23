import Navbar from "../components/navbar";
import homeBanner from "../assets/Home_Banner.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setProducts } from "../redux/features/productsSlicer";
import axios from "axios";
import ProductsMapping from "../components/productsmapping";
import Cookies from "js-cookie";
import { adminLogin } from "../redux/features/login&AdminSlicer";
import { jwtDecode } from "jwt-decode";

const Home = () => {
  const products = useSelector((state) => state.products.products);
  const { loggedin, isAdmin } = useSelector((state) => state.loginAdmin);
  const dispatch = useDispatch();

  const allProduct = async () => {
    const response = await axios.get("http://localhost:5000/products");
    console.log(response.data);
    dispatch(setProducts(response.data));
  };

  const loginUser =async () => {
    const token = Cookies.get("token");
    console.log(token);
    if (token) {
      const response =await axios.get("http://localhost:5000/user/login", {
        headers: {
          "x-auth-token": token,
        },
      });
      console.log(response.data);
      if (response.status === 200) {
        const user = jwtDecode(response.data);
        console.log(user);
        user.admin === true ? dispatch(adminLogin(user.id)) : dispatch(login());
        Cookies.set("token", response.data);
        // navigate("/");
      };
    };
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    if (products.length === 0) allProduct();
    if (!loggedin) loginUser();
  }, []);

  const shuffledProducts = shuffleArray([...products]).slice(0, 8);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center w-full relative">
        <img
          src={homeBanner}
          alt="home-banner"
          className="w-full object-cover rounded-lg"
        />
        {/* <input placeholder="What are you looking for..." type="text" className="absolute bottom-[150px] left-[295px] w-[36%] h-[54px] border-none focus:outline-none bg-white rounded-full px-4 text-lg text-[#f59800] font-semibold placeholder:text-orange-300"/> */}
      </div>
      <div className="flex items-center justify-center bg-gray-700">
        <h1 className="text-2xl font-semibold text-white self-center my-2 pb-0.5 ">
          Featured Products
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-14 my-5">
        {shuffledProducts.map((product) => {
          return (
            <ProductsMapping
              title={product.title}
              imageUrl={product.imageUrl}
              category={product.category}
              price={product.price}
              item={product}
              key={product._id}
              _id={product._id}
            />
          );
        })}
      </div>
    </>
  );
};

export default Home;
