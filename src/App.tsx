import './App.css';
import './variables.css';

import { Route, Routes } from 'react-router-dom';
import { YearTrackerPage } from './pages/YearTrackerPage';
import { AppLayout } from './layout';
import { Habits } from './components/Habits';
import { HabitsPage } from './pages/HabitsPage';
import { EmptyHabits } from './components/EmptyHabits';

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={'Main Page!'} />
        <Route path="/yearTracker" element={<YearTrackerPage />} />
        <Route path="/habits" element={<HabitsPage />}>
          <Route index element={<EmptyHabits />} />
          <Route path=":habitId" element={<Habits />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
