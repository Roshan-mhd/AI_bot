import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

// Dummy data
const dummyUserData = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  avatar: "https://via.placeholder.com/40",
};

const dummyChats = [
  {
    _id: "1",
    name: "React Tips",
    updatedAt: "Today",
    messages: [{ content: "What is useState?" }],
  },
  {
    _id: "2",
    name: "JavaScript Help",
    updatedAt: "Yesterday",
    messages: [{ content: "How to use async/await?" }],
  },
  {
    _id: "3",
    name: "Project Discussion",
    updatedAt: "2 days ago",
    messages: [{ content: "Let''s start the new project" }],
  },
];

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const fetchUser = async () => {
    setUser(dummyUserData);
  };

  const fetchUserChats = async () => {
    setChats(dummyChats);
    setSelectedChat(dummyChats[0]);
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    if (user) {
      fetchUserChats();
    } else {
      setChats([]);
      setSelectedChat(null);
    }
  }, [user]);

  const value = {
    navigate,
    user,
    setUser,
    chats,
    setChats,
    selectedChat,
    setSelectedChat,
    theme,
    setTheme,
    fetchUser,
    fetchUserChats,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
