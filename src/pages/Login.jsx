import React, { useState } from "react";
import { useAppContext } from "../context/Appcontext";

const Login = () => {
  const { theme, navigate, handleLogin, handleSignup } = useAppContext();
  const [showSignup, setShowSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError("");
    const result = handleLogin(email, password);
    if (result.success) {
      navigate("/");
    } else {
      setError(result.error || "Invalid email or password");
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (signupPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (signupPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    const result = handleSignup(signupName, signupEmail, signupPassword);
    if (result.success) {
      navigate("/");
    } else {
      setError(result.error || "Failed to create account");
    }
  };

  return (
    <div
      style={{
        backgroundColor: theme === "dark" ? "#0f0f0f" : "#f3f4f6",
        color: theme === "dark" ? "#ffffff" : "#111827",
        transition: "background-color 0.1s ease-in-out, color 0.1s ease-in-out",
      }}
      className="flex h-screen w-screen"
    >
      {/* Left Half - Join Us Section */}
      <div
        style={{
          backgroundColor: theme === "dark" ? "#1a0f2e" : "#8B5CF6",
          color: "#ffffff",
        }}
        className="hidden md:flex flex-1 flex-col items-center justify-center p-12"
      >
        <div className="max-w-md">
          <h1 className="text-6xl font-bold mb-6">Join Us</h1>
          <p className="text-xl mb-4 opacity-90">
            Welcome to the future of AI-powered conversations
          </p>
          <p className="text-lg opacity-80">
            Experience seamless chat interactions with our intelligent chatbot.
            Connect, create, and explore endless possibilities in a modern,
            intuitive interface designed for you.
          </p>
        </div>
      </div>

      {/* Right Half - Forms Container */}
      <div
        style={{
          backgroundColor: theme === "dark" ? "#0f0f0f" : "#ffffff",
        }}
        className="flex-1 flex flex-col items-center justify-center p-8 md:p-12 relative overflow-hidden"
      >
        {/* Login Form */}
        <div
          className={`w-full max-w-md absolute transition-opacity duration-500 ${
            showSignup ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <h2
            style={{ color: theme === "dark" ? "#ffffff" : "#111827" }}
            className="text-3xl font-bold mb-2"
          >
            Welcome Back
          </h2>
          <p
            style={{ color: theme === "dark" ? "#999999" : "#666666" }}
            className="text-sm mb-8"
          >
            Sign in to continue to your account
          </p>

          {error && !showSignup && (
            <div
              style={{
                backgroundColor:
                  theme === "dark" ? "rgba(239, 68, 68, 0.2)" : "#fee2e2",
                color: theme === "dark" ? "#fca5a5" : "#dc2626",
                borderColor: theme === "dark" ? "#ef4444" : "#dc2626",
              }}
              className="mb-4 p-3 border rounded-lg text-sm"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                style={{ color: theme === "dark" ? "#ffffff" : "#111827" }}
                className="block text-sm font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                style={{
                  backgroundColor: theme === "dark" ? "#1a0f2e" : "#f3f4f6",
                  color: theme === "dark" ? "#ffffff" : "#111827",
                  borderColor: theme === "dark" ? "#80609F" : "#d1d5db",
                }}
                className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                style={{ color: theme === "dark" ? "#ffffff" : "#111827" }}
                className="block text-sm font-medium mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  style={{
                    backgroundColor: theme === "dark" ? "#1a0f2e" : "#f3f4f6",
                    color: theme === "dark" ? "#ffffff" : "#111827",
                    borderColor: theme === "dark" ? "#80609F" : "#d1d5db",
                  }}
                  className="w-full px-4 py-3 pr-12 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ color: theme === "dark" ? "#B1A6C0" : "#666666" }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:opacity-80 transition-opacity"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                backgroundColor: theme === "dark" ? "#6B47B5" : "#8B5CF6",
                color: "#ffffff",
              }}
              className="w-full px-4 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Sign In
            </button>
          </form>

          {/* Additional Links */}
          <div className="mt-6 text-center">
            <p
              style={{ color: theme === "dark" ? "#999999" : "#666666" }}
              className="text-sm"
            >
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setShowSignup(true);
                  setError("");
                }}
                style={{ color: theme === "dark" ? "#6B47B5" : "#8B5CF6" }}
                className="font-semibold hover:underline"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>

        {/* Signup Form */}
        <div
          className={`w-full max-w-md absolute transition-opacity duration-500 ${
            showSignup ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Back Button */}
          <button
            type="button"
            onClick={() => {
              setShowSignup(false);
              setError("");
            }}
            style={{ color: theme === "dark" ? "#ffffff" : "#111827" }}
            className="mb-4 flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="font-medium">Back to Login</span>
          </button>

          <h2
            style={{ color: theme === "dark" ? "#ffffff" : "#111827" }}
            className="text-3xl font-bold mb-2"
          >
            Create Account
          </h2>
          <p
            style={{ color: theme === "dark" ? "#999999" : "#666666" }}
            className="text-sm mb-8"
          >
            Sign up to get started with your account
          </p>

          {error && showSignup && (
            <div
              style={{
                backgroundColor:
                  theme === "dark" ? "rgba(239, 68, 68, 0.2)" : "#fee2e2",
                color: theme === "dark" ? "#fca5a5" : "#dc2626",
                borderColor: theme === "dark" ? "#ef4444" : "#dc2626",
              }}
              className="mb-4 p-3 border rounded-lg text-sm"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSignupSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label
                htmlFor="signupName"
                style={{ color: theme === "dark" ? "#ffffff" : "#111827" }}
                className="block text-sm font-medium mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="signupName"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
                required
                placeholder="Enter your name"
                style={{
                  backgroundColor: theme === "dark" ? "#1a0f2e" : "#f3f4f6",
                  color: theme === "dark" ? "#ffffff" : "#111827",
                  borderColor: theme === "dark" ? "#80609F" : "#d1d5db",
                }}
                className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="signupEmail"
                style={{ color: theme === "dark" ? "#ffffff" : "#111827" }}
                className="block text-sm font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="signupEmail"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                required
                placeholder="Enter your email"
                style={{
                  backgroundColor: theme === "dark" ? "#1a0f2e" : "#f3f4f6",
                  color: theme === "dark" ? "#ffffff" : "#111827",
                  borderColor: theme === "dark" ? "#80609F" : "#d1d5db",
                }}
                className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="signupPassword"
                style={{ color: theme === "dark" ? "#ffffff" : "#111827" }}
                className="block text-sm font-medium mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showSignupPassword ? "text" : "password"}
                  id="signupPassword"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  style={{
                    backgroundColor: theme === "dark" ? "#1a0f2e" : "#f3f4f6",
                    color: theme === "dark" ? "#ffffff" : "#111827",
                    borderColor: theme === "dark" ? "#80609F" : "#d1d5db",
                  }}
                  className="w-full px-4 py-3 pr-12 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowSignupPassword(!showSignupPassword)}
                  style={{ color: theme === "dark" ? "#B1A6C0" : "#666666" }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:opacity-80 transition-opacity"
                >
                  {showSignupPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                style={{ color: theme === "dark" ? "#ffffff" : "#111827" }}
                className="block text-sm font-medium mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Confirm your password"
                  style={{
                    backgroundColor: theme === "dark" ? "#1a0f2e" : "#f3f4f6",
                    color: theme === "dark" ? "#ffffff" : "#111827",
                    borderColor: theme === "dark" ? "#80609F" : "#d1d5db",
                  }}
                  className="w-full px-4 py-3 pr-12 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{ color: theme === "dark" ? "#B1A6C0" : "#666666" }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:opacity-80 transition-opacity"
                >
                  {showConfirmPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                backgroundColor: theme === "dark" ? "#6B47B5" : "#8B5CF6",
                color: "#ffffff",
              }}
              className="w-full px-4 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
