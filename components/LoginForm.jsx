"use client";

import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted:", { email, password, rememberMe });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 md:p-10 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="w-32 h-32">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
              <circle cx="60" cy="60" r="60" fill="url(#gradient)" />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FF8A65" />
                  <stop offset="50%" stopColor="#FFB74D" />
                  <stop offset="100%" stopColor="#00BCD4" />
                </linearGradient>
              </defs>

              {/* Palm trees */}
              <g fill="white" opacity="0.9">
                <path
                  d="M25 45 L30 35 L35 45 M30 35 L30 55"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M20 40 L25 35 L30 40 M25 35 L25 50"
                  stroke="white"
                  strokeWidth="1.5"
                  fill="none"
                />
                <path
                  d="M35 50 L40 40 L45 50 M40 40 L40 60"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M50 45 L55 35 L60 45 M55 35 L55 55"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                />
              </g>

              {/* Stars */}
              <g fill="white" opacity="0.8">
                <path d="M70 25 L72 30 L77 30 L73 33 L75 38 L70 35 L65 38 L67 33 L63 30 L68 30 Z" />
                <path d="M85 35 L86 38 L89 38 L87 40 L88 43 L85 41 L82 43 L83 40 L81 38 L84 38 Z" />
                <path d="M75 45 L76 47 L78 47 L77 48 L78 50 L75 49 L73 50 L74 48 L72 47 L74 47 Z" />
              </g>

              {/* Bird/plane silhouette */}
              <path
                d="M45 65 Q55 60 65 65 Q75 70 85 65 L80 70 Q70 75 60 70 Q50 75 40 70 Z"
                fill="white"
                opacity="0.7"
              />

              {/* Eye symbol */}
              <g transform="translate(55, 75)">
                <ellipse
                  cx="5"
                  cy="5"
                  rx="8"
                  ry="4"
                  fill="white"
                  opacity="0.9"
                />
                <circle cx="5" cy="5" r="2" fill="#00BCD4" />
              </g>
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-left">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="text-left">
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
              required
            />
          </div>

          <div className="mb-5">
            <div className="flex justify-between items-center mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <a href="#" className="text-sm text-cyan-500 hover:underline">
                Forgot Password
              </a>
            </div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
              required
            />
          </div>

          <div className="my-5">
            <label className="inline-flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`w-4 h-4 border-2 rounded ${
                    rememberMe
                      ? "bg-cyan-500 border-cyan-500"
                      : "border-gray-300"
                  } mr-2`}
                >
                  {rememberMe && (
                    <svg
                      className="w-4 h-4 text-white"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 8L7 10L11 6"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-sm text-gray-600">Remember Me</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-md font-medium transition-colors mb-8"
          >
            Login
          </button>
        </form>

        <div className="text-xs text-cyan-500 text-center">
          Copyright@2025, All Right Reserved
        </div>
      </div>
    </div>
  );
}
