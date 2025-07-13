import React from "react";

export default function DayCounter({startDate}){

    const today = new Date();
    const start = new Date(startDate);
    const diffTime = today - start;
    const diffDays = Math.floor(diffTime/(1000 * 60 * 60 * 24)) + 1;

    return (
    <p className="mt-2 text-lg text-sky-300">Day {diffDays} / 45</p>
  );
}