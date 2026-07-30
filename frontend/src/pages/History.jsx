import Loader from "../components/Loader";
import toast from "react-hot-toast";
import "./History.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StatCard from "../components/StatCard";

import {
  FaFolderOpen,
  FaChartLine,
  FaTrophy
} from "react-icons/fa";

function History() {

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const fetchHistory = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://127.0.0.1:8000/history",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setHistory(response.data);

    } catch (error) {

      console.log(error);

      toast.error("Failed to load history");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchHistory();

  }, []);

  const deleteHistory = async (sessionId) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this interview?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `http://127.0.0.1:8000/history/${sessionId}`
      );

      toast.success("Interview deleted");

      fetchHistory();

    } catch (error) {

      console.log(error);

      toast.error("Delete failed");

    }

  };

  const scores = history
    .map(item => Number(item.average_score))
    .filter(score => !isNaN(score));

  const totalInterviews = history.length;

  const averageScore =
    scores.length > 0
      ? (
          scores.reduce((sum, score) => sum + score, 0) /
          scores.length
        ).toFixed(1)
      : "0.0";

  const bestScore =
    scores.length > 0
      ? Math.max(...scores).toFixed(1)
      : "0.0";

  if (loading) {

    return <Loader />;

  }
    return (
  <div className="history-page">

    {/* ---------- PAGE HEADER ---------- */}

    <div className="history-header-section">

      <div>

        <h1 className="page-title">
          Interview History
        </h1>

        <p className="page-subtitle">
          Track every interview you've completed, compare your scores and
          revisit detailed AI reports anytime.
        </p>

      </div>

    </div>

    {/* ---------- SEARCH ---------- */}

    <div className="search-wrapper">

      <input
        type="text"
        className="search-box"
        placeholder="🔍 Search interview by Session ID..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

    </div>

   {/* ---------- SUMMARY ---------- */}

<div className="history-stats-grid">

  <StatCard
    icon={<FaFolderOpen />}
    title="Interviews"
    value={totalInterviews}
    color="#6366f1"
  />

  <StatCard
    icon={<FaChartLine />}
    title="Average Score"
    value={averageScore}
    color="#10b981"
  />

  <StatCard
    icon={<FaTrophy />}
    title="Best Score"
    value={bestScore}
    color="#f59e0b"
  />

</div>

    {/* ---------- EMPTY ---------- */}

    {history.length === 0 ? (

      <div className="empty-card">

        <div className="empty-icon">

          📂

        </div>

        <h2>

          No Interview History

        </h2>

        <p>

          Complete your first AI interview to view
          reports and analytics here.

        </p>

      </div>

    ) : (

      history

        .filter((item) =>
          item.session_id
            ?.toString()
            .includes(search)
        )

        .map((item) => (
          <div
  key={item.session_id}
  className="history-card"
>

  {/* ---------- CARD HEADER ---------- */}

  <div className="card-top">

    <div className="card-left">

      <div className="interview-chip">

        {item.interview_type}

      </div>

      <h2 className="interview-title">

        {item.interview_type} Interview

      </h2>

      <p className="session-id">

        Session #{item.session_id}

      </p>

    </div>

    <div
      className="score-badge"
      style={{
        background:
          item.average_score >= 8
            ? "#22c55e"
            : item.average_score >= 6
            ? "#f59e0b"
            : "#ef4444"
      }}
    >

      ⭐ {item.average_score}/10

    </div>

  </div>

  {/* ---------- STATS ---------- */}

  <div className="history-stats-grid">

    <div className="stat-card">

      <span className="stat-label">

        Questions Answered

      </span>

      <h3>

        {item.questions_answered}

      </h3>

    </div>

    <div className="stat-card">

      <span className="stat-label">

        Performance

      </span>

      <span
        className={`performance-badge ${
          item.performance === "Excellent"
            ? "excellent"
            : item.performance === "Good"
            ? "good"
            : item.performance === "Average"
            ? "average"
            : "poor"
        }`}
      >

        {item.performance}

      </span>

    </div>

  </div>

  {/* ---------- ACTIONS ---------- */}

  <div className="history-actions">

    <button
      className="primary-btn"
      onClick={() => {

        localStorage.setItem(
          "sessionId",
          item.session_id
        );

        navigate("/report");

      }}
    >

      📄 View Report

    </button>

    <button
      className="delete-btn"
      onClick={() =>
        deleteHistory(item.session_id)
      }
    >

      🗑 Delete Interview

    </button>

  </div>

</div>

))

)}

</div>

);

}

export default History;