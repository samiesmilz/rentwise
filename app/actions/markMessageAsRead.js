"use server";

import connectDB from "@/config/database";
import Message from "@/models/Message"; // Make sure this import is correct
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function markMessageAsRead(messageId) {
  try {
    await connectDB();
    console.log("Connected to DB");

    const sessionUser = await getSessionUser();
    console.log("Session user:", sessionUser);

    if (!sessionUser || !sessionUser.userId) {
      return { success: false, error: "User not authenticated." };
    }

    const { userId } = sessionUser;
    console.log("Searching for message with ID:", messageId);

    const message = await Message.findById(messageId);
    console.log("Found message:", message);

    if (!message) {
      return { success: false, error: "Message not found" };
    }

    // verify message ownership
    if (message.recipient.toString() !== userId) {
      return { success: false, error: "Unauthorized" };
    }

    message.read = !message.read;
    await message.save();

    revalidatePath("/messages");

    return { success: true, read: message.read };
  } catch (error) {
    console.error("Error in markMessageAsRead:", error);
    return { success: false, error: error.message };
  }
}

export default markMessageAsRead;
