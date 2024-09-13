import React from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { useRouter } from "next/router";
import Link from "next/link";

const AuthErrorPage = () => {
  const router = useRouter();
  const { error } = router.query;

  return (
    <section className="min-h-screen flex-grow">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-24 mb-4 shadow-md rounded-lg border m-4 md:m-0">
          <div className="flex justify-center">
            <FaExclamationCircle className="text-purple-400 text-8xl" />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold mt-4 mb-2">
              Authentication Error
            </h1>
            <p className="text-gray-500 text-xl mb-10">
              {error
                ? error.toString()
                : "An error occurred during authentication"}
            </p>
            <Link
              href="/"
              className="bg-purple-300 hover:bg-purple-400 text-white font-bold py-4 px-12 rounded"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthErrorPage;
