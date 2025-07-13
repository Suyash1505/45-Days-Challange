import React, { useEffect, useState } from "react";

export default function TodoList(){
    const [todos, setTodos] = useState( () => {
        const stored = localStorage.getItem('todos');
        return stored? JSON.parse(stored) : [];
    });

    const [input, setInput] = useState('');

    useEffect( () => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos])

    const addTodo = () => {
        if(input.trim() === ''){
            return;
        }
        setTodos( ([...todos, {text: input, completed: false}]))
        setInput('');
    }

    const toggleComplete = (index) => {
        const update = [...todos];
        update[index].completed = !update[index].completed;
        setTodos(update);
    }

    const deleteTodo = (index) => {
        const updated = todos.filter((_, i) => i !== index);
        setTodos(updated);
    };

    return (
        <div className="bg-slate-700 rounded-xl p-4">
            <h2 className="text-lg font-semibold mb-2">Today's Tasks</h2>
            
            <div className="flex gap-2 mb-2">
                <input
                    type="text"
                    className="flex-1 rounded-lg p-2 text-black"
                    placeholder="Add a task..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addTodo()}
                />
                <button 
                    onClick={addTodo} 
                    className="bg-emerald-500 hover:bg-emerald-600 rounded-lg px-4 py-2">
                    Add
                </button>
            </div>
            
            <ul className="space-y-1 max-h-64 overflow-y-auto">
                {todos.map((todo, index) => (
                <li
                    key={index}
                    className={`flex justify-between items-center p-2 rounded-lg ${todo.completed ? 'bg-emerald-600 line-through text-gray-300' : 'bg-slate-600'}`}
                >
                    <span 
                        onClick={() => toggleComplete(index)} 
                        className="cursor-pointer flex-1">
                        {todo.text}
                    </span>

                    <button 
                        onClick={() => deleteTodo(index)} 
                        className="text-red-300 hover:text-red-400 ml-2">
                        ✕
                    </button>
                </li>
                ))}
            </ul>
        </div>
    );
}