import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";

import { FaUserCircle } from "react-icons/fa";

import CropPage from "./pages/CropPage";
import WeatherWidget from "./components/WeatherWidget";
import ProfitPage from "./pages/ProfitPage";
import WeatherPage from "./pages/WeatherPage";
import BottomNav from "./components/BottomNav";
import logo from "./assets/tanigo-logo.png";
import SplashScreen from "./components/SplashScreen";

function Home({ crops, cropCosts, income }) {
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
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-base-100/70 border-b border-green-100">
        <div className="w-full px-8 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center"
          >
            <img src={logo} alt="TaniGo Logo" className="h-10 object-contain" />
          </motion.div>

          <div className="flex items-center gap-2">
            <div className="btn btn-ghost btn-circle">
              <FaUserCircle size={28} className="text-gray-700" />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-8 pt-8 pb-5 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-xl"
        >
          <h1 className="text-4xl font-black text-base-content leading-tight">
            Welcome Back 👋
          </h1>

          <p className="text-base-content/60 mt-2 text-base">
            Smart Assistant for Farmers
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-0"
        >
          <WeatherWidget />
        </motion.div>
      </div>

      <div className="w-full px-8 pb-32 grid gap-6">
        <div className="rounded-[2rem] bg-base-100 border border-base-300 shadow-lg p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-base-content">
                Your Crop Tasks
              </h2>
              <p className="text-sm text-base-content/60 mt-1">
                Showing up to two active crops from your schedule.
              </p>
            </div>
            <span className="text-sm text-base-content/60">
              {crops.length} total
            </span>
          </div>

          {crops.length === 0 ? (
            <div className="mt-6 rounded-[1.7rem] border border-dashed border-base-300 bg-base-200 p-8 text-center text-base-content/70">
              No Crops Yet
            </div>
          ) : (
            <div className="mt-6 grid gap-4">
              {crops.slice(0, 2).map((crop, index) => (
                <div
                  key={index}
                  className="rounded-[1.7rem] bg-base-200 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-base-content">
                        {crop.name}
                      </h3>
                      <p className="text-sm text-base-content/60 mt-1">
                        {crop.harvest}
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-base-content/70">
                      {crop.progress}%
                    </span>
                  </div>
                  <div className="mt-4 h-2 w-full rounded-full bg-base-300">
                    <div
                      className="h-2 rounded-full bg-primary"
                      style={{ width: `${crop.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-[2rem] bg-base-100 border border-base-300 shadow-lg p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-base-content">
                Profit Summary
              </h2>
              <p className="text-sm text-base-content/60 mt-1">
                See your income, total crop expenses, and net profit.
              </p>
            </div>
            <span className="text-sm text-base-content/60">
              Updated Automatically
            </span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.7rem] bg-base-200 p-4">
              <p className="text-sm text-base-content/60">Income</p>
              <p className="mt-2 text-2xl font-bold text-base-content">
                Rp {income.toLocaleString("id-ID")}
              </p>
            </div>

            <div className="rounded-[1.7rem] bg-base-200 p-4">
              <p className="text-sm text-base-content/60">Total Expenses</p>
              <p className="mt-2 text-2xl font-bold text-base-content">
                Rp {Object.values(cropCosts).reduce((sum, cost) => sum + Number(cost || 0), 0).toLocaleString("id-ID")}
              </p>
            </div>

            <div className="rounded-[1.7rem] bg-base-200 p-4">
              <p className="text-sm text-base-content/60">Net Profit</p>
              <p className="mt-2 text-2xl font-bold text-base-content">
                Rp {Math.max(income - Object.values(cropCosts).reduce((sum, cost) => sum + Number(cost || 0), 0), 0).toLocaleString("id-ID")}
              </p>
            </div>
          </div>
        </div>
      </div>

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

  const [cropCosts, setCropCosts] = useState(() => {
    const savedCosts = localStorage.getItem("tanigo-crop-costs");
    return savedCosts ? JSON.parse(savedCosts) : {};
  });

  const [income, setIncome] = useState(() => {
    const savedIncome = localStorage.getItem("tanigo-income");
    return savedIncome ? Number(savedIncome) : 3000000;
  });

  useEffect(() => {
    localStorage.setItem("tanigo-crops", JSON.stringify(crops));
  }, [crops]);

  useEffect(() => {
    localStorage.setItem("tanigo-crop-costs", JSON.stringify(cropCosts));
  }, [cropCosts]);

  useEffect(() => {
    localStorage.setItem("tanigo-income", String(income));
  }, [income]);

  useEffect(() => {
    const parseTotalDays = (crop) => {
      if (typeof crop.totalDays === "number") return crop.totalDays;
      const match = String(crop.harvest).match(/(\d+)/);
      return match ? Number(match[1]) : 0;
    };

    const interval = setInterval(() => {
      setCrops((prevCrops) =>
        prevCrops.map((crop) => {
          const totalDays = parseTotalDays(crop);
          const nextDaysLeft = Math.max(crop.daysLeft - 1, 0);
          const nextProgress = totalDays
            ? Math.round(((totalDays - nextDaysLeft) / totalDays) * 100)
            : crop.progress;

          return {
            ...crop,
            daysLeft: nextDaysLeft,
            progress: Math.min(Math.max(nextProgress, 0), 100),
            totalDays,
          };
        }),
      );
    }, 10000);

    return () => clearInterval(interval);
  }, [setCrops]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            crops={crops}
            cropCosts={cropCosts}
            income={income}
          />
        }
      />

      <Route
        path="/crop"
        element={<CropPage crops={crops} setCrops={setCrops} />}
      />

      <Route
        path="/profit"
        element={
          <ProfitPage
            crops={crops}
            cropCosts={cropCosts}
            setCropCosts={setCropCosts}
            income={income}
            setIncome={setIncome}
          />
        }
      />

      <Route path="/weather" element={<WeatherPage />} />
    </Routes>
  );
}
