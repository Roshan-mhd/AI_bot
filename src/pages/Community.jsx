import React, { useMemo } from "react";
import { useAppContext } from "../context/Appcontext";
import { dummyPublishedImages } from "../assets/assets";

const Community = () => {
  const { theme, chats, setSelectedChat, navigate } = useAppContext();

  // Get all published images from chats and combine with dummyPublishedImages
  const publishedImages = useMemo(() => {
    const chatImages = [];
    chats.forEach((chat) => {
      chat.messages?.forEach((msg) => {
        if (msg.isImage && msg.isPublished) {
          chatImages.push({
            imageUrl: msg.content,
            userName: chat.userName || "User",
            chatId: chat.id || chat._id,
          });
        }
      });
    });

    // Combine with dummy images and remove duplicates
    const allImages = [...chatImages];
    dummyPublishedImages.forEach((img) => {
      if (!allImages.find((i) => i.imageUrl === img.imageUrl)) {
        allImages.push(img);
      }
    });

    return allImages;
  }, [chats]);

  // Find the chat that contains a specific image
  const findChatByImage = (imageUrl) => {
    return chats.find((chat) =>
      chat.messages?.some(
        (msg) => msg.isImage && msg.isPublished && msg.content === imageUrl
      )
    );
  };

  const handleImageClick = (imageUrl) => {
    const chat = findChatByImage(imageUrl);
    if (chat) {
      setSelectedChat(chat);
      navigate("/");
    }
  };

  return (
    <div
      style={{
        backgroundColor: theme === "dark" ? "#0f0f0f" : "#f3f4f6",
        color: theme === "dark" ? "#ffffff" : "#111827",
        transition: "background-color 0.1s ease-in-out, color 0.1s ease-in-out",
      }}
      className="flex-1 flex flex-col h-screen"
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: theme === "dark" ? "#1a0f2e" : "#ffffff",
          borderBottomColor: theme === "dark" ? "#80609F" : "#e5e7eb",
        }}
        className="p-4 border-b"
      >
        <h2
          style={{ color: theme === "dark" ? "#ffffff" : "#111827" }}
          className="font-semibold text-lg"
        >
          Community Images
        </h2>
      </div>

      {/* Images Grid */}
      <div className="flex-1 p-6 overflow-y-auto">
        {publishedImages.length === 0 ? (
          <p
            style={{ color: theme === "dark" ? "#999999" : "#666666" }}
            className="text-center"
          >
            No published images yet
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {publishedImages.map((item, idx) => {
              const chat = findChatByImage(item.imageUrl);
              return (
                <div
                  key={idx}
                  onClick={() => handleImageClick(item.imageUrl)}
                  style={{
                    backgroundColor: theme === "dark" ? "#1a0f2e" : "#ffffff",
                    borderColor: theme === "dark" ? "#80609F" : "#e5e7eb",
                    cursor: chat ? "pointer" : "default",
                  }}
                  className="border rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
                >
                  <img
                    src={item.imageUrl}
                    alt={`Published by ${item.userName}`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-3">
                    <p
                      style={{
                        color: theme === "dark" ? "#B1A6C0" : "#666666",
                      }}
                      className="text-xs"
                    >
                      by {item.userName}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;
