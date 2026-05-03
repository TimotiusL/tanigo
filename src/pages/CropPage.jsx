import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CropPage() {
  const navigate = useNavigate();

  const [crop, setCrop] = useState("");
  const [date, setDate] = useState("");
  const [list, setList] = useState([]);

  const addData = () => {
    if (!crop || !date) return;
    setList([...list, { crop, date }]);
    setCrop("");
    setDate("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eaf5e6] to-white p-4">
      {/* HEADER */}
      <div className="max-w-2xl mx-auto mb-4 flex items-center justify-between">
        <button onClick={() => navigate("/")} className="btn btn-sm">
          ← Back
        </button>
        <h1 className="font-bold text-green-700">Crop Schedule 🌾</h1>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        {/* FORM */}
        <div className="card bg-white shadow-md p-4 space-y-3">
          <input
            type="text"
            placeholder="Crop name"
            className="input input-bordered w-full"
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
          />
          <input
            type="date"
            className="input input-bordered w-full"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button onClick={addData} className="btn bg-green-600 text-white">
            Add Schedule
          </button>
        </div>

        {/* LIST */}
        {list.map((item, i) => (
          <div key={i} className="card bg-white shadow-sm p-4">
            <h3 className="font-semibold text-green-700">{item.crop}</h3>
            <p className="text-sm text-gray-500">{item.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
