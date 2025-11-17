import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- ADDED THIS IMPORT
import Overview from '../components/quickAccess/overview.jsx';
import TimeTable from '../components/timeTable/timeTable.jsx';
import NoteOverview from '../components/notesZone/noteOverview.jsx';
import AlertOverview from '../components/alertZone/alertOverview.jsx';
import apiClient from '../api/apiClient'; 
import LogoutButton from '../components/common/LogoutButton.jsx';

export default function HomePage() {
  const navigate = useNavigate(); // <-- Initialize hook
  
  // State for all dashboard widgets
  const [alerts, setAlerts] = useState([]);
  const [folders, setFolders] = useState([]);
  const [todos, setTodos] = useState([]); 
  const [todaysSchedule, setTodaysSchedule] = useState([]); 

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // 1. Fetch Alerts
        const alertsResponse = await apiClient.get('/alerts');
        setAlerts(alertsResponse.data.slice(0, 3)); 

        // 2. Fetch Folders (Study Zone)
        const foldersResponse = await apiClient.get('/folders');
        setFolders(foldersResponse.data.slice(0, 3));

        // 3. Fetch To-Dos (For Overview)
        const todoResponse = await apiClient.get('/todos');
        const activeTodos = todoResponse.data
            .filter(t => t.status !== 2) 
            .slice(0, 3); 
        setTodos(activeTodos);

        // 4. Fetch Schedule (For TimeTable)
        const scheduleResponse = await apiClient.get('/schedule');
        
        // Calculate "Today"
        const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const todayKey = days[new Date().getDay()]; 
        
        const todaySlots = scheduleResponse.data[todayKey] || [];
        setTodaysSchedule(todaySlots);

      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      }
    };
    
    fetchDashboardData();
  }, []); 

  // --- Data Mappers ---
  const overviewSlots = todos.map(todo => {
    let colorClass = "bg-red-400"; 
    if (todo.status === 1) colorClass = "bg-orange-400"; 
    if (todo.status === 2) colorClass = "bg-green-400";
    
    return {
        type: todo.category,
        summary: todo.description,
        subject: todo.tag,
        color: colorClass
    };
  });

  const studyZoneSlots = folders.map(folder => ({
    id: folder.id,
    category: "Folder",
    title: folder.title,
    subtitle: `Click to view notes`,
    pages: ""
  }));
  
  const alertSlots = alerts.map(alert => ({
    id: alert.id,
    title: alert.title,
    date: alert.date
  }));

  // --- Handler for Time Table Click ---
  const handleTimeTableClick = () => {
      navigate('/weekly');
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      
      {/* --- Header --- */}
      <div className="max-w-[1600px] mx-auto mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-zinc-400 text-sm mt-1">Welcome back to MyManager</p>
        </div>
        <LogoutButton />
      </div>

      {/* --- Main Grid --- */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-[1600px] mx-auto">
        
        {/* Left Column */}
        <div className="lg:col-span-3 flex flex-col gap-8">
          
          {/* To-Do Overview */}
          <Overview slots={overviewSlots.length > 0 ? overviewSlots : [{ type: "Relax", summary: "No pending tasks", subject: "Free Time", color: "bg-green-400" }]}/>
          
          {/* Time Table Section */}
          {todaysSchedule.length > 0 ? (
             <TimeTable slots={todaysSchedule}/>
          ) : (
             // EMPTY STATE: Now has Header + Click Event
             <div 
                onClick={handleTimeTableClick}
                className="cursor-pointer transition-all hover:opacity-80"
             >
                <h2 className="text-3xl font-bold mb-6">Time Table</h2>
                <div className="bg-zinc-800 rounded-lg p-8 text-center text-zinc-500 shadow-lg">
                    <h2 className="text-2xl font-bold mb-2">No Classes Today</h2>
                    <p>Enjoy your free time! (Click to view weekly)</p>
                </div>
             </div>
          )}
        </div> 
        
        {/* Right Column */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <NoteOverview slots={studyZoneSlots}/>
          <div>
            <AlertOverview slots={alertSlots}/>
          </div>
        </div>
      </div>
    </div>
  );
}