import { useNavigate } from "react-router-dom";

const ProductsMapping = (props) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-between px-4 pt-4 pb-2.5 shadow-lg bg-gray-300 w-64 h-80 hover:scale-95 duration-300 cursor-pointer ">
      <div className="w-full aspect-w-1 h-3/4 flex items-center justify-center bg-white overflow-hidden group-hover:scale-105 duration-300 p-2.5 group position-relative">
        <img
          src={props.imageUrl}
          alt={props.title}
          className="h-full min-h-full object-contain group-hover:scale-105 duration-300"
        />
        <img
          width="30"
          height="30"
          src="https://img.icons8.com/ios-glyphs/30/f59800/fast-cart.png"
          alt="fast-cart"
          className="absolute top-6 right-6 bg-gray-200 p-1 invisible group-hover:visible ease-in"
        />
      </div>
      <div className="w-full mt-1 flex flex-col items-center justify-around h-1/4">
        <div className="flex flex-col items-start justify-between w-full h-[60%]">
          <h1 className="text-sm text-gray-500 font-semibold capitalize">
            {props.category}
          </h1>
          <h1 className="text-base text-gray-600 font-semibold truncate max-w-56 self-start">
            {props.title}
          </h1>
        </div>
        <div className="flex items-center justify-between w-full mt-1">
          <h1 className="text-md text-[#323637] ">
            <b>Price:</b> ${props.price}
          </h1>
          <button
            className="text-white font-medium bg-[#f59800] px-2 "
            onClick={() => {
              navigate(`/products/${props.category}/${props._id}`);
            }}
          >
            Explore
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsMapping;
