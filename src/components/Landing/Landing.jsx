import styles from "./Landing.module.css";
import logo from "../../assets/Images/fix-hub-logo.png";

const Landing = () => {
  return (
    <main className={styles.landing}>
      <img
        className="big-logo"
        src={logo}
        alt="Fix Hub Logo"
      />
      <h1 className={styles.title}>Welcome to Fix Hub</h1>
    </main>
  );
};

export default Landing;
