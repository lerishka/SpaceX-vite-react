import styles from "./App.module.scss";
import CardList from "../CardList/CardList";

function App() {
  return (
    <div className={styles.appContainer}>
      <h1>SpaceX Launches 2020</h1>
      <CardList />
    </div>
  );
}

export default App;
