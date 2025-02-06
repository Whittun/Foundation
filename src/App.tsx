import styles from "./App.module.css";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { Objectives } from "./components/Objectives/Objectives";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";

function App() {
  return (
    <div className={styles["app-wrapper"]}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            path="objectives/:categoryName"
            element={
              <ErrorBoundary fallback={"page is not defined"}>
                <Objectives />
              </ErrorBoundary>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
