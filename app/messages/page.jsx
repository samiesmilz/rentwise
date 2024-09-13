import connectDB from "@/config/database";
import Message from "@/models/Message";
import "@/models/Property";
import { convertToSerializableObject } from "@/utils/convertToObject";
import { getSessionUser } from "@/utils/getSessionUser";
import MessageCard from "@/components/MessageCard";

const MessagesPage = async () => {
  await connectDB();
  const sessionUser = await getSessionUser();
  const { userId } = sessionUser;
  const readMessages = await Message.find({
    recipient: userId,
    read: true,
  })
    .sort({ createdAt: -1 })
    .populate("sender", "username")
    .populate("property", "name")
    .lean();

  const unreadMessages = await Message.find({
    recipient: userId,
    read: false,
  })
    .sort({ createdAt: -1 })
    .populate("sender", "username")
    .populate("property", "name")
    .lean();

  const messages = [...unreadMessages, ...readMessages]
    .map((messageDoc) => {
      try {
        const message = convertToSerializableObject(messageDoc);
        if (messageDoc.sender) {
          message.sender = convertToSerializableObject(messageDoc.sender);
        }
        if (messageDoc.property) {
          message.property = convertToSerializableObject(messageDoc.property);
        }
        return message;
      } catch (error) {
        console.error("Error converting message:", error);
        return null;
      }
    })
    .filter(Boolean); // Remove any null messages

  return (
    <section className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-purple-500 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">Your Messages</h2>
          </div>
          <div className="px-6 py-6">
            {messages.length === 0 ? (
              <p className="text-purple-300 text-center py-4">
                You have no messages.
              </p>
            ) : (
              messages.map((message) => (
                <MessageCard key={message._id} message={message} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessagesPage;
