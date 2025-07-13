// src/MasterPlan.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import bg from "./assets/bg1.jpg";

export default function MasterPlan() {
  const navigate = useNavigate();

  const masterTasks = [
    "Complete 6 LeetCode contests",
    "Build Focus Flow Project",
    "Build Law Farm Project",
    "Build 1 more mini project",
    "Complete 270 DSA Questions",
    "Complete 33.5 hours Backend",
  ];

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center p-4"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="bg-sky-900/50 backdrop-blur-md p-6 rounded-xl max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold text-sky-300 mb-4">
            🚀 45 Days Master Plan
        </h1>
        
        <ul className="text-sky-100 text-left list-disc list-inside space-y-1 mb-4">
          {masterTasks.map((task, idx) => (
            <li key={idx}>{task}</li>
          ))}
        </ul>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded mt-4"
        >
          Go to Dashboard ➔
        </button>
      </div>
    </div>
  );
}
