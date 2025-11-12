import React from 'react';

import BackButton from '../components/common/backbutton';
import TimeTable from '../components/timeTable/timeTable';
import ToDo from '../components/toDo/toDo';
// --- Mock Data ---
// In a real app, this data would come from an API based on the selected date
const timeTableData = {
  slots:[
    { time: "9:30 am - 11:10 am", subject: "ADBM", bgColor: "bg-zinc-800", barColor: "bg-blue-500" },
    { time: "11:20 am - 12:50 am", subject: "Computer Networks", bgColor: "bg-zinc-800", barColor: "bg-blue-500" },
    { time: "2:00 pm - 5:00 pm", subject: "Foundation of ML", bgColor: "bg-zinc-800", barColor: "bg-blue-500" },
    { time: "6:00 pm - 8:00 pm", subject: "Valorant", bgColor: "bg-red-900/50", barColor: "bg-red-600" },
]};
 
const todoListData = 
{slots: [
    { category: "Quiz", description: "Complete Quiz on LMS", tag: "Soft Skills", bgColor: "bg-green-500" },
    { category: "Quiz", description: "Complete Quiz on LMS", tag: "Soft Skills", bgColor: "bg-blue-500" },
    { category: "Quiz", description: "Complete Quiz on LMS", tag: "Soft Skills", bgColor: "bg-red-500" },
    { category: "Quiz", description: "Complete Quiz on LMS", tag: "Soft Skills", bgColor: "bg-orange-500" },
]};

// --- Main Page Component ---

export default function DailyViewPage() {
  
  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Back Button --- */}
        <BackButton to="/"/>
        {/* --- Date Header --- */}
        <div className="mb-12 pb-4 border-b-4 border-blue-500">
          <h1 className="flex items-baseline">
            <span className="text-7xl font-bold">7</span>
            <span className="text-4xl font-semibold ml-4">November 2025</span>
          </h1>
        </div>

        {/* --- Main Content Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Left Column: Time Table */}
          <TimeTable slots={timeTableData.slots}/>
          
          {/* Right Column: Today's Do List */}
          <ToDo {...todoListData}/>

        </div>
      </div>
    </div>
  );
}