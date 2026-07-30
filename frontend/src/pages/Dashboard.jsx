import PerformanceChart from "../components/PerformanceChart";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api";

import StatCard from "../components/StatCard";
import QuickActionCard from "../components/QuickActionCard";

import {
  FaMicrophone,
  FaHistory,
  FaChartBar,
  FaRobot,
  FaClipboardList,
  FaStar,
  FaFileUpload,
  FaSignOutAlt
} from "react-icons/fa";

function Dashboard() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [file, setFile] = useState(null);

  const [analysis, setAnalysis] = useState("");

  const [questions, setQuestions] = useState("");

  const [stats, setStats] = useState(null);
  const [history, setHistory] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [interviewType, setInterviewType] =
    useState("Technical");

  useEffect(() => {

  fetchStats();

  fetchHistory();

}, []);

  const fetchStats = async () => {

    try {

     const response = await api.get(
    "/dashboard-stats"
);

      setStats(response.data);

    }

    catch (error) {

      console.log(error);

    }

  };
  

// 👇 YAHAN SE NAYA FUNCTION START HOGA

const fetchHistory = async () => {

  try {

    const response = await api.get(
    "/dashboard"
);

    const chartData = response.data.map((item, index) => ({
  interview: `I${index + 1}`,
  score: item.score
}));

console.log("History API Response:", response.data);
console.log("Chart Data:", chartData);

setHistory(response.data);
setChartData(chartData);

  } catch (error) {

    console.log(error);

  }

};

  const handleLogout = () => {

    localStorage.removeItem("token");

    alert("Logged Out Successfully");

    navigate("/login");

  };

  const handleUpload = async () => {

    if (!file) {

      alert("Please Select Resume");

      return;

    }

    const formData = new FormData();

    formData.append("file", file);

    formData.append(
      "interview_type",
      interviewType
    );

    try {

      const response = await api.post(
    "/upload-resume",
    formData,
    {
        headers:{
            "Content-Type":"multipart/form-data"
        }
    }
);;

      setAnalysis(
        response.data.analysis
      );

      setQuestions(
        response.data.questions
      );
      console.log(
response.data.questions
);

      localStorage.setItem(
  "interviewQuestions",
  Array.isArray(response.data.questions)
    ? response.data.questions.join("\n")
    : response.data.questions
);
      localStorage.setItem(
    "sessionId",
    response.data.session_id
);
      const questionList = Array.isArray(response.data.questions)
  ? response.data.questions
  : response.data.questions.split("\n");

localStorage.setItem(
  "totalQuestions",
  questionList.length
);

      alert(
        "Resume Uploaded Successfully"
      );

    }

    catch (error) {

      console.log(error);

      alert(
        "Resume Upload Failed"
      );

    }

  };
  const getInsight = () => {

  if (!stats) {
    return "";
  }

  if (stats.career_readiness >= 90) {

    return "🚀 Outstanding! You are highly prepared for technical interviews.";

  }

  if (stats.career_readiness >= 75) {

    return "💪 Great progress! Focus on polishing your weak topics to reach the next level.";

  }

  if (stats.career_readiness >= 60) {

    return "📚 Good foundation. More mock interviews and practice will boost your confidence.";

  }

  return "🎯 Keep practicing consistently. Every interview will improve your career readiness.";
};

  return (

    <>
<div className="dashboard-page">
          {stats && (

            <div className="stats-grid">

              <StatCard
                icon={<FaMicrophone />}
                title="Total Interviews"
                value={stats.total_interviews}
                color="#6366f1"
              />

              <StatCard
                icon={<FaClipboardList />}
                title="Answers"
                value={stats.total_answers}
                color="#06b6d4"
              />

              <StatCard
                icon={<FaChartBar />}
                title="Average Score"
                value={stats.average_score}
                color="#10b981"
              />

              <StatCard
                icon={<FaStar />}
                title="Best Score"
                value={stats.best_score}
                color="#f59e0b"
              />
              <StatCard
  icon={<FaRobot />}
  title="Career Ready"
  value={`${stats.career_readiness}%`}
  color="#8b5cf6"
/>

<StatCard
  icon={<FaStar />}
  title="Level"
  value={stats.level}
  color="#ec4899"
/>

            </div>

          )}
          {stats && (
  <div className="dashboard-card">

    <h2>🧠 AI Insight</h2>

    <div className="analysis-box">

      {getInsight()}

    </div>

  </div>
)}

          <div className="dashboard-grid">

            <div className="dashboard-card">

              <h2>

                <FaFileUpload />

                Resume Upload

              </h2>

              <p>

                Upload your resume to receive AI-powered resume analysis and personalized interview experience.

              </p>

              <label>

                Interview Type

              </label>

              <select

                value={interviewType}

                onChange={(e)=>
                  setInterviewType(
                    e.target.value
                  )
                }

                className="upload-select"

              >

                <option>

                  Technical

                </option>

                <option>

                  HR

                </option>

                <option>

                  Mixed

                </option>

              </select>

              <div className="upload-area">

  <label
    htmlFor="resumeUpload"
    className="upload-box"
  >

    <div className="upload-icon">
      📄
    </div>

    <h3>
      Upload Your Resume
    </h3>

    <p>
      Drag & Drop or Click to Browse
    </p>

    <span>
      PDF files only
    </span>

    {
      file &&
      (
        <div className="selected-file">
          ✅ {file.name}
        </div>
      )
    }

  </label>

  <input
    id="resumeUpload"
    type="file"
    accept=".pdf"
    className="hidden-input"
    onChange={(e) =>
      setFile(e.target.files[0])
    }
  />

</div>

<button
  className="primary-btn"
  onClick={handleUpload}
>
  Analyze Resume
</button>

            </div>

            <div className="dashboard-card">

              <h2>

                Authentication

              </h2>

              {

                token ?

                (

                  <div className="status success">

                    ✅ Logged In

                  </div>

                )

                :

                (

                  <div className="status danger">

                    ❌ Not Logged In

                  </div>

                )

              }

              <div className="quick-buttons">

                <QuickActionCard

                  icon={<FaMicrophone />}

                  title="Interview"

                  onClick={()=>
                    navigate("/interview")
                  }

                />

                <QuickActionCard

                  icon={<FaChartBar />}

                  title="Reports"

                  onClick={()=>
                    navigate("/report")
                  }

                />
                                <QuickActionCard

                  icon={<FaHistory />}

                  title="History"

                  onClick={() =>
                    navigate("/history")
                  }

                />

                <QuickActionCard

                  icon={<FaRobot />}

                  title="AI Summary"

                  onClick={() =>
                    navigate("/summary")
                  }

                />

              </div>

            </div>

          </div>

          {

            analysis && (

              <div className="dashboard-card">

                <h2>

                  🤖 AI Resume Analysis

                </h2>

                <div className="analysis-box">

                  {analysis}

                </div>

              </div>

            )

          }

          

          <div className="dashboard-card">

            <h2>

              🚀 Quick Actions

            </h2>

            <div className="action-grid">

              <button

                className="primary-btn"

                onClick={() =>
                  navigate("/interview")
                }

              >

                Start AI Interview

              </button>

              <button

                className="primary-btn"

                onClick={() =>
                  navigate("/report")
                }

              >

                View Report

              </button>

              <button

                className="primary-btn"

                onClick={() =>
                  navigate("/history")
                }

              >

                Interview History

              </button>

              <button

                className="primary-btn"

                onClick={() =>
                  navigate("/summary")
                }

              >

                AI Summary

              </button>

              <button

                className="logout-button"

                onClick={handleLogout}

              >

                <FaSignOutAlt />

                Logout

              </button>

            </div>

          </div>

<PerformanceChart data={chartData} />
<div className="dashboard-card">
  <div className="recent-header">
    <h2>🕒 Recent Interviews</h2>

    <button
      className="view-all-btn"
      onClick={() => navigate("/history")}
    >
      View All →
    </button>
  </div>

  {history.length === 0 ? (
    <p>No interviews found.</p>
  ) : (
    history.slice(0, 5).map((item) => (
      <div className="recent-item" key={item.id}>
        <div>
          <h4>{item.interview_type}</h4>
          <p>{item.created_at}</p>
        </div>

        <div className="recent-score">
          ⭐ {item.score}/10
        </div>
      </div>
    ))
  )}
</div>

<div className="dashboard-card future-card">

            <h2>

              🎯 AI Interview Analyzer

            </h2>

            <div className="future-grid">

              <div>

                <h3>

                  Resume Uploaded

                </h3>

                <p>

                 Upload your latest resume for AI-powered resume analysis and personalized interview experience.

                </p>

              </div>

              <div>

                <h3>

                  Practice Interviews

                </h3>

                <p>

                  Improve confidence with
                  unlimited mock interviews.

                </p>

              </div>

              <div>

                <h3>

                  AI Reports

                </h3>

                <p>

                  Get detailed feedback,
                  strengths, weaknesses
                  and performance analysis.

                </p>

              </div>

            </div>

          </div>

        </div>

      

    </>

  );

}

export default Dashboard;