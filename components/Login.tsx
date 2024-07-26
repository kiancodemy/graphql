"use client";
import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { logins } from "@/lib/mutation";
import { FaAngleRight } from "react-icons/fa";
import { useState } from "react";
import { useBearStore } from "@/lib/store";
import { toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { protect } from "@/lib/functions/protect";

export default function login() {
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [confrim, setconfrim] = useState("");

  const adder = useBearStore((state) => state.adduser);
  const router = useRouter();
  protect();

  const [logedin, { data, error, loading }] = useMutation(logins);

  useEffect(() => {
    const keyDownHandler = (e: any) => {
      if (e.key === "Enter") {
        e.preventDefault();

        submit();
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  });
  useEffect(() => {
    if (error) {
      toast.error(<span className="capitalize">{error.message}</span>, {
        position: "top-right",
        transition: Zoom,
        autoClose: 1500,
      });
    }
  }, [error]);

  //graphql setup

  const submit = async () => {
    try {
      if (!email || !pass || !confrim) {
        toast.error(
          <span className="capitalize">fill all empty inputs!</span>,
          {
            position: "top-right",
            transition: Zoom,
            autoClose: 1500,
          }
        );

        setemail("");
        setpass("");
        setconfrim("");
        return;
      }
      if (confrim !== pass) {
        toast.error(
          <span className="capitalize">
            confirm password and password are not same
          </span>,
          {
            position: "top-right",
            transition: Zoom,
            autoClose: 1500,
          }
        );

        setemail("");
        setpass("");

        setconfrim("");
        return;
      } else {
        const { data } = await logedin({
          variables: { info: { email, password: pass } },
        });

        adder(data.login);
        toast.success(<span className="capitalize">login succesfylly</span>, {
          position: "top-right",
          transition: Zoom,
          autoClose: 1500,
        });

        setemail("");
        setpass("");

        setconfrim("");
        router.push("/main");
      }
    } catch (err) {
      console.log(error?.message);
    }
  };

  return (
    <div className="flex  min-h-[100vh] flex-col justify-center">
      <div className="container mx-auto bg-[#eee]  rounded-m px-5 rounded-md py-6 gap-y-6 lg:max-w-[400px]  max-w-[340px] flex flex-col">
        <h1 className="capitalize text-2xl font-semibold  text-center lg:text-4xl">
          log in
        </h1>

        <div className="flex flex-col gap-y-2">
          <p className="capitalize ">email</p>
          <input
            className="rounded-md focus:outline-none p-2"
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
            type="text"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <p className="capitalize ">password</p>
          <input
            className="rounded-md focus:outline-none p-2"
            value={pass}
            onChange={(e) => {
              setpass(e.target.value);
            }}
            type="password"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <p className="capitalize ">confirm password</p>
          <input
            className="rounded-md focus:outline-none p-2"
            value={confrim}
            onChange={(e) => {
              setconfrim(e.target.value);
            }}
            type="password"
          />
        </div>

        <button
          onClick={submit}
          disabled={loading}
          className="capitalize hover:bg-blue-800 duration-500 hover:shadow-md bg-blue-600 text-white rounded-md py-2  "
          type="submit"
        >
          submit
        </button>
        <div className="flex lg:flex-row flex-col gap-y-3 gap-x-2  justify-center items-center">
          <h1 className="capitalize font-semibold">dont you have account?!</h1>
          <FaAngleRight className="hidden lg:block "></FaAngleRight>
          <Link
            href="/signup"
            className="hover:bg-blue-800 hover:shadow-md duration-500 capitalize px-6 py-2 bg-blue-600 text-white rounded-md"
          >
            sign up
          </Link>
        </div>
      </div>
      ;
    </div>
  );
}
