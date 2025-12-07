import React, { useEffect } from "react";
import Community from "./pages/community";
import Credits from "./pages/credits";
import Sidebar from "./components/sidebar";
import Chatbox from "./components/chatbox";
import { Route, Routes } from "react-router-dom";
import { useAppContext } from "./context/Appcontext";

const App = () => {
  const { theme } = useAppContext();

  useEffect(() => {
    // Apply theme styles to body
    document.body.style.backgroundColor =
      theme === "dark" ? "#000000" : "#f3f4f6";
    document.body.style.color = theme === "dark" ? "#ffffff" : "#111827";
  }, [theme]);

  return (
    <>
      <div
        style={{
          backgroundColor: theme === "dark" ? "#000000" : "#f3f4f6",
          color: theme === "dark" ? "#ffffff" : "#111827",
          transition:
            "background-color 0.1s ease-in-out, color 0.1s ease-in-out",
          width: "100%",
          height: "100vh",
          minHeight: "100vh",
        }}
      >
        <div className="flex h-screen w-screen">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Chatbox />} />
            <Route path="/credits" element={<Credits />} />
            <Route path="/community" element={<Community />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
