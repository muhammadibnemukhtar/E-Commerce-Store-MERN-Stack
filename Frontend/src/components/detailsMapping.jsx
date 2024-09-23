import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem, reduceItem, setCart } from "../redux/features/cartSlice";
import { useNavigate } from "react-router-dom";

const DetailsOrCart = (props) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);
  const loggedin = useSelector((state) => state.loginAdmin.loggedin);
  const [noOFItem, setNoOfItem] = useState(1);
  const navigate = useNavigate();

  console.log(cartItems);
  console.log(window.location.pathname);

  return (
    <div className="flex items-start justify-center max-h-screen w-full pb-5">
      <div className="flex flex-col lg:flex-row items-center justify-between h-auto lg:h-2/3 w-[90%] bg-gray-300 p-8 mt-10">
        <div className="w-full md:w-[45%] lg:w-[40%] h-1/2 lg:h-full bg-white flex items-center justify-center p-5">
          <img
            src={props.imageUrl}
            alt="product"
            className="h-[150px] md:h-[200px] lg:h-[300px]"
          />
        </div>
        <div className="w-full mt-2 lg:mt-0 lg:w-[55%] flex flex-col items-evenly justify-between h-[230px] lg:h-[350px]">
          <h1 className="text-2xl font-semibold text-gray-700">
            {props.title}
          </h1>
          <p className="text-xl font-semibold text-[#f59800]">
            <span className="text-gray-700 text-xl">Price </span> ${props.price}
          </p>
          <p className="text-xl font-semibold text-gray-500 capitalize">
            <span className="text-gray-700 text-xl">Category </span>
            {props.category}
          </p>
          <p className="text-xl font-semibold text-[#f59800]">
            <span className="text-gray-700 text-xl">Stock </span>
            {props.quantity}
          </p>
          {props.counter ? null : (
            <p className="text-md font-semibold text-gray-500">
              <span className="text-gray-700 text-xl">Description: </span>
              {props.description}
            </p>
          )}
          <div className="flex items-center justify-between lg:justify-start mt-3 lg:mt-0">
            <div className="flex items-center justify-start w-2/3 lg:w-[35%]">
              {props.deleteItem ? (
                <button
                  className="bg-[#f59800] hover:bg-orange-500 text-white text-sm font-semibold px-1.5 py-0.5 lg:py-2 lg:px-4 w-2/3 lg:w-[90%]"
                  onClick={() => dispatch(deleteItem(props.item._id))}
                >
                  Delete Item
                </button>
              ) : (
                <div className="w-[full] flex items-center justify-evenly">
                <button
                  className="bg-[#f59800] hover:bg-orange-500 text-white text-sm font-semibold px-1.5 py-0.5 lg:py-2 lg:px-4 w-2/3 lg:w-full"
                  onClick={() => {loggedin? dispatch(setCart([props.item, noOFItem])): navigate("/login", { state: { from: window.location.pathname } })}}
                >
                  Add To Cart
                </button>
                 <img
                 width="30"
                 height="30"
                 src="https://img.icons8.com/ios-glyphs/30/f59800/fast-cart.png"
                 alt="fast-cart"
                 className="ml-2 lg:ml-2 scale-90 lg:scale-100"
               />
                </div>
              )}
            </div>
            {props.counter ? (
              <div className="flex items-center justify-evenly w-[30%]">
                <button
                  className="bg-[#f59800] hover:bg-orange-500 text-white font-semibold px-[8px] lg:py-1.5 lg:px-[14px]"
                  onClick={() => {props.counter > 1 ? dispatch(reduceItem(props.item._id)): null}}
                >
                  -
                </button>
                <span className="font-semibold text-lg text-gray-700">
                  {props.counter}
                </span>
                <button
                  className="bg-[#f59800] hover:bg-orange-500 text-white font-semibold px-[6px]  lg:py-1.5 lg:px-[14px]"
                  onClick={() => dispatch(setCart([props.item, 1]))}
                >
                  +
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-evenly w-1/3">
                <button
                  className="bg-[#f59800] hover:bg-orange-500 text-white font-semibold px-[8px] lg:py-1.5 lg:px-[14px]"
                  onClick={() =>
                    noOFItem > 1
                      ? setNoOfItem(noOFItem - 1)
                      : setNoOfItem(noOFItem)
                  }
                >
                  {" "}
                  -{" "}
                </button>
                <span className="font-semibold text-lg text-gray-700">
                  {noOFItem}
                </span>
                <button
                  className="bg-[#f59800] hover:bg-orange-500 text-white font-semibold px-[6px]  lg:py-1.5 lg:px-[14px]"
                  onClick={() => setNoOfItem(noOFItem + 1)}
                >
                  {" "}
                  +{" "}
                </button>
              </div>
            )}
          </div>
          {props.counter ? 
            <div className="flex items-center justify-center w-full bg-gray-700 py-1 lg:py-2 mt-3 lg:mt-0">
                <pre className="font-semibold text-sm lg:text-lg text-white font-sans">Product Total    $  {props.price}   X   {props.counter}  =  </pre>
                <h1 className="font-semibold text-sm lg:text-lg text-white bg- px-2 py-0.5">$ {(props.price * props.counter).toFixed(2)}</h1>
            </div> : null}
        </div>
      </div>
    </div>
  );
};

export default DetailsOrCart;
