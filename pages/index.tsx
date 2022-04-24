import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>Main page</main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
