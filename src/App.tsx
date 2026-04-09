import "./App.css";
import "./variables.css";

import { Route, Routes } from "react-router-dom";
import { YearTrackerPage } from "./pages/YearTrackerPage";
import { AppLayout } from "./layout";
import { HabitsTrackerPage, HabitDetailsPage } from "./pages/HabitsTrackerPage";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={'Main Page!'} />
        <Route path="/yearTracker" element={<YearTrackerPage />} />
        <Route path="/habitsTracker" element={<HabitsTrackerPage />}>
          <Route index element={<div>choose or create habit</div>} />
          <Route path=":habitId" element={<HabitDetailsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
