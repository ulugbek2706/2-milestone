import React, { useEffect, useState } from "react";
import "react-phone-number-input/style.css";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  changeIsWaitingChacking,
  loginUser,
} from "./reducers/LoginSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from "react-phone-number-input";
import logo from "./images/photo_2023-07-28_05-02-08.jpg";
import { getSupportPhone } from "./reducers/LoginSlice";
import axios from "axios";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const loading = useSelector((state) => state.login.loading);
  const support_phone = useSelector((state) => state.login.supportPhone);
  const error = useSelector((state) => state.login.error);
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated);
  const isWaitingChecking = useSelector(
    (state) => state.login.isWaitingChecking
  );
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    checkIsPermitted();
    dispatch(getSupportPhone());
  }, []);

  const checkIsPermitted = () => {
    const token = localStorage.getItem("access_token");
    const refresh_token = localStorage.getItem("refresh_token");

    if (token || refresh_token) {
      dispatch(changeIsWaitingChacking(true));
      checkAccessAndNavigate(token, refresh_token);
    }
  };

  const checkAccessAndNavigate = (token, refresh_token) => {
    axios
      .get("http://localhost:8080/api/user/me/public", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        if (res.data) {
          dispatch(changeIsWaitingChacking(false));
          navigate("/admin");
        } else {
          if (refresh_token) {
            refreshAccessToken(refresh_token);
          }
        }
      })
      .catch(() => {
        dispatch(changeIsWaitingChacking(false));
        localStorage.clear();
      });
  };

  const refreshAccessToken = (refresh_token) => {
    axios
      .post("http://localhost:8080/api/auth/refresh/public", null, {
        params: {
          refresh_token: refresh_token,
        },
      })
      .then((res) => {
        localStorage.setItem("access_token", res.data);
        dispatch(changeIsWaitingChacking(false));
        navigate("/admin");
      })
      .catch(() => {
        dispatch(changeIsWaitingChacking(false));
        localStorage.clear();
      });
  };

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
    if (localStorage.getItem("access_token")) {
      if (isAuthenticated) {
        navigate("/admin");
        reset();
      }
    }
  }, [isAuthenticated]);

  if (isWaitingChecking) {
    return (
      <div className={"container-loader"}>
        <div className="loader">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    );
  }


  return (
    <div className="bg-slate-50 py-2">
      <div className="flex flex-col  mt-20 bg-slate-50 ">
        <div className="grid mx-2 place-items-center ">
          <div className=" w-11/12 p-12 px-6 py-10 bg-white rounded-lg shadow-lg sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 sm:px-10 sm:py-6 lg:shadow-lg">
            <div className="w-full p-3 grid place-items-center relative">
              <img
                className="rounded-full w-[120px] h-[120px] absolute top-[-70px] left-auto"
                src={logo}
                alt="logo"
              />
            </div>
            <div className="mt-12 p-4 rounded border border-green-200 bg-green-100">
              <h2>Biz sizni ishingizni osonlashtiramiz</h2>
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
              <div className="relative">
                <input
                  className=" mt-2 appearance-none block w-full outline-green-500 shadow-sm text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="password..."
                  {...register("password", { required: true })}
                />

                <div onClick={()=>setPasswordVisible(!passwordVisible)}>
                  {
                    passwordVisible ? <AiFillEyeInvisible  className="cursor-pointer absolute top-[25%] right-4" size={22}/>:<AiFillEye size={22} className="cursor-pointer absolute top-[25%] right-4"/>
                  }
                </div>
              </div>

              {errors.password && (
                <span className="text-red-800 my-2">password is required</span>
              )}

              <div className="w-full p-3  border border-green-200 bg-green-100 rounded mt-3">
                About company
              </div>
              <div className="w-full p-3 flex items-center justify-between   mt-3">
                <div className="flex items-center gap-2">
                  <label className="flex gap-2 items-center">
                    <input
                      {...register("remember_me")}
                      type="checkbox"
                      className="scale-125"
                    />
                    <span>Remember me</span>
                  </label>
                </div>
                <div className="w-1/3">
                  <button
                    disabled={loading}
                    onClick={handleSubmit}
                    type="submit"
                    className="py-3 w-full text-sm  font-medium  text-white uppercase bg-green-600 rounded-md focus:outline-none hover:bg-green-700 hover:shadow-none"
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
