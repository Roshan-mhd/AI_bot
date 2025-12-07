import React, { useEffect } from "react";
import Community from "./pages/community";
import Credits from "./pages/credits";
import Login from "./pages/Login";
import Sidebar from "./components/sidebar";
import Chatbox from "./components/chatbox";
import { Route, Routes, useLocation } from "react-router-dom";
import { useAppContext } from "./context/Appcontext";

const App = () => {
  const { theme, fetchUser, user } = useAppContext();
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  useEffect(() => {
    // Check for logged in user on mount
    fetchUser();
  }, []);

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
          {!isLoginPage && <Sidebar />}
          <Routes>
            <Route path="/login" element={<Login />} />
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
