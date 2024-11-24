// import { Categories } from "./components/Categories/Categories";
import { Objectives } from "./components/Objectives/Objectives";

import styles from "./App.module.css";

function App() {
  return (
    <div className={styles["app-wrapper"]}>
      {/* <Categories /> */}
      <Objectives />
    </div>
  );
}

export default App;
