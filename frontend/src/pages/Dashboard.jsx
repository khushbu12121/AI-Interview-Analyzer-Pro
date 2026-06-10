import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [file, setFile] = useState(null);

  const [analysis, setAnalysis] =
    useState("");

  const [questions, setQuestions] =
    useState("");

  const [stats, setStats] =
    useState(null);
  const [interviewType, setInterviewType] =
    useState("Technical");

  useEffect(() => {

    fetchStats();

  }, []);

  const fetchStats = async () => {

  try {

    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await axios.get(
        "http://127.0.0.1:8000/dashboard-stats",
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    setStats(
      response.data
    );

  } catch (error) {

    console.log(error);
  }
};

  const handleLogout = () => {

    localStorage.removeItem("token");

    alert(
      "Logged Out Successfully"
    );

    navigate("/login");
  };

  const handleUpload = async () => {

    if (!file) {

      alert(
        "Please select a resume"
      );

      return;
    }

    const formData =
  new FormData();

formData.append(
  "file",
  file
);

formData.append(
  "interview_type",
  interviewType
);

    try {

      const response =
        await axios.post(
          "http://127.0.0.1:8000/upload-resume",
          formData,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
              "Content-Type":
                "multipart/form-data"
            }
          }
        );
        console.log(
  "UPLOAD RESPONSE =",
  response.data
);

      setAnalysis(
        response.data.analysis
      );

      setQuestions(
        response.data.questions
      );

      localStorage.setItem(
        "interviewQuestions",
        response.data.questions
      );

      alert(
        "Resume Uploaded Successfully"
      );

    } catch (error) {

      console.log(error);

      alert(
        "Resume Upload Failed"
      );
    }
  };

  return (

    <div className="page-container">

      <h1
        style={{
          textAlign: "center"
        }}
      >
        Dashboard
      </h1>

      <p
        style={{
          textAlign: "center",
          color: "#94a3b8",
          marginBottom: "30px"
        }}
      >
        Welcome to AI Interview Analyzer
      </p>

      {stats && (

        <div
          className="stats-grid"
        >

          <div className="stat-card">
            <h3>Total Interviews</h3>
            <h1>
              {stats.total_interviews}
            </h1>
          </div>

          <div className="stat-card">
            <h3>Total Answers</h3>
            <h1>
              {stats.total_answers}
            </h1>
          </div>

          <div className="stat-card">
            <h3>Average Score</h3>
            <h1>
              {stats.average_score}
            </h1>
          </div>

          <div className="stat-card">
            <h3>Best Score</h3>
            <h1>
              {stats.best_score}
            </h1>
          </div>

        </div>

      )}

      <div className="card">

        <h2>
          Authentication Status
        </h2>

        {
          token ? (
            <p>
              ✅ User Logged In
            </p>
          ) : (
            <p>
              ❌ User Not Logged In
            </p>
          )
        }

      </div>

      <div className="card">

  <h2>
    Upload Resume
  </h2>

  <label>
    Interview Type
  </label>

  <br />

  <select
    value={interviewType}
    onChange={(e) =>
      setInterviewType(
        e.target.value
      )
    }
    style={{
      padding: "10px",
      marginTop: "10px",
      marginBottom: "15px"
    }}
  >
    <option value="Technical">
      Technical
    </option>

    <option value="HR">
      HR
    </option>

    <option value="Mixed">
      Mixed
    </option>

  </select>

  <br />

  <input
    type="file"
    accept=".pdf"
    onChange={(e) =>
      setFile(
        e.target.files[0]
      )
    }
  />

  <br />
  <br />

  <button
    className="primary-btn"
    onClick={handleUpload}
  >
    Upload Resume
  </button>

</div>

      {analysis && (

        <div className="card">

          <h2>
            AI Resume Analysis
          </h2>

          <div
            style={{
              whiteSpace:
                "pre-wrap"
            }}
          >
            {analysis}
          </div>

        </div>

      )}

      {questions && (

        <div className="card">

          <h2>
            Generated Interview Questions
          </h2>

          <div
            style={{
              whiteSpace:
                "pre-wrap"
            }}
          >
            {questions}
          </div>

        </div>

      )}

      <div
        className="card"
        style={{
          textAlign: "center"
        }}
      >

        <h2>
          Quick Actions
        </h2>

        <div
          style={{
            display: "flex",
            gap: "15px",
            justifyContent:
              "center",
            flexWrap: "wrap"
          }}
        >

          <button
            className="primary-btn"
            onClick={() =>
              navigate("/interview")
            }
          >
            Start Mock Interview
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
            className="primary-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;