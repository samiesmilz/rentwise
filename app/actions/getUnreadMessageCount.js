"use server";

import connectDB from "@/config/database";
import Message from "@/models/Message"; // Make sure this import is correct
import { getSessionUser } from "@/utils/getSessionUser";

async function getUnreadMessageCount() {
  await connectDB();

  const sessionUser = await getSessionUser();
  console.log("Session user:", sessionUser);

  if (!sessionUser || !sessionUser.userId) {
    return { success: false, error: "User not authenticated." };
  }

  const { userId } = sessionUser;
  const count = await Message.countDocuments({
    recipient: userId,
    read: false,
  });
  return { count };
}

export default getUnreadMessageCount;
