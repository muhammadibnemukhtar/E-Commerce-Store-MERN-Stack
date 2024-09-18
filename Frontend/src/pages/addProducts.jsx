import axios from "axios";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const AddProducts = () => {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.loginAdmin.userId);
  const defaultValues = {
    title: "",
    price: "",
    description: "",
    imageUrl: "",
    category: "",
    quantity: "",
  };

  const validationSchema = yup.object().shape({
    title: yup.string().required("Please Enter Product Name"),
    description: yup.string().required("Please Enter Description"),
    imageUrl: yup.string().required("Please Enter Image Url"),
    category: yup.string().required("Please Enter Category"),
    price: yup.number().required("Please Enter Price"),
    quantity: yup.number().required("Please Enter Quantity"),
  });

  const handleSubmit = async (values) => {
    values.userId = userId;
    console.log(values);
    const response = await axios.post(
      "http://localhost:5000/products/add",
      values
    );
    console.log(response);
    if (response.status === 201) {
      navigate("/login");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen max-w-screen-sm md:max-w-screen-md lg:max-w-screen-2xl bg-[#323637]">
      <div className="flex flex-col items-center justify-center w-3/4 md:w-1/2 lg:w-3/5 xl:w-1/3 h-[30%] md:h-[40%] lg:h-3/4 bg-[#ff7004] px-3 pt-2 lg:pt-3  rounded-xl">
        <h1 className="text-xl lg:text-3xl text-white font-semibold pb-2 lg:pb-4">
          Add Product Details
        </h1>
        <Formik
          initialValues={defaultValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="flex flex-col items-center justify-evenly w-full h-full lg:px-1 lg:pb-3">
            <div className="w-full h-[16%]">
              <Field
                type="text"
                name="title"
                placeholder="Product Name"
                className="w-full h-2/3 rounded-md lg:rounded-lg px-2 text-[#323637] font-medium focus:outline-none text-[8]"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-[6px] lg:text-[9px] text-white pl-1"
              />
            </div>
            <div className="w-full h-[16%]">
              <Field
                type="Number"
                name="price"
                placeholder="Product Price"
                className="w-full h-2/3 rounded-md lg:rounded-lg px-2 text-[#323637] font-medium focus:outline-none text-[8]"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-[6px] lg:text-[9px] text-white pl-1"
              />
            </div>
            <div className="w-full h-[16%]">
              <Field
                type="text"
                name="description"
                placeholder="Product Description"
                className="w-full h-2/3 rounded-md lg:rounded-lg px-2 text-[#323637] font-medium focus:outline-none text-[8]"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-[6px] lg:text-[9px] text-white pl-1"
              />
            </div>

            <div className="w-full h-[16%]">
              <Field
                type="text"
                name="imageUrl"
                placeholder="Product Image Url"
                className="w-full h-2/3 rounded-md lg:rounded-lg px-2 text-[#323637] font-medium focus:outline-none text-[8]"
              />
              <ErrorMessage
                name="imageUrl"
                component="div"
                className="text-[6px] lg:text-[9px] text-white pl-1"
              />
            </div>

            <div className="w-full h-[16%]">
              <Field
                type="text"
                name="category"
                placeholder="Product Category"
                className="w-full h-2/3 rounded-md lg:rounded-lg px-2 text-[#323637] font-medium focus:outline-none text-[8]"
              />
              <ErrorMessage
                name="category"
                component="div"
                className="text-[6px] lg:text-[9px] text-white pl-1"
              />
            </div>

            <div className="w-full h-[16%]">
              <Field
                type="Number"
                name="quantity"
                placeholder="Product Quantity"
                className="w-full h-2/3 rounded-md lg:rounded-lg px-2 text-[#323637] font-medium focus:outline-none text-[8]"
              />
              <ErrorMessage
                name="quantity"
                component="div"
                className="text-[6px] lg:text-[9px] text-white pl-1"
              />
            </div>

            <button
              type="submit"
              className="text-md lg:text-lg  text-[#323637] font-semibold bg-white py-0.5 px-1.5 lg:py-1 lg:px-3 mb-1.5 rounded-md lg:rounded-lg "
            >
              Submit
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AddProducts;
