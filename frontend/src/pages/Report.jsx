import Loader from "../components/Loader";
import toast from "react-hot-toast";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useNavigate } from "react-router-dom";

import "./Report.css";
import { useEffect, useState } from "react";
import axios from "axios";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function Report() {
  const navigate = useNavigate();
  const handleLogout = () => {

  localStorage.removeItem("token");

  navigate("/login");

};

  const [report, setReport] =
    useState(null);
    

  const snapshot =
    localStorage.getItem(
      "snapshot"
  );
  const emotionHistory =
  JSON.parse(
    localStorage.getItem(
      "emotionHistory"
    ) || "[]"
  );
  const speakingAnalysis =
  JSON.parse(
    localStorage.getItem(
      "speakingAnalysis"
    ) || "{}"
  );

const totalWords =
  speakingAnalysis.totalWords || 0;

const totalTime =
  speakingAnalysis.totalTime || 0;

const totalAnswers =
  speakingAnalysis.totalAnswers || 0;

const averageWords =
  totalAnswers > 0
    ? Math.round(totalWords / totalAnswers)
    : 0;

const wpm =
  totalTime > 0
    ? Math.round(totalWords / (totalTime / 60))
    : 0;

let speakingRating =
  "Needs Improvement";

if (wpm >= 90 && wpm <= 140) {

  speakingRating = "Excellent";

}

else if (wpm > 140 && wpm <= 170) {

  speakingRating = "Fast";

}

else if (wpm > 170) {

  speakingRating = "Too Fast";

}

else if (wpm >= 60) {

  speakingRating = "Good";

}
  let topEmotion =
  "Unknown";
  let confidenceScore = 5;
  let hiringRecommendation =
  "Needs Improvement";

if (
  report &&
  report.average_score >= 8 &&
  confidenceScore >= 8
) {

  hiringRecommendation =
    "Highly Recommended";

} else if (
  report &&
  report.average_score >= 6
) {

  hiringRecommendation =
    "Recommended";
}

if (
  topEmotion === "happy"
) {

  confidenceScore = 9;

} else if (
  topEmotion === "neutral"
) {

  confidenceScore = 7;

} else if (
  topEmotion === "surprised"
) {

  confidenceScore = 6;

} else if (
  topEmotion === "sad"
) {

  confidenceScore = 4;

} else if (
  topEmotion === "angry"
) {

  confidenceScore = 3;
}

if (
  emotionHistory.length > 0
) {

  const count = {};

  emotionHistory.forEach(
    emotion => {

      count[emotion] =
        (count[emotion] || 0) + 1;

    }
  );

  topEmotion =
    Object.keys(count)
      .reduce((a, b) =>
        count[a] >
        count[b]
          ? a
          : b
      );
}

  useEffect(() => {

    fetchReport();

  }, []);

  const fetchReport =
    async () => {

      try {

        const sessionId =
          localStorage.getItem(
            "sessionId"
          );

        

const token = localStorage.getItem("token");

const response = await axios.get(
    `http://127.0.0.1:8000/report/${sessionId}`,
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
);

console.log(response.data.roadmap);

setReport(response.data);

      } catch (error) {

        console.log(error);

        toast.error("Failed to load report");
      }
    };

  const downloadPDF = () => {

  if (!report) return;

  const doc = new jsPDF();

  let y = 20;
  // =============================
// PAGE BREAK FUNCTION
// =============================

const checkPage = (requiredSpace = 20) => {

  if (y + requiredSpace > 270) {

    doc.addPage();

    y = 20;

  }

};

  // =============================
  // TITLE
  // =============================

  doc.setFontSize(22);
  doc.setTextColor(80, 0, 180);

  doc.text(
    "AI Interview Analyzer",
    20,
    y
  );

  y += 10;

  doc.setFontSize(16);
  doc.setTextColor(0);

  doc.text(
    "Professional Interview Report",
    20,
    y
  );

  y += 15;

  // =============================
  // INTERVIEW DETAILS
  // =============================

  // =============================
// INTERVIEW DETAILS TABLE
// =============================

autoTable(doc, {
  startY: y,

  head: [
    ["Interview Details", "Value"]
  ],

  body: [
    ["Session ID", report.session_id],
    ["Questions Answered", report.questions_answered],
    ["Average Score", report.average_score],
    ["Best Score", report.best_score],
    ["Performance", report.performance],
    ["Verdict", report.verdict]
  ],

  theme: "grid",

  headStyles: {
    fillColor: [139, 92, 246]
  }

});

y = doc.lastAutoTable.finalY + 15;

  // =============================
  // TECHNICAL ANALYSIS
  // =============================

  // =============================
// TECHNICAL ANALYSIS TABLE
// =============================

autoTable(doc, {
  startY: y,

  head: [
    ["Technical Analysis", "Score"]
  ],

  body: [
    ["Technical Score", `${report.technical_score}/10`],
    ["Communication Score", `${report.communication_score}/10`],
    ["Consistency Score", `${report.consistency_score}/10`],
    ["Performance", report.performance],
    ["Verdict", report.verdict]
  ],

  theme: "striped",

  headStyles: {
    fillColor: [34, 197, 94]
  }

});

y = doc.lastAutoTable.finalY + 15;
checkPage(40);
  // =============================
  // EMOTION
  // =============================

  doc.setFontSize(15);

  doc.text(
    "Emotion Analysis",
    20,
    y
  );

  y += 10;

  doc.setFontSize(11);

  doc.text(
    `Dominant Emotion : ${topEmotion}`,
    20,
    y
  );

  y += 8;

  doc.text(
    `Confidence Score : ${confidenceScore}/10`,
    20,
    y
  );

  y += 15;
  checkPage(80);

  // =============================
  // SUMMARY
  // =============================

  doc.setFontSize(15);

  doc.text(
    "AI Interview Summary",
    20,
    y
  );

  y += 10;

  doc.setFontSize(11);

  const summaryLines =
    doc.splitTextToSize(
      report.summary || "",
      170
    );

  doc.text(
    summaryLines,
    20,
    y
  );

  y +=
    summaryLines.length * 6 +
    10;
    checkPage(100);

  // =============================
  // SKILL GAP
  // =============================

  doc.setFontSize(15);

  doc.text(
    "Resume vs Interview Skill Gap",
    20,
    y
  );

  y += 10;

  doc.setFontSize(10);

  const skillGap =
    doc.splitTextToSize(
      report.skill_gap || "",
      170
    );

  doc.text(
    skillGap,
    20,
    y
  );

  y +=
    skillGap.length * 5 +
    15;
    checkPage(120);
    // =============================
// AI LEARNING ROADMAP
// =============================

doc.setFontSize(15);

doc.text(
  "AI Learning Roadmap",
  20,
  y
);

y += 10;

doc.setFontSize(11);

const roadmapLines =
  doc.splitTextToSize(
    report.roadmap || "",
    170
  );

doc.text(
  roadmapLines,
  20,
  y
);

y +=
  roadmapLines.length * 5 +
  15;
  checkPage(50);

  // =============================
  // HIRING
  // =============================

  doc.setFontSize(15);

  doc.text(
    "Hiring Recommendation",
    20,
    y
  );

  y += 10;

  doc.setFontSize(11);

  doc.text(
    hiringRecommendation,
    20,
    y
  );

  y += 20;
  checkPage(20);

  // =============================
  // FOOTER
  // =============================

  doc.setFontSize(10);

  doc.text(
    "Generated by AI Interview Analyzer",
    20,
    y
  );

  doc.save(
    `Interview_Report_${report.session_id}.pdf`
  );

};
let badge = "🥉 Beginner";

if (
  report &&
  report.average_score >= 8
) {

  badge = "🏆 Expert";

} else if (
  report &&
  report.average_score >= 6
) {

  badge = "🥇 Advanced";

} else if (
  report &&
  report.average_score >= 4
) {

  badge = "🥈 Intermediate";
}
const storedQuestions =
  localStorage.getItem(
    "interviewQuestions"
  );

const totalQuestions =
  storedQuestions
    ? storedQuestions
        .split("\n")
        .filter(
          q =>
            q.trim() !== "" &&
            q.includes("?")
        ).length
    : 0;

const attemptedQuestions =
  report
    ? report.questions_answered
    : 0;

const skippedQuestions = Math.max(
  0,
  Number(totalQuestions || 0) - Number(attemptedQuestions || 0)
);
  const chartData =
    report
      ? [
          {
            name: "Average",
            score:
              report.average_score
          },
          {
            name: "Best",
            score:
              report.best_score
          }
        ]
      : [];
      if (!report) {
  return <Loader />;
}

  return (

    <>
  <div className="dashboard-content">

   <div className="report-header">

    <div className="report-header-left">

        <h1 className="report-title">
            Interview Report
        </h1>

        <p className="report-subtitle">
            Analyze your interview performance, AI insights,
            strengths, weaknesses and personalized learning roadmap.
        </p>

    </div>

    <div className="report-header-right">

        <div className="meta-pill">

            📄 Session #{report.session_id}

        </div>

        <div className="meta-pill">

            📅 {new Date().toLocaleDateString(
                "en-GB",
                {
                    day:"2-digit",
                    month:"long",
                    year:"numeric"
                }
            )}

        </div>

    </div>

</div>

        {report && (
          <>

            {/* ===========================
                 TOP STAT CARDS
            =========================== */}

            <div className="stats-grid">

     <div className="stat-card">

    <div className="stat-icon">🎯</div>

    <div className="stat-value">
        {report.average_score}/10
    </div>

    <div className="stat-label">
        Overall Score
    </div>

</div>

<div className="stat-card">

    <div className="stat-icon">📈</div>

    <div className="stat-value">
        {report.performance}
    </div>

    <div className="stat-label">
        Performance
    </div>

</div>

<div className="stat-card">

    <div className="stat-icon">✅</div>

    <div className="stat-value">
        {report.questions_answered}
    </div>

    <div className="stat-label">
        Answers
    </div>

</div>

<div className="stat-card">

    <div className="stat-icon">😊</div>

    <div className="stat-value">
        {confidenceScore}/10
    </div>

    <div className="stat-label">
        Confidence
    </div>

</div>

<div className="stat-card">

    <div className="stat-icon">🏆</div>

    <div className="stat-value">
        {badge}
    </div>

    <div className="stat-label">
        Badge
    </div>

</div>

            </div>

             {/* ===========================
                 HIRING RECOMMENDATION
            =========================== */}

            <div
    className={`hiring-hero ${
        hiringRecommendation === "Highly Recommended"
            ? "highly-recommended"
            : hiringRecommendation === "Recommended"
            ? "recommended"
            : "needs-improvement"
    }`}
>

    <div className="hero-top">

        <div>

            <span className="hero-label">
                Hiring Recommendation
            </span>

            <h2 className="hero-title">

                {hiringRecommendation === "Highly Recommended"
                    ? "✅ Highly Recommended"
                    : hiringRecommendation === "Recommended"
                    ? "👍 Recommended"
                    : "⚠️ Needs Improvement"}

            </h2>

            <p className="hero-description">

                {hiringRecommendation === "Highly Recommended"
                    ? "Excellent interview performance. You are ready for most technical interviews."
                    : hiringRecommendation === "Recommended"
                    ? "Good performance with a few improvement areas before appearing in interviews."
                    : "Practice mock interviews regularly and improve communication, technical depth and confidence."}

            </p>

        </div>

    </div>

    <div className="hero-divider"></div>

    <div className="hero-stats">

        <div>

            <span>Overall Score</span>

            <h3>{report.average_score}/10</h3>

        </div>

        <div>

            <span>Confidence</span>

            <h3>{confidenceScore}/10</h3>

        </div>

        <div>

            <span>Performance</span>

            <h3>{report.performance}</h3>

        </div>

    </div>

</div>

            {/* ===========================
                 OVERALL ANALYSIS
            =========================== */}

            <div className="card analysis-card">

    <h2>📊 Overall Interview Analysis</h2>

    <div className="analysis-grid">

        <div className="analysis-item">

            <div className="analysis-icon">
                💻
            </div>

            <div className="analysis-name">
                Technical
            </div>

            <div className="analysis-score">
                {report.technical_score}/10
            </div>

        </div>

        <div className="analysis-item">

            <div className="analysis-icon">
                💬
            </div>

            <div className="analysis-name">
                Communication
            </div>

            <div className="analysis-score">
                {report.communication_score}/10
            </div>

        </div>

        <div className="analysis-item">

            <div className="analysis-icon">
                📈
            </div>

            <div className="analysis-name">
                Consistency
            </div>

            <div className="analysis-score">
                {report.consistency_score}/10
            </div>

        </div>

    </div>

    <div className="verdict-wrapper">

        <span className="verdict-label">

            Final Verdict

        </span>

        <div className="verdict-pill">

            {report.verdict}

        </div>

    </div>

</div>
    
       {/* ===========================
     AI INTERVIEW SUMMARY
=========================== */}

<div
  className="card"
  style={{ marginTop: "25px" }}
>

  <h2>AI Interview Summary</h2>

  <div className="summary-box">

  {(report.summary || "")
    .split("\n")
    .filter(line => line.trim() !== "")
    .map((line, index) => {

      const text = line.trim();

      if (
        text.endsWith(":") ||
        text.includes("Overall Score") ||
        text.includes("Performance") ||
        text.includes("Strengths") ||
        text.includes("Areas For Improvement") ||
        text.includes("Recommended Roles") ||
        text.includes("Note")
      ) {
        return (
          <h4
            key={index}
            className="summary-heading"
          >
            {text}
          </h4>
        );
      }

      if (text.startsWith("-")) {
        return (
          <div
            key={index}
            className="summary-point"
          >
            ✅ {text.substring(1)}
          </div>
        );
      }

      return (
        <p
          key={index}
          className="summary-text"
        >
          {text}
        </p>
      );
    })}

</div>

</div>   
            
            {/* ===========================
     RESUME vs INTERVIEW SKILL GAP
=========================== */}

<div
  className="card"
  style={{ marginTop: "25px" }}
>

  <h2>🧠 Resume vs Interview Skill Gap</h2>

<div className="summary-box">

  {(report.skill_gap || "")
    .split("\n")
    .filter(line => line.trim() !== "")
    .map((line, index) => {

      const text = line.trim();

      if (
        text.includes("Resume Skills") ||
        text.includes("Interview Demonstrated") ||
        text.includes("Need More Practice") ||
        text.includes("Learning Roadmap")
      ) {
        return (
          <h4
            key={index}
            className="summary-heading"
          >
            {text}
          </h4>
        );
      }

      if (
        text.startsWith("•") ||
        text.startsWith("-")
      ) {
        return (
          <div
            key={index}
            className="summary-point"
          >
            🚀 {text.substring(1)}
          </div>
        );
      }

      return (
        <p
          key={index}
          className="summary-text"
        >
          {text}
        </p>
      );

    })}

</div>

</div>         

                {/* ===========================
     AI LEARNING ROADMAP
=========================== */}

<div
  className="card"
  style={{ marginTop: "25px" }}
>
  <h2>📚 AI Learning Roadmap</h2>

  <div className="summary-box">

    {(() => {

      const weeks = (report.roadmap || "")
        .replace("30-Day Personalized Learning Roadmap", "")
        .split(/Week\s+\d+/)
        .map(week => week.trim())
        .filter(Boolean);

      return weeks.map((week, index) => {

        const tasks = week
          .split("•")
          .map(task => task.trim())
          .filter(task => task);

        return (
          <div
            key={index}
            className="roadmap-week"
          >

            <h4 className="summary-heading">
              📅 Week {index + 1}
            </h4>

            {tasks.map((task, i) => (
              <div
                key={i}
                className="summary-point"
              >
                🚀 {task}
              </div>
            ))}

          </div>
        );

      });

    })()}

  </div>

</div>
            {/* ===========================
                 PERFORMANCE GRAPH
            =========================== */}
            {/*
            <div
              className="card"
              style={{ marginTop: "25px" }}
            >

              <h2>Performance Graph</h2>

              <ResponsiveContainer
                width="100%"
                height={300}
              >

                <LineChart data={chartData}>

                  <CartesianGrid
                    strokeDasharray="3 3"
                  />

                  <XAxis dataKey="name" />

                  <YAxis />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#8b5cf6"
                    strokeWidth={4}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div> */}
                        {/* ===========================
                 CANDIDATE SNAPSHOT
            =========================== */}

            {snapshot && (

  <div
    className="card"
    style={{ marginTop: "25px" }}
  >

    <h2>📷 Candidate Snapshot</h2>

    <div className="snapshot-wrapper">

  <div className="snapshot-left">

    <img
      src={snapshot}
      alt="Snapshot"
      className="snapshot-image"
    />

  </div>

  <div className="snapshot-right">

    <div className="snapshot-stat">

      <span className="snapshot-label">
        😊 Emotion
      </span>

      <h3>{topEmotion}</h3>

    </div>

    <div className="snapshot-stat">

      <span className="snapshot-label">
        ⭐ Confidence
      </span>

      <h3>{confidenceScore}/10</h3>

    </div>

    <div className="snapshot-stat">

      <span className="snapshot-label">
        🎯 Presence
      </span>

      <h3>
        {confidenceScore >= 8
          ? "Excellent"
          : confidenceScore >= 6
          ? "Good"
          : "Needs Improvement"}
      </h3>

    </div>

  </div>

</div>

  </div>

)}

         <div className="card" style={{ marginTop: "25px" }}>

    <h2>📈 Performance Insights</h2>

    <div className="insights-grid">

        <div className="insight-card">
            <span>😊 Emotion</span>
            <h3>{topEmotion}</h3>
        </div>

        <div className="insight-card">
            <span>⭐ Confidence</span>
            <h3>{confidenceScore}/10</h3>
        </div>

        <div className="insight-card">
            <span>🎤 Speaking Speed</span>
            <h3>{wpm} WPM</h3>
        </div>

        <div className="insight-card">
            <span>📝 Avg Words</span>
            <h3>{averageWords}</h3>
        </div>

        <div className="insight-card">
            <span>🚀 Rating</span>
            <h3>{speakingRating}</h3>
        </div>

    </div>

</div>

            {/* ===========================
                 INTERVIEW ANALYTICS
            =========================== */}

          <div className="card" style={{ marginTop: "25px" }}>

    <h2>📊 Interview Analytics</h2>

    <div className="analytics-grid">

        <div className="analytics-item">
            <h1>{totalQuestions}</h1>
            <span>Total Questions</span>
        </div>

        <div className="analytics-item">
            <h1>{attemptedQuestions}</h1>
            <span>Attempted</span>
        </div>

        <div className="analytics-item">
            <h1>{skippedQuestions}</h1>
            <span>Skipped</span>
        </div>

    </div>

</div>

           
               
{/* ===========================
                 readiness
            =========================== */}



{report.career_readiness && (

<div
  className="card"
  style={{ marginTop: "25px" }}
>

  <h2>🎯 Smart Career Readiness</h2>

  <div className="career-top">

    <div className="career-stat">

      <span>Readiness Score</span>

      <h2>
        {report.career_readiness.readiness_score}/100
      </h2>

    </div>

    <div className="career-stat">

      <span>Career Level</span>

      <h2>
        {report.career_readiness.career_level}
      </h2>

    </div>

    <div className="career-stat">

      <span>Selection Chance</span>

      <h2>
        {report.career_readiness.selection_probability}
      </h2>

    </div>

  </div>

  <div className="career-grid">

    <div className="career-box">

      <h3>💪 Strengths</h3>

      <ul>

        {report.career_readiness.strengths.map(
          (item, index) => (
            <li key={index}>
              ✅ {item}
            </li>
          )
        )}

      </ul>

    </div>

    <div className="career-box">

      <h3>⚠ Improvement Areas</h3>

      <ul>

        {report.career_readiness.weaknesses.map(
          (item, index) => (
            <li key={index}>
              🚀 {item}
            </li>
          )
        )}

      </ul>

    </div>

  </div>

  <div className="career-focus">

    <span>🎯 Next Focus</span>

    <h3>
      {report.career_readiness.next_focus}
    </h3>

  </div>

</div>

)}

            {/* ===========================
                 DOWNLOAD BUTTON
            =========================== */}

            <div
              style={{
                textAlign: "center",
                marginTop: "25px",
                marginBottom: "40px"
              }}
            >

              <button
  className="download-report-btn"
  onClick={downloadPDF}
>
  📄 Download Professional Report
</button>

            </div>

          </>

        )}

      </div>

    

  </>

);

}

export default Report;