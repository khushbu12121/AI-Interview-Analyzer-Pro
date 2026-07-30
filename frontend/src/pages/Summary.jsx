import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import api from "../api";

function Summary() {

  const [summary, setSummary] =
    useState("");
  const [loading, setLoading] = useState(true);

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
await api.get(
    `/summary/${sessionId}`
);

console.log("Summary Data:", response.data);
          console.log("Summary Data:", response.data);

        setSummary(
          response.data.summary
        );
        setLoading(false);

      } catch (error) {

        console.log(error);

        toast.error("Failed to load summary");
        setLoading(false);
      }
    };
    if (loading) {
  return <Loader />;
}

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