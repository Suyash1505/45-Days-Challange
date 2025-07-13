import React from "react";

const quotes = [
    "Push yourself, because no one else is going to do it for you.",
    "Consistency beats motivation.",
    "One day, or day one. You decide.",
    "Focus. Execute. Repeat.",
    "You are building your future today."
];

export default function MotivationBanner() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  
  return (
    <div className="text-center mt-4">
      <h1 className="text-3xl font-bold text-emerald-400">45 Days Challenge</h1>
      <p className="text-gray-300 mt-2 italic">{quote}</p>
    </div>
  );
}