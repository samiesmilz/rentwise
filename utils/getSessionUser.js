import { getServerSession } from "next-auth/next";
import authOptions from "@/utils/authOptions";

export const getSessionUser = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return null; // Return null if no session or user found
    }
    return {
      user: session.user,
      userId: session.user.id, // Ensure user.id is defined
    };
  } catch (error) {
    console.error("Error fetching session user:", error);
    return null; // Return null on error
  }
};
