"use client";
import boomarkProperty from "@/app/actions/bookmarkProperty";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import checkBookmarkStatus from "@/app/actions/checkBookmartStatus";

const BookmarkButton = ({ property }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    checkBookmarkStatus(property._id).then((res) => {
      if (res.error) toast.error(res.error);
      if (res.isBookmarked) setIsBookmarked(res.isBookmarked);
      setLoading(false);
    });
  }, [property._id, userId, checkBookmarkStatus]);

  const handleClick = async () => {
    if (!userId) {
      toast.error("You need to be signed in to bookmark a listing");
      return;
    }

    boomarkProperty(property._id).then((res) => {
      if (res.error) return toast.error(res.error);
      setIsBookmarked(res.isBookmarked);
      toast.success(res.message);
    });
  };
  if (loading) {
    return <p className="text-purple-500">Loading...</p>;
  }
  return isBookmarked ? (
    <button
      onClick={handleClick}
      className="bg-purple-200 border-purple-400 border-dotted border-2 hover:bg-purple-500 text-purple-500 font-semibold w-full py-2 px-4 rounded-lg flex items-center justify-center border-1 border-transparent transition-all duration-300 ease-in-out transform hover:scale-90 active:bg-black hover:text-white"
    >
      <FaBookmark className="mr-2" /> Remove Bookmark
    </button>
  ) : (
    <button
      onClick={handleClick}
      className="bg-green-100 border-black border-dotted border-2 hover:bg-purple-500 text-black hover:text-white font-bold w-full py-2 px-4 rounded-md flex items-center justify-center hover:border-purple-500"
    >
      <FaBookmark className="mr-2" /> Bookmark Property
    </button>
  );
};

export default BookmarkButton;
