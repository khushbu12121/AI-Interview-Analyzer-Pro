import { useEffect, useState } from "react";
import axios from "axios";

function Summary() {

  const [summary, setSummary] =
    useState("");

  useEffect(() => {

    fetchSummary();

  }, []);

  const fetchSummary =
    async () => {

      try {

        const sessionId =
          localStorage.getItem(
            "sessionId"
          );

        const response =
          await axios.get(
            `http://127.0.0.1:8000/summary/${sessionId}`
          );
          console.log("Summary Data:", response.data);

        setSummary(
          response.data.summary
        );

      } catch (error) {

        console.log(error);

        alert(
          "Failed to load summary"
        );
      }
    };

  return (

    <div className="page-container">

      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px"
        }}
      >
        AI Interview Summary
      </h1>

      <div
        className="card"
        style={{
          whiteSpace: "pre-wrap",
          lineHeight: "1.8",
          fontSize: "16px"
        }}
      >
        {summary}
      </div>

    </div>
  );
}

export default Summary;