import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  return (

    <div className="page-container">

      <div
        className="card"
        style={{
          textAlign: "center",
          padding: "60px 30px"
        }}
      >

        <h1
          style={{
            fontSize: "52px",
            marginBottom: "20px"
          }}
        >
          AI Interview Analyzer
        </h1>

        <p
          style={{
            fontSize: "20px",
            color: "#cbd5e1",
            maxWidth: "800px",
            margin: "0 auto"
          }}
        >
          Upload your resume, generate AI-powered interview questions,
          practice mock interviews, receive detailed feedback,
          and track your interview performance with smart analytics.
        </p>

        <div
          style={{
            marginTop: "40px",
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            flexWrap: "wrap"
          }}
        >

          <button
            className="primary-btn"
            onClick={() =>
              navigate("/dashboard")
            }
          >
            Get Started
          </button>

          <button
            className="primary-btn"
            onClick={() =>
              navigate("/interview")
            }
          >
            Start Interview
          </button>

        </div>

      </div>

      <div
        className="stats-grid"
        style={{
          marginTop: "40px"
        }}
      >

        <div className="stat-card">
          <h3>📄 Upload Resume</h3>
          <p>
            Analyze your resume using AI.
          </p>
        </div>

        <div className="stat-card">
          <h3>🤖 AI Questions</h3>
          <p>
            Generate personalized interview questions.
          </p>
        </div>

        <div className="stat-card">
          <h3>🎤 Mock Interview</h3>
          <p>
            Practice real interview scenarios.
          </p>
        </div>

        <div className="stat-card">
          <h3>📊 Performance Report</h3>
          <p>
            Get scores, feedback and improvement tips.
          </p>
        </div>

      </div>

      <div
        className="card"
        style={{
          marginTop: "40px"
        }}
      >

        <h2
          style={{
            textAlign: "center",
            marginBottom: "30px"
          }}
        >
          How It Works
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px"
          }}
        >

          <div className="stat-card">
            <h3>1️⃣ Upload Resume</h3>
          </div>

          <div className="stat-card">
            <h3>2️⃣ Generate Questions</h3>
          </div>

          <div className="stat-card">
            <h3>3️⃣ Take Interview</h3>
          </div>

          <div className="stat-card">
            <h3>4️⃣ View Reports</h3>
          </div>

        </div>

      </div>

    </div>

  );
}

export default Home;