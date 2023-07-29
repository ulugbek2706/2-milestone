import React, { useEffect } from "react";
import "react-phone-number-input/style.css";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/slices/login/LoginSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from "react-phone-number-input";
import logo from "./images/photo_2023-07-28_05-02-08.jpg";
import { getSupportPhone } from "../../redux/slices/login/LoginSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.login.loading);
  const support_phone = useSelector((state) => state.login.supportPhone);
  const error = useSelector((state) => state.login.error);
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(getSupportPhone());
  }, []);

  const onSubmit = (data) => {
    const prefix = "+998";
    if (data.phoneNumber.startsWith(prefix) && data.phoneNumber.length === 13) {
      dispatch(loginUser(data));
    } else {
      alert("to'liq uzb nomer kiriting!");
      reset();
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin");
      reset();
    }
  }, [isAuthenticated]);

  return (
    <div className="bg-slate-50 py-2">
      <div className="flex flex-col  mt-20 bg-slate-50 ">
        <div className="grid mx-2 place-items-center ">
          <div className=" w-11/12 p-12 px-6 py-10 bg-white rounded-lg shadow-md sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 sm:px-10 sm:py-6 lg:shadow-lg">
            <div className="w-full p-3 grid place-items-center relative">
              <img
                className="rounded-full w-[120px] h-[120px] absolute top-[-70px] left-auto"
                src={logo}
                alt="logo"
              />
            </div>
            <div className="mt-12 p-4 rounded border border-green-600 bg-green-100">
              <h2>biz sizni ishizni osonlashtiramiz</h2>
            </div>

            {/* form */}

            <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-gray-600 uppercase"
              >
                Phone number
              </label>
              <Controller
                name="phoneNumber"
                control={control}
                defaultValue=""
                rules={{
                  required: "Phone number is required",
                }}
                render={({ field }) => (
                  <PhoneInput
                    international
                    limitMaxLength={true}
                    className="mt-2 appearance-none block w-full outline-green-500 shadow-sm  text-gray-700 border border-gray-200 rounded px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    {...field}
                    defaultCountry="UZ"
                  />
                )}
              />
              {errors.phoneNumber && (
                <span className="text-red-800 my-2">
                  phone number is required
                </span>
              )}
              <label
                htmlFor="password"
                className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
              >
                Password
              </label>
              <input
                className=" mt-2 appearance-none block w-full outline-green-500 shadow-sm text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="password"
                placeholder="password..."
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-red-800 my-2">password is required</span>
              )}

              <div className="w-full p-3  border border-green-600 bg-green-100 rounded mt-3">
                About company
              </div>
              <div className="w-full p-3 flex items-center justify-between   mt-3">
                <div className="flex items-center gap-2">
                  <input
                    {...register("remember_me")}
                    type="checkbox"
                    className="scale-125"
                  />
                  <span>Remember me</span>
                </div>
                <div className="w-1/3">
                  <button
                    onClick={handleSubmit}
                    type="submit"
                    className="py-3 w-full  font-medium  text-white uppercase bg-green-600 rounded-md focus:outline-none hover:bg-green-700 hover:shadow-none"
                  >
                    {loading ? "Loading..." : "To come in >"}
                  </button>
                </div>
              </div>
              <hr />
              <div className="w-full p-3 border rounded mt-3">
                Support service: {support_phone !== null && support_phone}
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

// api/auth/login
