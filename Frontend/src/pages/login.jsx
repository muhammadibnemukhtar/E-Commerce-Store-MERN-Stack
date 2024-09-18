import axios from "axios";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as yup from "yup";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { adminLogin, login } from "../redux/features/login&AdminSlicer";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const defaultValues = {
    password: "",
    email: "",
  };

  const validationSchema = yup.object().shape({
    password: yup.string().required("Please Enter Password"),
    email: yup.string().required("Please Enter Email").email("Invalid Email"),
  });

  const handleSubmit = async (values) => {
    console.log(values);
    const response = await axios.post(
      "http://localhost:5000/user/login",
      values
    );
    console.log(response.data);
    Cookies.set("token", response.data);
    const user = jwtDecode(response.data);
    console.log(user);
    if (response.status === 200) {
      user.admin === true ? dispatch(adminLogin(user.id)) : dispatch(login());
      navigate("/");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen max-w-screen-sm md:max-w-screen-md lg:max-w-screen-2xl bg-[#323637]">
      <div className="flex flex-col items-center justify-center w-3/4 md:w-1/2 lg:w-1/2 xl:w-[30%] h-[30%] md:h-[40%] lg:h-[50%] bg-[#ff7004] px-3 pt-4 lg:pt-5  rounded-xl">
        <h1 className="text-3xl text-white font-semibold pt-1 lg:py-1">
          Welcome
        </h1>
        <Formik
          initialValues={defaultValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="flex flex-col items-center justify-evenly lg:justify-center w-full h-full lg:px-1 mb-3">
            <div className="w-full h-[38%]">
              <label className="text-[12px] lg:text-base text-white font-semibold pl-1">
                Email
              </label>
              <Field
                type="text"
                name="email"
                placeholder="Email"
                className="w-full h-2/4 rounded-md lg:rounded-lg px-2 text-[#323637] font-semibold focus:outline-none"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-[8px] lg:text-[12px] text-white pl-1"
              />
            </div>
            <div className="w-full h-[38%]">
              <label className="text-[12px] lg:text-base text-white font-semibold pl-1">
                Password
              </label>
              <Field
                type="text"
                name="password"
                placeholder="Password"
                className="w-full h-2/4 rounded-md lg:rounded-lg px-2 text-[#323637] font-semibold focus:outline-none"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-[8px] lg:text-[12px] text-white pl-1"
              />
            </div>

            <button
              type="submit"
              className="text-md lg:text-lg  text-[#323637] font-semibold bg-white py-0.5 px-1.5 lg:py-1 lg:px-3 mt-1.5 lg:mt-2 rounded-md lg:rounded-lg "
            >
              Submit
            </button>
            <p className="text-[8px] lg:text-[12px] text-white mt-3 lg:mt-4">
              Don't have an account?{" "}
              <span
                className="text-[8px] lg:text-[12px] text-white hover:underline hover:cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                Register
              </span>
            </p>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
