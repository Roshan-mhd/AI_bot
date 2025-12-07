import React from "react";
import { useAppContext } from "../context/Appcontext";

const Community = () => {
  const { theme } = useAppContext();

  return (
    <div
      style={{
        backgroundColor: theme === "dark" ? "#0f0f0f" : "#f3f4f6",
        color: theme === "dark" ? "#ffffff" : "#111827",
        transition: "background-color 0.1s ease-in-out, color 0.1s ease-in-out",
      }}
      className="flex-1 flex flex-col h-screen"
    >
      <div className="flex-1 p-6">
        <p
          style={{ color: theme === "dark" ? "#999999" : "#666666" }}
          className="text-center"
        >
          Community
        </p>
      </div>
    </div>
  );
};

export default Community;
