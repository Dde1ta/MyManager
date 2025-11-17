import React, { useState, useEffect } from 'react';
import BackButton from '../components/common/BackButton';
import TimeTable from '../components/timeTable/timeTable';
import ToDoNode from '../components/toDo/toDoNode';
import apiClient from '../api/apiClient';

// Mock TimeTable Data (Still hardcoded as requested, focusing on ToDo)
const timeTableData = {
  slots: [
    { time: "9:30 am - 11:10 am", subject: "ADBM", bgColor: "bg-zinc-800", barColor: "bg-blue-500" },
    { time: "11:20 am - 12:50 am", subject: "Computer Networks", bgColor: "bg-zinc-800", barColor: "bg-blue-500" },
    { time: "2:00 pm - 5:00 pm", subject: "Foundation of ML", bgColor: "bg-zinc-800", barColor: "bg-blue-500" },
    { time: "6:00 pm - 8:00 pm", subject: "Valorant", bgColor: "bg-red-900/50", barColor: "bg-red-600" },
  ]
};

export default function TodayPage() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Simple Add Task Form State
  const [newCategory, setNewCategory] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newTag, setNewTag] = useState("");

  const today = new Date();
  const dateString = today.toLocaleDateString('default', { month: 'long', year: 'numeric' });
  const dayNum = today.getDate();

  // 1. Fetch Todos
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await apiClient.get('/todos');
        setTodos(response.data);
      } catch (err) {
        console.error("Failed to fetch todos", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTodos();
  }, []);

  // 2. Update Status Handler
  const handleStatusChange = async (id, newStatus) => {
    // Optimistic update
    const originalTodos = [...todos];
    setTodos(todos.map(t => t.id === id ? { ...t, status: newStatus } : t));

    try {
      await apiClient.put(`/todos/${id}/status`, { status: newStatus });
    } catch (err) {
      console.error("Update failed", err);
      setTodos(originalTodos); // Revert on error
    }
  };

  // 3. Delete Handler
  const handleDelete = async (id) => {
    const originalTodos = [...todos];
    setTodos(todos.filter(t => t.id !== id));

    try {
      await apiClient.delete(`/todos/${id}`);
    } catch (err) {
      console.error("Delete failed", err);
      setTodos(originalTodos);
    }
  };

  // 4. Add Task Handler
  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newCategory || !newDesc) return;

    try {
      const newTodo = {
        category: newCategory,
        description: newDesc,
        tag: newTag || "General",
        status: 0 // Start as Pending
      };
      const response = await apiClient.post('/todos', newTodo);
      setTodos([...todos, response.data]);
      // Reset form
      setNewCategory("");
      setNewDesc("");
      setNewTag("");
    } catch (err) {
      console.error("Failed to add todo", err);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        <BackButton to="/"/>
        
        <div className="mb-12 pb-4 border-b-4 border-blue-500">
          <h1 className="flex items-baseline">
            <span className="text-7xl font-bold">{dayNum}</span>
            <span className="text-4xl font-semibold ml-4">{dateString}</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Left: Time Table */}
          <TimeTable slots={timeTableData.slots}/>
          
          {/* Right: To Do List */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-zinc-400">Today's To Do</h2>
            
            {/* Add Task Form */}
            <form onSubmit={handleAddTodo} className="bg-zinc-800 p-4 rounded-lg mb-6 shadow-lg">
                <div className="grid grid-cols-2 gap-2 mb-2">
                    <input 
                        placeholder="Category (e.g. Quiz)" 
                        className="bg-zinc-700 p-2 rounded text-white text-sm"
                        value={newCategory}
                        onChange={e => setNewCategory(e.target.value)}
                    />
                    <input 
                        placeholder="Tag (e.g. Soft Skills)" 
                        className="bg-zinc-700 p-2 rounded text-white text-sm"
                        value={newTag}
                        onChange={e => setNewTag(e.target.value)}
                    />
                </div>
                <input 
                    placeholder="Description" 
                    className="bg-zinc-700 p-2 rounded text-white text-sm w-full mb-3"
                    value={newDesc}
                    onChange={e => setNewDesc(e.target.value)}
                />
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 py-1 rounded font-bold text-sm transition">
                    + Add Task
                </button>
            </form>

            {/* Todo List */}
            <div className="flex flex-col gap-4">
                {isLoading ? (
                    <p className="text-zinc-500 text-center">Loading tasks...</p>
                ) : todos.length > 0 ? (
                    todos.map((item) => (
                        <ToDoNode 
                            key={item.id} 
                            {...item} 
                            onStatusChange={handleStatusChange}
                            onDelete={handleDelete}
                        />
                    ))
                ) : (
                    <p className="text-zinc-500 text-center">No tasks for today!</p>
                )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}