import styles from "./App.module.css";
import { Route, Routes } from "react-router";
import { Layout } from "./components/Layout/Layout";
import { Objectives } from "./components/Objectives/Objectives";

function App() {
  return (
    <div className={styles["app-wrapper"]}>
      <Routes>
        <Route path="/Foundation" element={<Layout />}>
          <Route path=":categoryName" element={<Objectives />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
