import "./ResumeResult.css";

function ResumeResult() {
  return (
    <div className="resume-result-page">

      <div className="resume-header">
        <h1>Resume Analysis Report</h1>
        <p>
          AI-powered ATS analysis and resume feedback
        </p>
      </div>

      <div className="resume-content">

        {/* ATS Score */}
        <div className="glass-card">
          <h2>ATS Score</h2>

          <div className="score-circle">
            <span>86%</span>
          </div>

          <p>Excellent Match</p>
        </div>

        {/* Skills */}
        <div className="glass-card">
          <h2>Skills Found</h2>

          <div className="badge-container">

            <span className="skill-badge">
              React
            </span>

            <span className="skill-badge">
              Python
            </span>

            <span className="skill-badge">
              FastAPI
            </span>

            <span className="skill-badge">
              PostgreSQL
            </span>

            <span className="skill-badge">
              Machine Learning
            </span>

          </div>
        </div>

        {/* Missing */}
        <div className="glass-card">
          <h2>Missing Keywords</h2>

          <div className="badge-container">

            <span className="missing-badge">
              Docker
            </span>

            <span className="missing-badge">
              AWS
            </span>

            <span className="missing-badge">
              Redis
            </span>

            <span className="missing-badge">
              CI/CD
            </span>

          </div>
        </div>

      </div>

    </div>
  );
}

export default ResumeResult;