"use server";
import connectDB from "@/config/database";
import Message from "@/models/Message"; // Changed from Property to Message
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

const deleteMessage = async (messageId) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return { success: false, error: "User not authenticated" };
    }

    const { userId } = sessionUser;
    const message = await Message.findById(messageId);

    if (!message) {
      return { success: false, error: "Message not found" };
    }

    if (message.recipient.toString() !== userId) {
      return { success: false, error: "Unauthorized" };
    }

    await message.deleteOne();

    revalidatePath("/messages");

    return { success: true };
  } catch (error) {
    console.error("Error in deleteMessage:", error);
    return { success: false, error: error.message };
  }
};

export default deleteMessage;
