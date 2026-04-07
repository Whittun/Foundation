import "./App.css";
import "./variables.css";

import { Route, Routes } from "react-router-dom";
import { YearTrackerPage } from "./pages/YearTrackerPage";
import { AppLayout } from "./layout";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={'Main Page!'} />
        <Route path="/yearTracker" element={<YearTrackerPage />} />
      </Route>
    </Routes>
  );
}

export default App;
