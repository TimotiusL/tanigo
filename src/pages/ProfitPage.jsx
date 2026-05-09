import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaSeedling,
  FaMoneyBillWave,
  FaUsers,
} from "react-icons/fa";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function ProfitPage() {
  const navigate = useNavigate();

  const [capital, setCapital] = useState(1000000);
  const [fertilizer, setFertilizer] = useState(500000);
  const [worker, setWorker] = useState(300000);
  const [income, setIncome] = useState(3000000);

  const totalExpense = capital + fertilizer + worker;

  const profit = income - totalExpense;

  const data = [
    {
      name: "Expense",
      value: totalExpense,
    },
    {
      name: "Profit",
      value: profit > 0 ? profit : 0,
    },
  ];

  const COLORS = ["#ef4444", "#84cc16"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-200 via-base-100 to-base-200 pb-32">
      {/* HEADER */}
      <div className="sticky top-0 z-50 bg-base-100/70 backdrop-blur-xl border-b border-base-300">
        <div className="max-w-2xl mx-auto px-5 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="btn btn-circle btn-ghost"
          >
            <FaArrowLeft />
          </button>

          <div>
            <h1 className="text-2xl font-extrabold text-primary">
              Profit Calculator
            </h1>

            <p className="text-sm text-base-content/60">
              Estimate your farming income
            </p>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-2xl mx-auto px-5 pt-6 space-y-5">
        {/* HERO SUMMARY */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary to-lime-600 text-white p-7 shadow-2xl"
        >
          <div className="absolute right-0 top-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />

          <p className="opacity-80 text-sm">Estimated Net Profit</p>

          <h2 className="text-5xl font-black mt-3 tracking-tight">
            Rp {profit.toLocaleString()}
          </h2>

          <div className="mt-5">
            {profit > 0 ? (
              <div className="badge badge-success badge-lg px-5 py-4">
                Profitable 🌱
              </div>
            ) : (
              <div className="badge badge-error badge-lg px-5 py-4">
                Loss 📉
              </div>
            )}
          </div>
        </motion.div>

        {/* QUICK STATS */}
        <div className="grid grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-[1.7rem] bg-base-100 border border-base-300 shadow-lg p-4"
          >
            <div className="text-primary text-xl">
              <FaSeedling />
            </div>

            <p className="text-xs text-base-content/60 mt-3">Seed Cost</p>

            <h2 className="text-lg font-bold mt-1">
              Rp {capital.toLocaleString()}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-[1.7rem] bg-base-100 border border-base-300 shadow-lg p-4"
          >
            <div className="text-warning text-xl">
              <FaMoneyBillWave />
            </div>

            <p className="text-xs text-base-content/60 mt-3">Fertilizer</p>

            <h2 className="text-lg font-bold mt-1">
              Rp {fertilizer.toLocaleString()}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-[1.7rem] bg-base-100 border border-base-300 shadow-lg p-4"
          >
            <div className="text-info text-xl">
              <FaUsers />
            </div>

            <p className="text-xs text-base-content/60 mt-3">Workers</p>

            <h2 className="text-lg font-bold mt-1">
              Rp {worker.toLocaleString()}
            </h2>
          </motion.div>
        </div>

        {/* CHART */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-[2rem] bg-base-100 shadow-xl border border-base-300 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-base-content">
                Financial Overview
              </h2>

              <p className="text-sm text-base-content/60 mt-1">
                Expense vs profit distribution
              </p>
            </div>
          </div>

          <div className="h-[280px] mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  innerRadius={75}
                  outerRadius={105}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* LEGEND */}
          <div className="flex justify-center gap-8 mt-2">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              Expense
            </div>

            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full bg-lime-500" />
              Profit
            </div>
          </div>
        </motion.div>

        {/* INPUT CARD */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-[2rem] bg-base-100 border border-base-300 shadow-xl p-6 space-y-4"
        >
          <div>
            <h2 className="text-xl font-bold text-base-content">
              Farming Expenses
            </h2>

            <p className="text-sm text-base-content/60 mt-1">
              Enter your farming cost estimation
            </p>
          </div>

          <input
            type="number"
            className="input input-bordered w-full rounded-2xl"
            placeholder="Seed Capital"
            value={capital}
            onChange={(e) => setCapital(Number(e.target.value))}
          />

          <input
            type="number"
            className="input input-bordered w-full rounded-2xl"
            placeholder="Fertilizer Cost"
            value={fertilizer}
            onChange={(e) => setFertilizer(Number(e.target.value))}
          />

          <input
            type="number"
            className="input input-bordered w-full rounded-2xl"
            placeholder="Worker Cost"
            value={worker}
            onChange={(e) => setWorker(Number(e.target.value))}
          />

          <input
            type="number"
            className="input input-bordered w-full rounded-2xl"
            placeholder="Harvest Income"
            value={income}
            onChange={(e) => setIncome(Number(e.target.value))}
          />
        </motion.div>
      </div>
    </div>
  );
}
