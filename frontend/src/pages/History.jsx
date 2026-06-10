import { useEffect, useState } from "react";
import axios from "axios";

function History() {
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const token =
  localStorage.getItem(
    "token"
  );

const response =
  await axios.get(
    "http://127.0.0.1:8000/history",
    {
      headers: {
        Authorization:
          `Bearer ${token}`
      }
    }
  );

      setHistory(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load history");
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="page-container">
      <h1
        style={{
          textAlign: "center",
          marginBottom: "25px",
        }}
      >
        Interview History
      </h1>

      {history.length === 0 ? (
        <div className="card">
          <h3>No interview history found</h3>
        </div>
      ) : (
        history.map((item) => (
          <div
            key={item.id}
            className="card"
            style={{
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
                marginBottom: "15px",
              }}
            >
              <h2>
                Interview #{item.id}
              </h2>

              <span
                style={{
                  background:
                    item.score >= 7
                      ? "#22c55e"
                      : item.score >= 4
                      ? "#f59e0b"
                      : "#ef4444",

                  color: "white",
                  padding: "8px 14px",
                  borderRadius: "20px",
                  fontWeight: "bold",
                }}
              >
                Score: {item.score || "N/A"}
              </span>
            </div>

            <p>
              <b>Session ID:</b>{" "}
              {item.session_id}
            </p>

            <br />

            <p>
              <b>Question:</b>
            </p>

            <div
              style={{
                background: "#374151",
                padding: "12px",
                borderRadius: "10px",
              }}
            >
              {item.question}
            </div>

            <br />

            <p>
              <b>Answer:</b>
            </p>

            <div
              style={{
                background: "#374151",
                padding: "12px",
                borderRadius: "10px",
              }}
            >
              {item.answer}
            </div>

            <br />

            <details>
              <summary
                style={{
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                View AI Feedback
              </summary>

              <div
                style={{
                  marginTop: "15px",
                  whiteSpace: "pre-wrap",
                }}
              >
                {item.feedback ||
                  "No feedback available"}
              </div>
            </details>
          </div>
        ))
      )}
    </div>
  );
}

export default History;