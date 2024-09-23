import { useSelector } from "react-redux";
import Navbar from "../components/navbar";
import DetailsOrCart from "../components/detailsMapping";
import { useEffect, useState } from "react";
import {loadStripe} from '@stripe/stripe-js';
import axios from 'axios';
const paymentKey = import.meta.env.VITE_STRIPE_SECRET_KEY;

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cart);
  const [total, setTotal] = useState(0);

  console.log(cartItems);

  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.item.price * item.counter;
    });
    setTotal(total);
  };

  const makePayment = async () => {
    const stripe = await loadStripe(paymentKey);

    const response = await axios.post("http://localhost:5000/checkout/payment", cartItems);

    const result = stripe.redirectToCheckout({
      sessionId: response.data.id,
    })

    if (result.error) {
      alert(result.error.message);
    }
  };




  useEffect(() => {
    calculateTotal();
  }, [cartItems]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-start">
        <div className="w-full lg:w-[70%]">
          {cartItems.length === 0 ? (
            <div className="flex items-center justify-center w-full lg:h-[400px]">
              <h1 className="text-3xl">No items in cart</h1>
            </div>
          ) : (
            cartItems.map((item) => {
              return (
                <DetailsOrCart
                  title={item.item.title}
                  price={item.item.price}
                  description={item.item.description}
                  imageUrl={item.item.imageUrl}
                  category={item.item.category}
                  quantity={item.item.quantity}
                  item={item.item}
                  key={item.item._id}
                  deleteItem={true}
                  counter={item.counter}
                />
              );
            })
          )}
        </div>
        <div className="flex flex-col items-center justify-center w-[28%]">
          <div className="flex flex-col items-center lg:items-start justify-start w-full bg-gray-300 mt-10 p-4">
            <h1 className="text-2xl font-bold self-center text-gray-700 mb-3">
              Cart Summary
            </h1>
            <div className="flex flex-col items-start justify-between w-full h-full">
              {cartItems.map((item) => {
                return (
                  <div className="flex items-start justify-between w-full px-1 my-1">
                    <h1 className="text-base font-bold truncate w-[50%] text-gray-700">
                      {item.item.title}
                    </h1>
                    <h1
                      className="text-base font-bold text-gray-700"
                      key={item.item._id}
                    >
                      <span className="text-[10px]">
                        {item.item.price} x {item.counter}&nbsp;&nbsp;
                      </span>{" "}
                      = &nbsp;&nbsp;${" "}
                      {(item.item.price * item.counter).toFixed(2)}
                    </h1>
                  </div>
                );
              })}
              <div className="flex items-start justify-between w-full mt-3 bg-[#f59800] text-white px-3 py-1">
                <h1 className="text-lg font-bold">Grand Total</h1>
                <h1 className="text-lg font-bold">
                  {" "}
                  &nbsp;=&nbsp;&nbsp; $ {total.toFixed(2)}
                </h1>
              </div>
            </div>
          </div>
          <button className="w-full py-2 mt-5 bg-gray-700 text-xl text-white font-semibold active:scale-[97%] duration-200" onClick={makePayment}>
            Make Payment
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
