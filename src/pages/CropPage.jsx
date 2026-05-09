import { useState } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function CropPage({ crops, setCrops }) {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const [newCrop, setNewCrop] = useState({
    name: "",
    harvest: "",
  });

  const handleAddCrop = () => {
    if (!newCrop.name || !newCrop.harvest) return;

    const crop = {
      name: newCrop.name,
      harvest: newCrop.harvest,
      progress: 30,
      status: "Growing",
      tip: "Maintain soil moisture regularly",
      daysLeft: 10,
    };

    setCrops([crop, ...crops]);

    setNewCrop({
      name: "",
      harvest: "",
    });

    setShowModal(false);
  };

  const getBadgeClass = (progress) => {
    if (progress >= 90) return "badge-success";
    if (progress >= 60) return "badge-warning";
    return "badge-neutral";
  };

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
              Crop Schedule
            </h1>

            <p className="text-sm text-base-content/60">
              Track your farming progress
            </p>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-2xl mx-auto px-5 pt-6 space-y-5">
        {crops.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-base-100 rounded-[2rem] p-10 text-center shadow-xl border border-base-300"
          >
            <div className="text-6xl mb-5">🌱</div>

            <h2 className="text-2xl font-bold text-base-content">
              No Crops Yet
            </h2>

            <p className="text-base-content/60 mt-2">
              Start tracking your first farming activity
            </p>

            <button
              onClick={() => setShowModal(true)}
              className="btn btn-primary rounded-2xl mt-6"
            >
              Add Your First Crop
            </button>
          </motion.div>
        ) : (
          crops.map((crop, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{
                y: -4,
                scale: 1.01,
              }}
              transition={{ duration: 0.2 }}
              className="relative overflow-hidden rounded-[2rem] bg-base-100/90 backdrop-blur shadow-xl border border-base-300"
            >
              {/* accent */}
              <div className="absolute left-0 top-0 h-full w-1.5 bg-primary" />

              <div className="p-6">
                {/* TOP */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🌾</span>

                      <h2 className="text-2xl font-bold text-primary">
                        {crop.name}
                      </h2>
                    </div>

                    <p className="text-sm text-base-content/60 mt-2">
                      Harvest: {crop.harvest}
                    </p>
                  </div>

                  <div
                    className={`badge ${getBadgeClass(
                      crop.progress,
                    )} badge-outline px-4 py-3`}
                  >
                    {crop.status}
                  </div>
                </div>

                {/* PROGRESS */}
                <div className="mt-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-base-content/60">
                      Growth Progress
                    </span>

                    <span className="font-bold text-primary">
                      {crop.progress}%
                    </span>
                  </div>

                  <div className="w-full bg-base-300 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${crop.progress}%` }}
                      transition={{ duration: 1 }}
                      className="bg-primary h-3 rounded-full"
                    />
                  </div>
                </div>

                {/* BOTTOM INFO */}
                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-base-content">
                      ⏳ {crop.daysLeft} Days Left
                    </p>

                    <p className="text-xs text-base-content/60 mt-1">
                      🌱 {crop.tip}
                    </p>
                  </div>

                  <div className="text-4xl opacity-80">🌿</div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* FLOATING BUTTON */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-24 right-6 btn btn-primary btn-circle shadow-2xl hover:scale-110 transition"
      >
        <FaPlus />
      </button>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-end sm:items-center justify-center z-50">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-base-100 w-full sm:w-[420px] rounded-t-[2rem] sm:rounded-[2rem] p-6 shadow-2xl"
          >
            <h2 className="text-2xl font-extrabold text-primary">
              Add New Crop
            </h2>

            <p className="text-sm text-base-content/60 mt-1">
              Start monitoring your farming activity
            </p>

            <div className="space-y-4 mt-6">
              <input
                type="text"
                placeholder="Crop Name"
                className="input input-bordered w-full rounded-2xl"
                value={newCrop.name}
                onChange={(e) =>
                  setNewCrop({
                    ...newCrop,
                    name: e.target.value,
                  })
                }
              />

              <input
                type="text"
                placeholder="Harvest Time"
                className="input input-bordered w-full rounded-2xl"
                value={newCrop.harvest}
                onChange={(e) =>
                  setNewCrop({
                    ...newCrop,
                    harvest: e.target.value,
                  })
                }
              />

              <button
                onClick={handleAddCrop}
                className="btn btn-primary w-full rounded-2xl text-white"
              >
                Save Crop
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
