import React from "react"
import { useEffect, useState } from "react"
import MotivationBanner from "./components/MotivationBanner"
import DayCounter from "./components/DayCounter"
import ProgressBar from "./components/ProgressBar"
import TodoList from "./components/TodoList"

function App() {
  
  const [completedQuestions, setCompletedQuestions] = useState( () => {
    const number = Number(localStorage.getItem('completedQuestions')) || 0;
    return number;
  })

  const [completedHours, setCompletedHours] = useState( () => {
    const hours = Number(localStorage.getItem('completedHours')) || 0;
    return hours;
  })

  useEffect( () => {
    localStorage.setItem('completedQuestions', completedQuestions);
    localStorage.setItem('completedHours', completedHours);
  }, [completedQuestions, completedHours])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col items-center p-4">
      <MotivationBanner />
      <DayCounter startDate="2025-07-14" />
      
      <div className="w-full max-w-md mt-6 space-y-4">
        <ProgressBar 
          label="DSA Questions" 
          current={completedQuestions} 
          total={270} 
          onIncrement={() => setCompletedQuestions(prev => prev + 1)}
        />
        
        <ProgressBar 
          label="Backend Hours" 
          current={completedHours} 
          total={33.5} 
          onIncrement={() => setCompletedHours(prev => +(prev + 0.5).toFixed(1))}
        />

        <TodoList />
      </div>
    </div>
  )
}

export default App
