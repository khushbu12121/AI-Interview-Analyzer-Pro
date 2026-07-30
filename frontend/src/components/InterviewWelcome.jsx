import "./InterviewWelcome.css";

function InterviewWelcome({
  questions,
  startAIInterview
}) {

  return (

    <div className="welcome-container">

      <div className="welcome-card">

        <div className="welcome-icon">
          🎤
        </div>

        <h1 className="welcome-title">

          AI Interview Session

        </h1>

        <p className="welcome-subtitle">

          Welcome! Your AI interview is ready to begin.

        </p>

        <div className="session-grid">

          <div className="session-item">

            <span className="session-icon">
              📄
            </span>

            <div>

              <h4>Resume</h4>

              <p>Uploaded</p>

            </div>

          </div>

          <div className="session-item">

            <span className="session-icon">
              💼
            </span>

            <div>

              <h4>Interview</h4>

              <p>Technical</p>

            </div>

          </div>

          <div className="session-item">

            <span className="session-icon">
              ❓
            </span>

            <div>

              <h4>Questions</h4>

              <p>{questions.length}</p>

            </div>

          </div>

          <div className="session-item">

            <span className="session-icon">
              ⏱
            </span>

            <div>

              <h4>Duration</h4>

              <p>{questions.length} Minutes</p>

            </div>

          </div>

        </div>

        <div className="instruction-card">

          <h3>

            📋 Before You Start

          </h3>

          <ul>

            <li>✅ Keep your camera ON.</li>

            <li>✅ Keep your microphone ON.</li>

            <li>✅ Sit in a quiet environment.</li>

            <li>✅ Speak naturally and confidently.</li>

            <li>✅ You cannot revisit previous questions.</li>

          </ul>

        </div>

        <button
          className="welcome-btn"
          onClick={startAIInterview}
        >

          🚀 Start AI Interview

        </button>

      </div>

    </div>

  );

}

export default InterviewWelcome;