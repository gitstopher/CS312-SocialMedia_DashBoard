import styles from "./Feed.module.css";

export default function Feed({ posts }) {
  return (
    <div className={styles.feedContainer}>
      {posts.map(post => (
        <div key={post.id} className={styles.post}>
          <div className={styles.platform}>{post.platform}</div>
          <p>{post.text}</p>
        </div>
      ))}
    </div>
  );
}
