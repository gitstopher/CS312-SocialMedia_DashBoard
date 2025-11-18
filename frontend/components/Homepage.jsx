import styles from "./Homepage.module.css";

export default function Homepage() {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1>Welcome to Social Media Dashboard</h1>
        <p>Track your posts, followers, and analytics in one place.</p>
      </section>
    </div>
  );
}
