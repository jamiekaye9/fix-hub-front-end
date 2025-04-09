import styles from './Landing.module.css';

const Landing = () => {
    return (
        <main className={styles.landing}>
            <img className="big-logo" src="/Images/fix-hub-logo.png" alt="Fix Hub Logo" />
            <h1>Welcome to Fix Hub</h1>
        </main>
    )
}

export default Landing;