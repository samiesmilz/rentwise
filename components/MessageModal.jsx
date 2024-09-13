"use client";

import { useState, useEffect } from "react";
import {
  FaEnvelope,
  FaEnvelopeOpen,
  FaTrash,
  FaCheck,
  FaReply,
} from "react-icons/fa";
import { toast } from "react-toastify";
import markMessageAsRead from "@/app/actions/markMessageAsRead";
import deleteMessage from "@/app/actions/deleteMessage";

const MessageModal = ({ message, onClose, onUpdate, onDelete }) => {
  const [isRead, setIsRead] = useState(message.read);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsRead(message.read);
  }, [message.read]);

  const handleMarkAsRead = async () => {
    setIsLoading(true);
    try {
      const result = await markMessageAsRead(message._id);
      if (result.success) {
        setIsRead(result.read);
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
        toast.success("Message deleted successfully");
        if (onDelete) onDelete(message._id);
        onClose();
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

  const handleReply = () => {
    // Implement reply functionality
    toast.info("Reply functionality not implemented yet");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-purple-700">
            {message.subject}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        <div className="mb-4">
          <p className="text-purple-600 font-semibold">
            From: {message.sender?.username || "Unknown"}
          </p>
          <p className="text-gray-600 text-sm">
            {new Date(message.createdAt).toLocaleString()}
          </p>
        </div>
        {message.property && (
          <p className="text-purple-600 mb-4">
            Property: {message.property.name}
          </p>
        )}
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <p className="text-gray-800 whitespace-pre-wrap">{message.body}</p>
        </div>
        <div className="flex flex-wrap gap-3 mb-6">
          {message.email && (
            <a
              href={`mailto:${message.email}`}
              className="flex items-center text-purple-600 hover:text-purple-800 hover:underline"
            >
              Email: {message.email}
            </a>
          )}
          {message.phone && (
            <a
              href={`tel:${message.phone}`}
              className="flex items-center text-purple-600 hover:text-purple-800 hover:underline"
            >
              Phone: {message.phone}
            </a>
          )}
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleMarkAsRead}
            disabled={isLoading}
            className={`px-4 py-2 rounded-full ${
              isRead ? "bg-gray-200 text-gray-600" : "bg-purple-600 text-white"
            } hover:bg-purple-700 hover:text-white transition duration-300 flex items-center`}
          >
            {isRead ? (
              <FaEnvelopeOpen className="mr-2" />
            ) : (
              <FaEnvelope className="mr-2" />
            )}
            {isRead ? "Mark as Unread" : "Mark as Read"}
          </button>
          <button
            onClick={handleReply}
            className="px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition duration-300 flex items-center"
          >
            <FaReply className="mr-2" /> Reply
          </button>
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition duration-300 flex items-center"
          >
            <FaTrash className="mr-2" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
