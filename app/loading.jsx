"use client";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: " 100px auto",
};
const LoadingPage = () => {
  return (
    <ClipLoader
      color="purple"
      cssOverride={override}
      size={150}
      aria-label="Loading spinner"
    />
  );
};
export default LoadingPage;
