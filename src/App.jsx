// 45 Days Challenge App with Correct IST Date Display and Day Counter
// Ready for direct Vercel deployment

import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import bg from "./assets/bg1.jpg";
import TodoList from "./components/TodoList";

function getISTDate() {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const istOffset = 5.5 * 60 * 60000;
  return new Date(utc + istOffset);
}

function getChallengeDay(startDateStr = "2025-07-14") {
  const now = getISTDate();
  const startDate = new Date(startDateStr + "T00:00:00+05:30");
  const diffTime = now - startDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays >= 0 ? diffDays + 1 : 0; // show Day 1 on start date
}

export default function App() {
  const [selectedDate, setSelectedDate] = useState(() => {
    const now = getISTDate();
    const dateStr = now.getFullYear() + "-" +
                    String(now.getMonth() + 1).padStart(2, '0') + "-" +
                    String(now.getDate()).padStart(2, '0');
    return dateStr;
  });

  const [quote, setQuote] = useState("Discipline creates freedom.");
  const quotes = [
    "Focus. Execute. Repeat.",
    "Consistency beats motivation.",
    "One day, or day one. You decide.",
    "You are building your future today.",
    "Discipline creates freedom."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const [dsaTasks, setDsaTasks] = useState([]);
  const [webTasks, setWebTasks] = useState([]);

  const dsaCompleted = dsaTasks.filter(task => task.completed).length;
  const dsaTotal = 270;
  const dsaPercentage = Math.min((dsaCompleted / dsaTotal) * 100, 100);

  const webCompleted = webTasks.filter(task => task.completed).length;
  const webTotal = 67; // 33.5*2 (0.5 hr units)
  const webPercentage = Math.min((webCompleted / webTotal) * 100, 100);

  return (
    <div
      className="min-h-screen bg-cover bg-center p-4 flex flex-col items-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <h1 className="text-4xl font-bold text-sky-400 mb-2">45 Days Challenge</h1>
      <p className="italic text-sky-200 mb-2 text-center">{quote}</p>
      <p className="mt-2 text-lg text-sky-300">Day {getChallengeDay()} / 45</p>
      <p className="mt-1 text-md text-sky-200">Date: {selectedDate}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mt-6">
        <div className="bg-sky-900/50 backdrop-blur-md p-4 rounded-xl flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-sky-300 mb-2">DSA Progress</h2>
          <div className="w-28 h-28 mb-4">
            <CircularProgressbar
              value={dsaPercentage}
              text={`${Math.round(dsaPercentage)}%`}
              styles={buildStyles({
                pathColor: "#38bdf8",
                textColor: "#bae6fd",
                trailColor: "#1e3a8a",
              })}
            />
          </div>
          <TodoList
            title="DSA Daily Tasks"
            tasks={dsaTasks}
            setTasks={setDsaTasks}
            incrementValue={1}
          />
        </div>

        <div className="bg-sky-900/50 backdrop-blur-md p-4 rounded-xl flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-sky-300 mb-2">Web Dev Progress</h2>
          <div className="w-28 h-28 mb-4">
            <CircularProgressbar
              value={webPercentage}
              text={`${Math.round(webPercentage)}%`}
              styles={buildStyles({
                pathColor: "#38bdf8",
                textColor: "#bae6fd",
                trailColor: "#1e3a8a",
              })}
            />
          </div>
          <TodoList
            title="Web Dev Daily Tasks"
            tasks={webTasks}
            setTasks={setWebTasks}
            incrementValue={0.5}
          />
        </div>
      </div>
    </div>
  );
}