import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import Feed from "./components/Feed";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get token from localStorage (after signin flow)
    const token = localStorage.getItem("token");

    fetch("http://localhost:4000/api/feed", {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching feed:", err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />
      <Homepage />
      {loading ? (
        <p style={{ textAlign: "center", marginTop: "2rem" }}>Loading feed...</p>
      ) : (
        <Feed posts={posts} />
      )}
    </>
  );
}

export default App;
