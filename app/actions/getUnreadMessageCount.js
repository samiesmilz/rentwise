"use server";

import connectDB from "@/config/database";
import Message from "@/models/Message"; // Make sure this import is correct
import { getSessionUser } from "@/utils/getSessionUser";

async function getUnreadMessageCount() {
  try {
    await connectDB();
  } catch (error) {
    return { success: false, error: "Database connection failed." };
  }

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    return { success: false, error: "User not authenticated." };
  }

  const { userId } = sessionUser;
  let count;
  try {
    count = await Message.countDocuments({
      recipient: userId,
      read: false,
    });
  } catch (error) {
    return { success: false, error: "Failed to count unread messages." };
  }

  return { count };
}

export default getUnreadMessageCount;
