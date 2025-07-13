import React from "react";

export default function ProgressBar({ label, current, total, onIncrement }){
    const percentage = Math.min((current/total)*100, 100);

    return (
        <div className="bg-slate-700 rounded-xl p-4">
      
            <div className="flex justify-between mb-2">
                <span>{label}</span>
                <span>{current} / {total}</span>
            </div>
            
            <div className="w-full bg-slate-900 rounded-full h-4 overflow-hidden">
                <div
                className="bg-emerald-400 h-4 rounded-full"
                style={{ width: `${percentage}%` }}
                ></div>
            </div>
            
            <button 
                onClick={onIncrement} 
                className="mt-2 w-full bg-emerald-500 hover:bg-emerald-600 rounded-lg py-1 text-sm font-semibold">+ Add Progress
            </button>
        </div>
    )
}