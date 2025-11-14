import React, { useState, useEffect } from 'react';
import Overview from '../components/quickAccess/overview.jsx';
import TimeTable from '../components/timeTable/timeTable.jsx';
import NoteOverview from '../components/notesZone/noteOverview.jsx';
import AlertOverview from '../components/alertZone/alertOverview.jsx';
import apiClient from '../api/apiClient'; // <-- Import API client

// --- Mock Data (for components we haven't built a backend for) ---
const timeTableData = {
  slots:[
  { time: "9:30 am - 11:10 am", subject: "ADBM", bgColor: "bg-zinc-800", barColor: "bg-blue-500" },
  { time: "11:20 am - 12:50 am", subject: "Computer Networks", bgColor: "bg-zinc-800", barColor: "bg-blue-500" },
  { time: "2:00 pm - 5:00 pm", subject: "Foundation of ML", bgColor: "bg-zinc-800", barColor: "bg-blue-500" },
  { time: "6:00 pm - 8:00 pm", subject: "Valorant", bgColor: "bg-red-900/50", barColor: "bg-red-600" },
]};

const overviewData = {
  slots : [
    {
      type: "Quiz",
      summary: "Complete Quiz in LMS",
      color: "bg-green-400",
      subject: "Soft Skills"
    },
    {
      type: "Assignment",
      summary: "Complete Assignment 3",
      color: "bg-cyan-400",
      subject: "Full Stack"
    },
  ]
}

// --- MOCK DATA REMOVED FOR STUDY ZONE AND ALERTS ---
// const studyZoneData = { ... };
// const alertsData = { ... };

// --- Main Page Component ---

export default function HomePage() {
  // --- ADDED: State for API data ---
  const [alerts, setAlerts] = useState([]);
  const [folders, setFolders] = useState([]);
  
  // --- ADDED: Fetch data on load ---
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch alerts
        const alertsResponse = await apiClient.get('/alerts');
        // Let's just show the top 3
        setAlerts(alertsResponse.data.slice(0, 3)); 
      } catch (err) {
        console.error("Failed to fetch alerts:", err);
      }

      try {
        // Fetch folders (for Study Zone)
        const foldersResponse = await apiClient.get('/folders');
        // Let's just show the top 3
        setFolders(foldersResponse.data.slice(0, 3));
      } catch (err) {
        console.error("Failed to fetch folders:", err);
      }
    };
    
    fetchDashboardData();
  }, []); // Runs once on page load

  // --- ADDED: Helper to format data for components ---
  const studyZoneSlots = folders.map(folder => ({
    id: folder.id,
    category: "Folder",
    title: folder.title,
    subtitle: `Click to view notes`,
    pages: "" // We don't have this data, so we'll hide it
  }));
  
  const alertSlots = alerts.map(alert => ({
    id: alert.id,
    title: alert.title,
    date: alert.date // You might want to format this date
  }));


  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* --- LEFT COLUMN (Still mock data) --- */}
        <div className="lg:col-span-3 flex flex-col gap-8">
          <Overview slots={overviewData.slots}/>
          <TimeTable slots={timeTableData.slots}/>
        </div> 
        
        {/* --- RIGHT COLUMN (Now has real data) --- */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          {/* Study Zone */}
          <NoteOverview slots={studyZoneSlots}/>
          
          {/* Alerts */}
          <div>
            <AlertOverview slots={alertSlots}/>
          </div>
          
        </div>
      </div>
    </div>
  );
}