/**
 * Weekly Schedule Mock Data
 * In a real app, this would come from an API or database
 */

export const weeklyScheduleData = {
  monday: [
    { 
      id: 1, 
      time: "9:30 am - 11:10 am", 
      subject: "ADBM", 
      bgColor: "bg-zinc-800", 
      barColor: "bg-blue-500", 
      position: 'start' 
    },
    { 
      id: 2, 
      time: "11:20 am - 12:50 pm", 
      subject: "Computer Networks", 
      bgColor: "bg-zinc-800", 
      barColor: "bg-green-500", 
      position: 'center' 
    },
    { 
      id: 3, 
      time: "2:00 pm - 5:00 pm", 
      subject: "Foundation of ML", 
      bgColor: "bg-zinc-800", 
      barColor: "bg-purple-500", 
      position: 'end' 
    },
    { 
      id: 4, 
      time: "6:00 pm - 8:00 pm", 
      subject: "Valorant", 
      bgColor: "bg-red-900/50", 
      barColor: "bg-red-600", 
      position: 'center' 
    },
  ],
  
  tuesday: [
    { 
      id: 5, 
      time: "9:00 am - 10:30 am", 
      subject: "Database Systems", 
      bgColor: "bg-zinc-800", 
      barColor: "bg-yellow-500", 
      position: 'start' 
    },
    { 
      id: 6, 
      time: "11:00 am - 1:00 pm", 
      subject: "Software Engineering", 
      bgColor: "bg-zinc-800", 
      barColor: "bg-cyan-500", 
      position: 'center' 
    },
  ],
  
  wednesday: [
    { 
      id: 7, 
      time: "10:00 am - 12:00 pm", 
      subject: "Operating Systems", 
      bgColor: "bg-zinc-800", 
      barColor: "bg-orange-500", 
      position: 'start' 
    },
  ],
  
  thursday: [
    { 
      id: 8, 
      time: "9:30 am - 11:10 am", 
      subject: "ADBM Lab", 
      bgColor: "bg-zinc-800", 
      barColor: "bg-blue-500", 
      position: 'center' 
    },
    { 
      id: 9, 
      time: "2:00 pm - 4:00 pm", 
      subject: "Project Work", 
      bgColor: "bg-zinc-800", 
      barColor: "bg-pink-500", 
      position: 'end' 
    },
  ],
  
  friday: [
    { 
      id: 10, 
      time: "11:00 am - 1:00 pm", 
      subject: "Theory of Computation", 
      bgColor: "bg-zinc-800", 
      barColor: "bg-indigo-500", 
      position: 'start' 
    },
    { 
      id: 11, 
      time: "3:00 pm - 5:00 pm", 
      subject: "Seminar", 
      bgColor: "bg-zinc-800", 
      barColor: "bg-teal-500", 
      position: 'center' 
    },
  ],
  
  saturday: [],
  
  sunday: [],
};

export default weeklyScheduleData;
