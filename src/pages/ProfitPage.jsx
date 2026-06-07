import { motion } from "framer-motion";

import { FaSeedling, FaMoneyBillWave, FaUsers } from "react-icons/fa";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import BottomNav from "../components/BottomNav";

export default function ProfitPage({ crops, cropCosts, setCropCosts, income, setIncome }) {
  const cropExpenseItems = crops || [];
  const totalExpense = Object.values(cropCosts || {}).reduce(
    (sum, value) => sum + Number(value || 0),
    0,
  );

  const profit = income - totalExpense;
  const profitLabel = profit >= 0 ? "Profit" : "Loss";
  const profitAmount = Math.abs(profit);

  const data = [
    {
      name: "Expense",
      value: totalExpense,
    },
    {
      name: profit >= 0 ? "Profit" : "Loss",
      value: profit >= 0 ? profit : 0,
    },
  ];

  const COLORS = ["#ef4444", "#84cc16"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-200 via-base-100 to-base-200 pb-32">
      <div className="sticky top-0 z-50 bg-base-100/70 backdrop-blur-xl border-b border-base-300">
        <div className="w-full px-8 py-4 flex items-center gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-primary">Profit Calculator</h1>

            <p className="text-sm text-base-content/60">Estimate your farming income</p>
          </div>
        </div>
      </div>

      <div className="w-full px-8 pt-6 grid gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary to-lime-600 text-white p-7 shadow-2xl"
        >
          <div className="absolute right-0 top-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />

          <p className="opacity-80 text-sm">Enter your costs and income to calculate profit or loss</p>

          <h2 className="text-5xl font-black mt-3 tracking-tight">
            Rp {profitAmount.toLocaleString()}
          </h2>

          <p className="mt-2 text-sm opacity-90">
            {profit >= 0 ? "Estimated net profit" : "Estimated net loss"}
          </p>

          <div className="mt-5">
            <div className={`badge badge-lg px-5 py-4 ${profit >= 0 ? "badge-success" : "badge-error"}`}>
              {profitLabel} {profit >= 0 ? "🌱" : "📉"}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-[1.7rem] bg-base-100 border border-base-300 shadow-lg p-4"
          >
            <div className="text-primary text-xl">
              <FaSeedling />
            </div>

            <p className="text-xs text-base-content/60 mt-3">Crop Count</p>

            <h2 className="text-lg font-bold mt-1">
              {cropExpenseItems.length}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-[1.7rem] bg-base-100 border border-base-300 shadow-lg p-4"
          >
            <div className="text-warning text-xl">💰</div>

            <p className="text-xs text-base-content/60 mt-3">Total Expense</p>

            <h2 className="text-lg font-bold mt-1">
              Rp {totalExpense.toLocaleString()}
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

            <p className="text-xs text-base-content/60 mt-3">Income</p>

            <h2 className="text-lg font-bold mt-1">
              Rp {income.toLocaleString()}
            </h2>
          </motion.div>
        </div>

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
              Input the expense amount for each crop.
            </p>
          </div>

          {cropExpenseItems.length === 0 ? (
            <p className="text-base-content/70">No crops available yet.</p>
          ) : (
            cropExpenseItems.map((crop) => (
              <div key={crop.name} className="grid grid-cols-[1fr_auto] gap-4 items-center">
                <div>
                  <p className="text-sm text-base-content/70">{crop.name}</p>
                  <p className="text-xs text-base-content/50 mt-1">{crop.harvest}</p>
                </div>
                <input
                  type="number"
                  className="input input-bordered w-full max-w-[180px] rounded-2xl px-4 py-3"
                  placeholder="0"
                  value={cropCosts[crop.name] ?? 0}
                  onChange={(e) =>
                    setCropCosts((current) => ({
                      ...current,
                      [crop.name]: Number(e.target.value),
                    }))
                  }
                />
              </div>
            ))
          )}

          <div className="pt-4 border-t border-base-200">
            <label className="label">
              <span className="label-text">Harvest Income</span>
            </label>
            <input
              type="number"
              className="input input-bordered w-full rounded-2xl px-4 py-3"
              placeholder="Harvest Income"
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
            />
          </div>
        </motion.div>
      </div>
      <BottomNav />
    </div>
  );
}
