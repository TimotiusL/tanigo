import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { FaUserCircle, FaMoon, FaSun } from "react-icons/fa";

import { MdChevronRight } from "react-icons/md";

import CropPage from "./pages/CropPage";
import WeatherWidget from "./components/WeatherWidget";
import ProfitPage from "./pages/ProfitPage";
import WeatherPage from "./pages/WeatherPage";
import BottomNav from "./components/BottomNav";
import logo from "./assets/tanigo-logo.png";
import SplashScreen from "./components/SplashScreen";

function Home({ crops, darkMode, setDarkMode }) {
  const navigate = useNavigate();

  const latestCrop = crops[0];

  const menu = [
    {
      title: "Crop Schedule",
      icon: "🌾",
      path: "/crop",
      summary: latestCrop
        ? `${latestCrop.name} • ${latestCrop.harvest}`
        : "No crops added yet",
    },

    {
      title: "Weather Alert",
      icon: "🌦️",
      path: "/weather",
      summary: "Live weather updates",
    },

    {
      title: "Profit Calculator",
      icon: "💰",
      path: "/profit",
      summary: "Estimated profit: Rp 2.5M",
    },
  ];

  const [loading, setLoading] = useState(() => {
    return !sessionStorage.getItem("splashShown");
  });

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        sessionStorage.setItem("splashShown", "true");

        setLoading(false);
      }, 1800);

      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-200 via-base-100 to-base-200">
      {/* NAVBAR */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-base-100/70 border-b border-green-100">
        <div className="max-w-2xl mx-auto px-5 py-4 flex items-center justify-between">
          {/* LOGO */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center"
          >
            <img src={logo} alt="TaniGo Logo" className="h-10 object-contain" />
          </motion.div>

          {/* RIGHT NAV */}
          <div className="flex items-center gap-2">
            {/* THEME TOGGLE */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="btn btn-ghost btn-circle hover:bg-green-100 transition"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

            {/* PROFILE */}
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle hover:bg-green-100 transition"
              >
                <FaUserCircle size={28} className="text-gray-700" />
              </label>

              <ul className="menu menu-sm dropdown-content mt-3 p-2 shadow-2xl bg-base-100 rounded-2xl w-44 border border-green-100">
                <li>
                  <a className="rounded-xl">👤 Profile</a>
                </li>

                <li>
                  <a className="rounded-xl text-red-500">🚪 Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <div className="max-w-2xl mx-auto px-5 pt-8 pb-5">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-4xl font-black text-base-content leading-tight">
            Welcome Back 👋
          </h1>

          <p className="text-base-content/60 mt-2 text-base">
            Smart Assistant for Farmers
          </p>
        </motion.div>

        {/* WEATHER */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-6"
        >
          <WeatherWidget />
        </motion.div>
      </div>

      {/* MENU */}
      <div className="max-w-2xl mx-auto px-5 space-y-5 pb-32">
        {menu.map((item, index) => (
          <motion.div
            key={index}
            onClick={() => navigate(item.path)}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: index * 0.1,
            }}
            whileHover={{
              y: -4,
              scale: 1.01,
            }}
            whileTap={{
              scale: 0.98,
            }}
            className="cursor-pointer group relative overflow-hidden rounded-3xl bg-base-100/90 backdrop-blur-lg shadow-md hover:shadow-2xl border border-green-100 transition-all duration-300"
          >
            {/* GLOW */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-green-50 to-transparent" />

            {/* ACCENT */}
            <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-green-400 to-green-600" />

            <div className="relative p-6 flex items-center justify-between">
              {/* LEFT */}
              <div className="flex gap-4 items-start">
                <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-2xl shadow-inner">
                  {item.icon}
                </div>

                <div>
                  <h3 className="font-bold text-xl text-green-700 group-hover:text-green-800 transition">
                    {item.title}
                  </h3>

                  <p className="text-sm text-base-content/60 mt-1">
                    {item.summary}
                  </p>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-1 text-green-600 font-medium group-hover:translate-x-1 transition">
                <span className="text-sm">Open</span>

                <MdChevronRight size={22} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* BOTTOM NAV */}
      <BottomNav />
    </div>
  );
}

export default function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark",
  );
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "tanigo",
    );
  }, [darkMode]);
  // LOAD LOCAL STORAGE
  const [crops, setCrops] = useState(() => {
    const savedCrops = localStorage.getItem("tanigo-crops");

    return savedCrops
      ? JSON.parse(savedCrops)
      : [
          {
            name: "Rice",
            planted: "2026-05-01",
            harvest: "3 Days Left",
            progress: 90,
            status: "Almost Ready",
            daysLeft: 3,
            tip: "Reduce irrigation this week",
          },
        ];
  });

  // SAVE LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("tanigo-crops", JSON.stringify(crops));
  }, [crops]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home crops={crops} darkMode={darkMode} setDarkMode={setDarkMode} />
        }
      />

      <Route
        path="/crop"
        element={<CropPage crops={crops} setCrops={setCrops} />}
      />

      <Route path="/profit" element={<ProfitPage />} />

      <Route path="/weather" element={<WeatherPage />} />
    </Routes>
  );
}
