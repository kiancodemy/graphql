"use client";
import React from "react";
import { useState } from "react";
import { toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function signin() {
  const [name, setname] = useState<string>("");
  const [email, setemail] = useState<string>("");
  const [pass, setpass] = useState<string>("");
  const [confrim, setconfrim] = useState<string>("");
  const [gender, setgender] = useState<string>("");

  const submit = async () => {
    try {
      if (!name || !email || !pass || !confrim || !gender) {
        toast.error(
          <span className="capitalize">fill all empty inputs!</span>,
          {
            position: "top-right",
            transition: Zoom,
            autoClose: 1500,
          }
        );
        setname("");
        setemail("");
        setpass("");
        setconfrim("");
        setgender("");
      } else if (confrim !== pass) {
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
        setname("");
        setemail("");
        setpass("");
        setgender("");
        setconfrim("");
      }
    } catch (err) {}
  };
  return (
    <div className="flex bg-black min-h-[100vh] flex-col justify-center">
      <div className="container mx-auto bg-[#eee]  rounded-m px-5 rounded-md py-6 gap-y-6 lg:max-w-[400px]  max-w-[340px] flex flex-col">
        <h1 className="capitalize text-2xl text-center lg:text-4xl">welcome</h1>
        <div className="flex flex-col gap-y-2">
          <p className="capitalize ">name</p>
          <input
            className="rounded-md focus:outline-none p-2"
            value={name}
            onChange={(e) => {
              setname(e.target.value);
            }}
            type="text"
          />
        </div>
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
            type="text"
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
            type="text"
          />
        </div>
        <div className="flex justify-between">
          <h1 className="capitalize">gender</h1>
          <div
            onChange={(e: any) => setgender(e.target.value)}
            className="flex gap-x-3"
          >
            <div className="flex gap-x-2">
              <h1 className="capitalize">male</h1>
              <input checked={gender === "male"} value="male" type="radio" />
            </div>
            <div className="flex gap-x-2">
              <h1 className="capitalize">female</h1>
              <input
                checked={gender === "female"}
                value="female"
                type="radio"
              />
            </div>
          </div>
        </div>
        <button
          onClick={submit}
          className="capitalize hover:bg-blue-800 duration-500 hover:shadow-md bg-blue-600 text-white rounded-md py-2  "
          type="submit"
        >
          submit
        </button>
      </div>
      ;
    </div>
  );
}
