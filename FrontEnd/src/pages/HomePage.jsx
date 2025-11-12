import React from 'react';
import Overview from '../components/quickAccess/overview.jsx';
import TimeTable from '../components/timeTable/timeTable.jsx';
import NoteOverview from '../components/notesZone/noteOverview.jsx';
import AlertOverview from '../components/alertZone/alertOverview.jsx';

// --- Mock Data ---
// In a real app, this data would come from an API or state management
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

const studyZoneData = {
  slots:[
    { 
      category: "Formal Language and Automata Theory", 
      title: "Lecture 31: Monday", 
      subtitle: "Turing Machine and Complexity Problems", 
      pages: "12 Pages" 
    },
    { 
      category: "Foundation Of Machine Learning", 
      title: "Lecture 23: Tuesday", 
      subtitle: "Reinforcement Learning", 
      pages: "22 Pages" 
    },
    { 
      category: "Full Stack", 
      title: "Lecture 19: Wednesday", 
      subtitle: "Introduction To Spring", 
      pages: "10 Pages" 
    }
  ]
};

const alertsData = {
  slots:[
    { title: "Deadline: Assignment FLAT", date: "11 Nov" },
    { title: "Deadline: Practical files ADBMS", date: "10 Nov" },
    { title: "Deadline: Assignment FLAT", date: "11 Nov" },
  ]
};

// --- Main Page Component ---

export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* --- LEFT COLUMN --- */}
        <div className="lg:col-span-3 flex flex-col gap-8">
          
          {/* Date & Tasks */}
          <Overview slots={overviewData.slots}/>
          
          {/* Time Table*/}
          <TimeTable slots={timeTableData.slots}/>
        </div> 
        
        {/* --- RIGHT COLUMN --- */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          {/* Study Zone */}
          <NoteOverview {...studyZoneData}/>
          
          {/* Alerts */}
          <div>
            <AlertOverview {...alertsData}/>
          </div>
          
        </div>
      </div>
    </div>
  );
}

