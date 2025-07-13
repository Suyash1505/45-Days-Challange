import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import bg from "./assets/bg1.jpg";
import TodoList from "./components/TodoList";

// Helper: Get current date/time in IST timezone
function getISTDate() {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000; // UTC in ms
  const istOffset = 5.5 * 60 * 60000; // IST = UTC + 5:30
  return new Date(utc + istOffset);
}

// Calculate challenge day based on IST midnight
function getChallengeDay(startDateStr = "2025-07-14") {
  const nowIST = getISTDate();

  const todayMidnightIST = new Date(
    nowIST.getFullYear(),
    nowIST.getMonth(),
    nowIST.getDate()
  );

  const startDate = new Date(startDateStr);
  const startMidnight = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate()
  );

  const diffTime = todayMidnightIST - startMidnight;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return diffDays >= 0 ? diffDays + 1 : 0;
}

export default function App() {
  // Initialize selected date to current IST date in yyyy-mm-dd
  const [selectedDate, setSelectedDate] = useState(() => {
    const nowIST = getISTDate();
    return nowIST.toISOString().split("T")[0];
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

  // Retrieve and save tasks for selected date from localStorage
  const getTasks = (key) => JSON.parse(localStorage.getItem(`${key}-${selectedDate}`)) || [];
  const setTasks = (key, tasks) => localStorage.setItem(`${key}-${selectedDate}`, JSON.stringify(tasks));

  const [dsaTasks, setDsaTasks] = useState(() => getTasks('dsaTasks'));
  const [webTasks, setWebTasks] = useState(() => getTasks('webTasks'));

  useEffect(() => setTasks('dsaTasks', dsaTasks), [dsaTasks, selectedDate]);
  useEffect(() => setTasks('webTasks', webTasks), [webTasks, selectedDate]);

  const dsaCompleted = dsaTasks.filter(task => task.completed).length;
  const dsaTotal = 270;
  const dsaPercentage = Math.min((dsaCompleted / dsaTotal) * 100, 100);

  const webCompleted = webTasks.filter(task => task.completed).length;
  const webTotal = 67; // 33.5 hours * 2 for 0.5 increments
  const webPercentage = Math.min((webCompleted / webTotal) * 100, 100);

  return (
    <div
      className="min-h-screen bg-cover bg-center p-4 flex flex-col items-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <h1 className="text-4xl font-bold text-sky-400 mb-2">45 Days Challenge</h1>
      <p className="italic text-sky-200 mb-4 text-center">{quote}</p>

      <p className="mt-2 text-lg text-sky-300">
        Day {getChallengeDay()} / 45
      </p>

      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="mb-4 bg-sky-800 text-sky-100 p-2 rounded"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
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
