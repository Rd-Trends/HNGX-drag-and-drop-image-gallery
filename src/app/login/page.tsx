"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import Link from "next/link";
import Logo from "@/components/Logo";
import Head from "next/head";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const router = useRouter();
  const supabase = createClientComponentClient();

  const onSubmit = async (data: { email: string; password: string }) => {
    setIsLoading(true);
    const res = await supabase.auth.signInWithPassword(data);
    if (!res.data.user) {
      setError("root", {
        type: "custom",
        message: res.error?.message,
      });
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    router.push("/");
  };

  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <div className="bg-gray-50 text-darkgrey  min-h-screen flex items-center justify-center py-12">
        <div className="bg-white font-normal shadow-xl w-11/12 md:w-5/12 lg:w-4/12 max-w-[400px] flex flex-col items-start py-8 px-4 rounded-lg">
          <Logo />
          <p className="w-full mt-2">Please sign in into your account</p>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-4">
            <label className=" space-y-2 block mb-4">
              <span>email</span>
              <input
                // type="email"
                data-testid="login-email"
                placeholder="johnDoe@gmail.com"
                className="w-full border border-gray-400 rounded-md py-2 px-4 mt-1 hover:border-blue-500 focus:border-2 focus:border-blue-500 outline-none border-secondary bg-transparent hover:focus:border-primary"
                {...register("email")}
              />
            </label>
            {errors?.email && (
              <p className=" -mt-2 mb-2 text-red-400 ">
                {errors.email.message}
              </p>
            )}

            <label className=" space-y-2">
              <span>password</span>
              <div className=" relative flex items-center">
                <input
                  data-testid="login-password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="********"
                  className="block border border-gray-400 hover:border-blue-500 focus:border-2 focus:border-blue-500 w-full outline-none py-2 px-4 rounded-md bg-transparent"
                  {...register("password")}
                />
                <button
                  type="button"
                  className="absolute right-4 t--1/2 translate--y-1/2 outline-none bg-transparent h-full"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPassword(!showPassword);
                  }}
                  aria-label="Toggle password vissibility">
                  {showPassword ? <BsEyeSlash /> : <BsEye />}
                </button>
              </div>
            </label>
            {errors?.password && (
              <p className=" mt-2 mb-2 text-red-400">
                {errors.password.message}
              </p>
            )}
            <button
              data-testid="login-submit"
              type="submit"
              className="mt-8 w-full py-2 flex items-center justify-center px-4 text-white rounded-md shadow-[0px_1px_6px_rgba(0,0,0,0.1)] bg-blue-500 border-none outline-none hover:opacity-70 focus:opacity-70">
              {!isLoading ? (
                "Sign In"
              ) : (
                <>
                  <span className=" w-5 h-5 border-4 border-gray-200 border-b-transparent rounded-full animate-spin"></span>
                  <span className="pl-4"> Processing...</span>
                </>
              )}
            </button>
            {errors?.root && (
              <p className=" mt-2 text-red-400">{errors?.root?.message}</p>
            )}
          </form>

          <p className="mt-5">
            {" Don't have an account?"}{" "}
            <Link href="/signup" className=" underline font-bold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

const schema = yup.object({
  email: yup.string().email().required("email must be provided"),
  password: yup.string().required("password must be provided"),
});
