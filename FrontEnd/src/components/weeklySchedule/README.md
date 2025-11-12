# WeeklyPage Component Structure

This document explains how the WeeklyPage has been broken down into multiple reusable components.

## 📁 File Structure

```
src/
├── pages/
│   └── WeeklyPage.jsx              # Main page component
├── components/
│   ├── weekNavigation/
│   │   ├── DayButton.jsx           # Individual day button
│   │   ├── WeekNavigator.jsx       # Week navigation bar
│   │   └── index.js                # Exports
│   ├── weeklySchedule/
│   │   ├── WeeklySchedule.jsx      # Schedule display component
│   │   └── index.js                # Exports
│   └── timeTable/
│       └── timeSlot.jsx            # Reusable time slot card (already existed)
└── data/
    └── weeklyScheduleData.js       # Mock data for weekly schedule
```

## 🧩 Components Breakdown

### 1. **WeeklyPage.jsx** (Main Page)
- **Location**: `src/pages/WeeklyPage.jsx`
- **Purpose**: Main container page for weekly view
- **Features**:
  - Manages selected day state
  - Provides navigation back to home
  - Orchestrates child components
  
### 2. **DayButton.jsx** (Individual Day Button)
- **Location**: `src/components/weekNavigation/DayButton.jsx`
- **Purpose**: Single clickable button for each day
- **Props**:
  - `day` (string): Day abbreviation (Mon, Tue, etc.)
  - `activeDay` (string): Currently selected day
  - `onClick` (function): Handler for day selection
- **Features**:
  - Active/inactive states with different styling
  - Hover effects
  - Accessibility attributes (aria-label, aria-pressed)

### 3. **WeekNavigator.jsx** (Week Navigation Bar)
- **Location**: `src/components/weekNavigation/WeekNavigator.jsx`
- **Purpose**: Fixed bottom bar containing all day buttons
- **Props**:
  - `selectedDay` (string): Currently selected day
  - `onDaySelect` (function): Callback for day selection
- **Features**:
  - Fixed positioning at bottom of screen
  - Renders all 7 DayButton components
  - Responsive spacing

### 4. **WeeklySchedule.jsx** (Schedule Display)
- **Location**: `src/components/weeklySchedule/WeeklySchedule.jsx`
- **Purpose**: Displays the schedule for selected day
- **Props**:
  - `dayName` (string): Name of the selected day
  - `schedule` (array): Array of schedule items
- **Features**:
  - Day title display
  - Dynamic positioning (start, center, end)
  - Empty state message
  - Maps through schedule items

### 5. **TimeSlot.jsx** (Reusable Time Card)
- **Location**: `src/components/timeTable/timeSlot.jsx`
- **Purpose**: Display individual time slot information
- **Props**:
  - `time` (string): Time range
  - `subject` (string): Subject/activity name
  - `bgColor` (string): Tailwind background color class
  - `barColor` (string): Tailwind color for side bar
- **Note**: This component already existed and is reused

### 6. **weeklyScheduleData.js** (Mock Data)
- **Location**: `src/data/weeklyScheduleData.js`
- **Purpose**: Centralized data storage for weekly schedules
- **Structure**: Object with days as keys (monday, tuesday, etc.)
- **Each schedule item includes**:
  - `id`: Unique identifier
  - `time`: Time range string
  - `subject`: Subject/activity name
  - `bgColor`: Background color class
  - `barColor`: Side bar color class
  - `position`: Layout position ('start', 'center', 'end')

## 🔄 Data Flow

```
WeeklyPage
    ↓
    ├→ WeeklySchedule (receives: dayName, schedule)
    │   └→ TimeSlot (receives: time, subject, colors)
    │
    └→ WeekNavigator (receives: selectedDay, onDaySelect)
        └→ DayButton × 7 (receives: day, activeDay, onClick)
```

## 🎨 Styling

All components use:
- **Tailwind CSS** for styling
- **Dark theme** (zinc-900 background)
- **Consistent color scheme**:
  - Blue for active states
  - Zinc for inactive/neutral elements
  - Various colors for subject categorization

## 🚀 Usage Example

```jsx
import WeeklyPage from './pages/WeeklyPage';

// In your router
<Route path="/weekly" element={<WeeklyPage />} />
```

## 🔧 Customization

### To add more schedule data:
Edit `src/data/weeklyScheduleData.js` and add items to the appropriate day array.

### To change day names:
Modify the `daysOfWeek` array in `WeekNavigator.jsx`.

### To adjust positioning:
Change the `position` property in schedule items ('start', 'center', 'end').

### To modify colors:
Update `bgColor` and `barColor` properties with Tailwind color classes.

## ✅ Benefits of This Structure

1. **Reusability**: Components can be used in other pages
2. **Maintainability**: Each component has a single responsibility
3. **Scalability**: Easy to add new features or modify existing ones
4. **Testability**: Smaller components are easier to test
5. **Readability**: Clear separation of concerns
6. **Data Management**: Centralized data in separate file

## 🎯 Future Enhancements

- Add time-based filtering
- Implement drag-and-drop for schedule items
- Add edit/delete functionality
- Connect to backend API
- Add calendar integration
- Include notifications for upcoming events
