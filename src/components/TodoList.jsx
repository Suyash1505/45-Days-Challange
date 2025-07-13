import React, { useState } from "react";

export default function TodoList({ title, tasks, setTasks, incrementValue }) {
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim() === "") return;
    setTasks([...tasks, { text: input, completed: false }]);
    setInput("");
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-sky-200 mb-2">{title}</h3>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          className="flex-1 rounded-lg p-2 text-black"
          placeholder="Add a task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button
          onClick={addTask}
          className="bg-sky-500 hover:bg-sky-600 rounded-lg px-4 py-2 text-white"
        >
          Add
        </button>
      </div>
      <ul className="space-y-1 max-h-60 overflow-y-auto">
        {tasks.map((task, index) => (
          <li
            key={index}
            className={`flex justify-between items-center p-2 rounded-lg ${
              task.completed
                ? "bg-sky-600 line-through text-sky-200"
                : "bg-sky-800"
            }`}
          >
            <span
              onClick={() => toggleTask(index)}
              className="cursor-pointer flex-1"
            >
              {task.text}
            </span>
            <button
              onClick={() => deleteTask(index)}
              className="text-red-300 hover:text-red-400 ml-2"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
