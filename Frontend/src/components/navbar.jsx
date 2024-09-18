import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../assets/croppedlogo.png";
import CustomDropdown from "./dropdown";

const Navbar = () => {
  const { loggedin, isAdmin } = useSelector((state) => state.loginAdmin);

  return (
    <div className="flex flex-col items-center justify-evenly h-32">
      <div className="w-full h-[60%] flex items-center justify-center relative">
        <img src={logo} alt="logo" className="h-2/3" />
        <img
          width="50"
          height="50"
          src="https://img.icons8.com/ios-glyphs/60/f59800/fast-cart.png"
          alt="fast-cart"
          className="top-[4.5] right-[70px] p-1 absolute"
        />
        <span className="absolute top-6 right-11 text-lg font-semibold text-white bg-gray-700 px-1.5 rounded-xl">
          0
        </span>
      </div>
      {!loggedin ? (
        <div className="flex items-center justify-evenly w-full h-[40%] text-white bg-gray-700 px-[5%] md:px-[10%] lg:px-[20%] font-normal">
          <Link to="/" className="hover:text-[#ff7004] duration-200">
            Home
          </Link>
          <Link to="/products" className="hover:text-[#ff7004] duration-200">
            Products
          </Link>
          <CustomDropdown
            options={["Clothing", "Electronics", "Grocery", "Jewelery"]}
          />
          <Link to="/login" className="hover:text-[#ff7004] duration-200">
            Login
          </Link>
          <Link to="/signup" className="hover:text-[#ff7004] duration-200">
            Signup
          </Link>
        </div>
      ) : loggedin && isAdmin ? (
        <div className="flex items-center justify-evenly w-full h-[35%] text-gray-700 bg-gray-300 px-[5%] md:px-[10%] lg:px-[20%] font-normal">
          <Link to="/" className="hover:text-[#ff7004] duration-200">
            Home
          </Link>
          <Link to="/products" className="hover:text-[#ff7004] duration-200">
            Products
          </Link>
          <CustomDropdown
            options={["Clothing", "Electronics", "Grocery", "Jewelery"]}
          />
          <Link to="/addProducts" className="hover:text-[#ff7004] duration-200">
            Add Products
          </Link>
          <Link to="/register" className="hover:text-[#ff7004] duration-200">
            Register
          </Link>
        </div>
      ) : (
        <div className="flex items-center justify-evenly w-full h-[35%] text-white bg-gray-700 px-[5%] md:px-[10%] lg:px-[20%] font-normal">
          <Link to="/" className="hover:text-[#ff7004] duration-200">
            Home
          </Link>
          <Link to="/products" className="hover:text-[#ff7004] duration-200">
            Products
          </Link>
          <CustomDropdown
            options={["Clothing", "Electronics", "Grocery", "Jewelery"]}
          />
        </div>
      )}
    </div>
  );
};

export default Navbar;
