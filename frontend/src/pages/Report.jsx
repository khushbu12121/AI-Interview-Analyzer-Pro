import { useEffect, useState } from "react";
import axios from "axios";

import jsPDF from "jspdf";

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

        const response =
          await axios.get(
            `http://127.0.0.1:8000/report/${sessionId}`
          );

        setReport(
          response.data
        );

      } catch (error) {

        console.log(error);

        alert(
          "Failed to load report"
        );
      }
    };

  const downloadPDF = () => {

    if (!report) return;

    const doc =
      new jsPDF();

    let y = 20;

    doc.setFontSize(22);

    doc.text(
      "AI Interview Report",
      20,
      y
    );
    y += 10;

doc.text(
  `Technical Score: ${report.technical_score}`,
  20,
  y
);

y += 10;

doc.text(
  `Communication Score: ${report.communication_score}`,
  20,
  y
);

y += 10;

doc.text(
  `Consistency Score: ${report.consistency_score}`,
  20,
  y
);

y += 10;

doc.text(
  `Verdict: ${report.verdict}`,
  20,
  y
);

    y += 20;

    doc.setFontSize(14);

    doc.text(
      `Session ID: ${report.session_id}`,
      20,
      y
    );

    y += 10;

    doc.text(
      `Questions Answered: ${report.questions_answered}`,
      20,
      y
    );

    y += 10;

    doc.text(
      `Average Score: ${report.average_score}`,
      20,
      y
    );

    y += 10;

    doc.text(
      `Best Score: ${report.best_score}`,
      20,
      y
    );

    y += 10;

    doc.text(
      `Performance: ${report.performance}`,
      20,
      y
    );

    y += 20;

    doc.setFontSize(18);

    doc.text(
      "Interview Summary",
      20,
      y
    );

    y += 15;

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

const skippedQuestions =
  totalQuestions -
  attemptedQuestions;
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

  return (

    <div className="page-container">

      <h1
        style={{
          textAlign:
            "center",
          marginBottom:
            "30px"
        }}
      >
        Interview Report
      </h1>

      {report && (

        <>

          <div
            className="stats-grid"
          >

            <div
              className="stat-card"
            >
              <h3>Session</h3>

              <h1>
                {
                  report.session_id
                }
              </h1>
            </div>

            <div
              className="stat-card"
            >
              <h3>Answers</h3>

              <h1>
                {
                  report.questions_answered
                }
              </h1>
            </div>

            <div
              className="stat-card"
            >
              <h3>Average</h3>

              <h1>
                {
                  report.average_score
                }
              </h1>
            </div>

            <div
              className="stat-card"
            >
              <h3>Performance</h3>

              <h2>
                {
                  report.performance
                }
              </h2>
            </div>
            <div
  className="stat-card"
>
  <h3>Badge</h3>

  <h2>
    {badge}
  </h2>
</div>

          </div>
        <div
  className="card"
  style={{
    marginTop: "25px"
  }}
>

  <h2>
    Overall Interview Analysis
  </h2>

  <p>
    <b>Technical Score:</b>
    {" "}
    {report.technical_score}/10
  </p>

  <p>
    <b>Communication Score:</b>
    {" "}
    {report.communication_score}/10
  </p>

  <p>
    <b>Consistency Score:</b>
    {" "}
    {report.consistency_score}/10
  </p>

  <p>
    <b>Verdict:</b>
    {" "}
    {report.verdict}
  </p>

</div>
          <div
            className="card"
          >

            <h2>
              Performance Graph
            </h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <LineChart
                data={
                  chartData
                }
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="name"
                />

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

          </div>

          <div
            className="card"
            style={{
              marginTop:
                "25px"
            }}
          >
            {snapshot && (

  <div
    className="card"
    style={{
      marginTop: "25px"
    }}
  >

    <h2>
      Candidate Snapshot
    </h2>

    <img
      src={snapshot}
      alt="Snapshot"
      style={{
        width: "320px",
        borderRadius: "12px",
        border:
          "3px solid #8b5cf6"
      }}
    />

  </div>

)}
<div
  className="card"
  style={{
    marginTop: "20px"
  }}
>

  <h2>
    Emotion Analysis
  </h2>

  <p>
    Most Common Emotion:
    {" "}
    <b>
      {topEmotion}
    </b>
  </p>
  <p>
  Confidence Score:
  {" "}
  <b>
    {confidenceScore}/10
  </b>
</p>
<p>
  Interview Presence:
  {" "}

  <b>

    {confidenceScore >= 8
      ? "Excellent"

      : confidenceScore >= 6
      ? "Good"

      : "Needs Improvement"}

  </b>
</p>

</div>
<div
  className="card"
  style={{
    marginTop: "20px"
  }}
>

  <h2>
    Interview Analytics
  </h2>

  <p>
    <b>
      Total Questions:
    </b>
    {" "}
    {totalQuestions}
  </p>

  <p>
    <b>
      Attempted:
    </b>
    {" "}
    {attemptedQuestions}
  </p>

  <p>
    <b>
      Skipped:
    </b>
    {" "}
    {skippedQuestions}
  </p>

</div>
<div
  className="card"
  style={{
    marginTop: "20px"
  }}
>

  <h2>
    Hiring Recommendation
  </h2>

  <h1>

    {hiringRecommendation ===
    "Highly Recommended"

      ? "✅ Highly Recommended"

      : hiringRecommendation ===
        "Recommended"

      ? "👍 Recommended"

      : "⚠️ Needs Improvement"}

  </h1>

</div> 
            <h2>
              AI Interview Summary
            </h2>

            <div
              style={{
                whiteSpace:
                  "pre-wrap",
                lineHeight:
                  "1.8"
              }}
            >
              {
                report.summary
              }
            </div>

          </div>

          <div
            style={{
              textAlign:
                "center",
              marginTop:
                "25px"
            }}
          >

            <button
              className="primary-btn"
              onClick={
                downloadPDF
              }
            >
              Download PDF Report
            </button>

          </div>

        </>
      )}

    </div>
  );
}

export default Report;