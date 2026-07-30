import { useNavigate } from "react-router-dom";
import "./Interview.css";

function Interview() {

    const navigate = useNavigate();

    return (

        <div className="page-container">

            {/* ===========================
                    HEADER
            =========================== */}

            <div className="interview-header">

                <div>

                    <h1 className="interview-title">
                        AI Interview
                    </h1>

                    <p className="interview-subtitle">
                        Practice realistic AI interviews with instant evaluation,
                        confidence analysis and detailed performance reports.
                    </p>

                </div>

                <div className="interview-badge">

                    🤖 AI Powered

                </div>

            </div>

            {/* ===========================
                    HERO CARD
            =========================== */}

            <div className="hero-interview-card">

                <div className="hero-icon">
                    🎤
                </div>

                <h2>
                    Voice + Camera Interview
                </h2>

                <p>
                    Experience a real interview where AI listens to your
                    answers, analyzes your confidence, detects facial
                    expressions and generates a complete interview report.
                </p>

                <div className="feature-list">

                    <div>✅ Voice Recognition</div>

                    <div>✅ Camera Emotion Analysis</div>

                    <div>✅ AI Evaluation</div>

                    <div>✅ Instant AI Report</div>

                </div>

                <button
                    className="primary-btn"
                    onClick={() => navigate("/voice-camera")}
                >
                    🚀 Start AI Interview
                </button>

            </div>

            {/* ===========================
                    STATS
            =========================== */}

            <div className="interview-stats">

                <div className="mini-card">

                    <h3>10</h3>

                    <span>Questions</span>

                </div>

                <div className="mini-card">

                    <h3>10 Min</h3>

                    <span>Duration</span>

                </div>

                <div className="mini-card">

                    <h3>AI</h3>

                    <span>Evaluation</span>

                </div>

                <div className="mini-card">

                    <h3>📄</h3>

                    <span>Detailed Report</span>

                </div>

            </div>

            {/* ===========================
                    TIPS
            =========================== */}

            <div className="tips-card">

                <h3>
                    💡 Before You Start
                </h3>

                <ul>

                    <li>Choose a quiet environment.</li>

                    <li>Keep your camera turned ON.</li>

                    <li>Speak naturally and confidently.</li>

                    <li>Use a stable internet connection.</li>

                    <li>Avoid switching tabs during interview.</li>

                </ul>

            </div>

        </div>

    );

}

export default Interview;