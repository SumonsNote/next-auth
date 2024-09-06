"use client";

import { doCredentialLogin } from "@/app/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SocialsLogin from "./SocialsLogin";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function onSubmit(event) {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const res = await doCredentialLogin(formData);

      if (!!res.error) {
        setError(res.error.message);
      } else {
        router.push("/home");
      }
    } catch (error) {
      setError("Please check credentials");
    }
  }
  return (
    <>
      <div className="text-xl text-red-500">{error}</div>
      <form
        className="my-5 flex flex-col items-center border p-3 border-gray-200 rounded-md"
        onSubmit={onSubmit}
      >
        <div className="my-2">
          <label htmlFor="email">Email Address</label>
          <input
            className="border mx-2 text-black border-gray-500 rounded"
            type="email"
            name="email"
            id="email"
          />
        </div>

        <div className="my-2">
          <label htmlFor="password">Password</label>
          <input
            className="border mx-2 text-black border-gray-500 rounded"
            type="password"
            name="password"
            id="password"
          />
        </div>

        <button
          type="submit"
          className="bg-orange-300 text-black mt-4 rounded flex justify-center items-center w-36"
        >
          Ceredential Login
        </button>
      </form>
      <SocialsLogin />
    </>
  );
}
