"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useGlobalContext } from "@/context/GlobalContext";
import {
  FaEnvelope,
  FaEnvelopeOpen,
  FaTrash,
  FaCheck,
  FaEye,
  FaPhone,
  FaAt,
} from "react-icons/fa";
import { toast } from "react-toastify";
import markMessageAsRead from "@/app/actions/markMessageAsRead";
import deleteMessage from "@/app/actions/deleteMessage";
import MessageModal from "./MessageModal";

const MessageCard = ({ message, onUpdate, onDelete }) => {
  const [isRead, setIsRead] = useState(message.read);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { setUnreadCount } = useGlobalContext();
  useEffect(() => {
    setIsRead(message.read);
  }, [message.read]);

  const handleMarkAsRead = async () => {
    setIsLoading(true);
    try {
      const result = await markMessageAsRead(message._id);

      if (result.success) {
        setIsRead(result.read);
        setUnreadCount((prev) => (result.read ? prev - 1 : prev + 1));
        toast.success(`Marked as ${result.read ? "read" : "unread"}`);
        if (onUpdate) onUpdate(message._id, result.read);
      } else {
        throw new Error(result.error || "Failed to update message status");
      }
    } catch (error) {
      console.error("Error marking message as read:", error);
      toast.error(
        error.message || "Failed to update message status. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const result = await deleteMessage(message._id);

      if (result.success) {
        setUnreadCount((prev) => (isRead ? prev : prev - 1));
        toast.success("Message deleted successfully");
        if (onDelete) onDelete(message._id);
      } else {
        throw new Error(result.error || "Failed to delete message");
      }
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error(
        error.message || "Failed to delete message. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className={`p-6 rounded-lg shadow-md mb-4 border-l-4 ${
          isRead
            ? "bg-gray-50 border-gray-300"
            : "bg-purple-100 border-purple-500"
        } transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group`}
      >
        <div className="flex items-center justify-between mb-4 rounded-full">
          <div className="flex items-center">
            <div
              className={`p-2 rounded-full ${
                isRead ? "bg-gray-200" : "bg-purple-200"
              } mr-4 transition-colors duration-300`}
            >
              {isRead ? (
                <FaEnvelopeOpen className="text-gray-500 text-xl" />
              ) : (
                <FaEnvelope className="text-purple-600 text-xl" />
              )}
            </div>
            <div>
              <h3
                className={`text-xl font-semibold ${
                  isRead ? "text-gray-700" : "text-purple-900"
                } group-hover:text-purple-600 transition-colors duration-300`}
              >
                {message.subject}
              </h3>
              <p className="text-sm text-purple-500 mt-1">
                {new Date(message.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleMarkAsRead}
              disabled={isLoading}
              className={`p-2 rounded-full ${
                isRead
                  ? "bg-gray-200 text-gray-600"
                  : "bg-purple-600 text-white"
              } hover:bg-purple-700 hover:text-white transition duration-300 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              title={isRead ? "Mark as unread" : "Mark as read"}
            >
              <FaCheck />
            </button>
            <button
              onClick={handleDelete}
              disabled={isLoading}
              className={`p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition duration-300 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              title="Delete"
            >
              <FaTrash />
            </button>
          </div>
        </div>
        <div className="mb-4 pl-14">
          <p className="text-purple-700 font-bold text-sm mb-2">
            From: {message.sender?.username || "Unknown"}
          </p>
          {message.property && (
            <p className="text-purple-600 text-sm mb-2">
              Property: {message.property.name}
            </p>
          )}
          <p className="text-sm text-gray-700 mb-3 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
            {message.body || "No message body"}
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            {message.email && (
              <a
                href={`mailto:${message.email}`}
                className="flex items-center text-purple-600 hover:text-purple-800 hover:underline"
              >
                <FaAt className="mr-1" /> {message.email}
              </a>
            )}
            {message.phone && (
              <a
                href={`tel:${message.phone}`}
                className="flex items-center text-purple-600 hover:text-purple-800 hover:underline"
              >
                <FaPhone className="mr-1" /> {message.phone}
              </a>
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => setShowModal(true)}
            className="bg-purple-500 text-white px-4 py-1 rounded-full hover:bg-purple-600 transition duration-300 flex items-center"
          >
            <FaEye className="mr-2" /> View Details
          </button>
        </div>
      </div>
      {showModal && (
        <MessageModal
          message={message}
          onClose={() => setShowModal(false)}
          onUpdate={(id, read) => {
            if (onUpdate) onUpdate(id, read);
          }}
          onDelete={onDelete}
        />
      )}
    </>
  );
};

export default MessageCard;
