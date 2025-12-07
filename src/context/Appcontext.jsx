import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { dummyChats, dummyUsers } from "../assets/assets";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  // Load users from localStorage or use dummyUsers
  const getUsers = () => {
    const savedUsers = localStorage.getItem("users");
    if (savedUsers) {
      try {
        return JSON.parse(savedUsers);
      } catch (error) {
        console.error("Error parsing saved users:", error);
        return dummyUsers;
      }
    }
    return dummyUsers;
  };

  // Save users to localStorage
  const saveUsers = (users) => {
    localStorage.setItem("users", JSON.stringify(users));
  };

  const fetchUser = async () => {
    // Check if user is already logged in
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      try {
        setUser(JSON.parse(loggedInUser));
      } catch (error) {
        console.error("Error parsing logged in user:", error);
      }
    }
  };

  const fetchUserChats = async () => {
    if (!user) {
      setChats([]);
      return;
    }

    // Load chats from localStorage or use dummyChats
    const savedChats = localStorage.getItem("userChats");
    let allChats = [];

    if (savedChats) {
      try {
        const parsedChats = JSON.parse(savedChats);
        // Merge with dummyChats, prioritizing saved chats
        allChats = [...dummyChats];
        parsedChats.forEach((savedChat) => {
          const existingIndex = allChats.findIndex(
            (chat) => (chat.id || chat._id) === (savedChat.id || savedChat._id)
          );
          if (existingIndex >= 0) {
            allChats[existingIndex] = savedChat;
          } else {
            allChats.push(savedChat);
          }
        });
      } catch (error) {
        console.error("Error parsing saved chats:", error);
        allChats = dummyChats;
      }
    } else {
      allChats = dummyChats;
    }

    // Filter chats by userId
    const userChats = allChats.filter(
      (chat) => chat.userId === (user._id || user.id)
    );
    setChats(userChats);
  };

  const handleLogin = (email, password) => {
    const users = getUsers();
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
      return { success: true, user: foundUser };
    }
    return { success: false, error: "Invalid email or password" };
  };

  const handleSignup = (name, email, password) => {
    const users = getUsers();

    // Check if user already exists
    if (users.find((u) => u.email === email)) {
      return { success: false, error: "User with this email already exists" };
    }

    // Create new user
    const newUser = {
      _id: Date.now().toString(),
      name,
      email,
      password, // In production, hash this password
    };

    // Add to users array and save
    const updatedUsers = [...users, newUser];
    saveUsers(updatedUsers);

    // Auto-login the new user
    setUser(newUser);
    localStorage.setItem("loggedInUser", JSON.stringify(newUser));

    return { success: true, user: newUser };
  };

  // Save chats to localStorage whenever they change
  useEffect(() => {
    if (chats.length >= 0 && user) {
      // Get all chats from localStorage
      const savedChats = localStorage.getItem("userChats");
      let allChats = savedChats ? JSON.parse(savedChats) : [...dummyChats];

      // Update or add user's chats
      chats.forEach((chat) => {
        const existingIndex = allChats.findIndex(
          (c) => (c.id || c._id) === (chat.id || chat._id)
        );
        if (existingIndex >= 0) {
          allChats[existingIndex] = chat;
        } else {
          allChats.push(chat);
        }
      });

      // Remove chats that belong to this user but are no longer in state
      allChats = allChats.filter((chat) => {
        const isUserChat = chat.userId === (user._id || user.id);
        if (isUserChat) {
          return chats.some((c) => (c.id || c._id) === (chat.id || chat._id));
        }
        return true; // Keep other users' chats
      });

      localStorage.setItem("userChats", JSON.stringify(allChats));
    }
  }, [chats, user]);

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

  const handleLogout = () => {
    setUser(null);
    setChats([]);
    setSelectedChat(null);
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

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
    handleLogout,
    handleLogin,
    handleSignup,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
