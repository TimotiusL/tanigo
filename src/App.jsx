import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { MdChevronRight } from "react-icons/md";
import CropPage from "./pages/CropPage";

function Home() {
  const navigate = useNavigate();

  const menu = [
    {
      title: "Crop Schedule",
      desc: "Track planting and harvesting time",
      icon: "🌾",
      path: "/crop",
    },
    {
      title: "Weather Alert",
      desc: "Check today's weather condition",
      icon: "🌦️",
      path: "/weather",
    },
    {
      title: "Profit Calculator",
      desc: "Calculate your harvest profit",
      icon: "💰",
      path: "/profit",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eaf5e6] via-white to-white">
      {/* NAVBAR */}
      <div className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b border-green-100 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold text-green-700">TaniGo 🌱</h1>

          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <FaUserCircle size={26} />
            </label>
            <ul className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white rounded-xl w-40">
              <li>
                <a>Profile</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <div className="max-w-2xl mx-auto px-4 pt-6 pb-3">
        <h2 className="text-base font-medium text-gray-600">
          Smart Assistant for Farmers
        </h2>
      </div>

      {/* CARDS */}
      <div className="max-w-2xl mx-auto px-4 space-y-5">
        {menu.map((item, i) => (
          <div
            key={i}
            onClick={() => navigate(item.path)}
            className="cursor-pointer group relative overflow-hidden rounded-2xl bg-gradient-to-r from-white to-green-50 shadow-md hover:shadow-2xl transition duration-300 border border-green-100"
          >
            <div className="absolute left-0 top-0 h-full w-1 bg-green-500" />

            <div className="p-5 flex items-center justify-between">
              <div className="flex gap-3">
                <div className="text-xl">{item.icon}</div>
                <div>
                  <h3 className="font-semibold text-green-700">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>

              <div className="flex items-center text-green-600 gap-1 group-hover:translate-x-1 transition">
                <span className="text-sm font-medium">Open</span>
                <MdChevronRight size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/crop" element={<CropPage />} />
    </Routes>
  );
}
