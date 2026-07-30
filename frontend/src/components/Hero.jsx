import "./Hero.css";
import { useNavigate } from "react-router-dom";

import {
  FiArrowRight,
  FiPlay,
  FiCheckCircle,
  FiTrendingUp,
  FiMic,
  FiFileText,
  FiBarChart2,
  FiActivity,
  FiAward,
} from "react-icons/fi";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero">

      {/* Background */}

      <div className="hero-grid"></div>

      <div className="hero-noise"></div>

      <div className="hero-blur hero-blur-1"></div>

      <div className="hero-blur hero-blur-2"></div>

      <div className="hero-blur hero-blur-3"></div>

      <div className="hero-container">

        {/* ================= LEFT ================= */}

        <div className="hero-content">

          <div className="hero-badge">

            <span className="badge-dot"></span>

            Trusted by Students & Developers

          </div>

          <h1 className="hero-title">

            Practice Smarter.

            <br />

            <span>Ace Every Interview.</span>

          </h1>

          <p className="hero-description">

            Prepare for Technical, HR and Behavioral interviews with
            AI-powered mock interviews, resume analysis, performance
            tracking and detailed personalized feedback.

          </p>

          <div className="hero-buttons">

            <button
              className="hero-primary"
              onClick={() => navigate("/interview")}
            >
              Start Free

              <FiArrowRight />
            </button>

            <button className="hero-secondary">

              <FiPlay />

              Watch Demo

            </button>

          </div>

          <div className="hero-features">

            <div className="feature-pill">

              <FiCheckCircle />

              AI Interview

            </div>

            <div className="feature-pill">

              <FiCheckCircle />

              Resume Scanner

            </div>

            <div className="feature-pill">

              <FiCheckCircle />

              Emotion Detection

            </div>

            <div className="feature-pill">

              <FiCheckCircle />

              ATS Analysis

            </div>

          </div>

          <div className="hero-stats">

            <div className="stat-box">

              <h2>10K+</h2>

              <span>Mock Interviews</span>

            </div>

            <div className="stat-box">

              <h2>94%</h2>

              <span>Success Rate</span>

            </div>

            <div className="stat-box">

              <h2>24×7</h2>

              <span>AI Available</span>

            </div>

          </div>

        </div>

        {/* ================= RIGHT ================= */}

        <div className="hero-preview">

          <div className="preview-window">

            <div className="preview-top">

              <div className="preview-title">

                <span>AI INTERVIEW ANALYZER</span>

                <h3>Performance Dashboard</h3>

              </div>

              <div className="live-pill">

                Live

              </div>

            </div>

            <div className="score-section">

              <div className="score-ring">

                <div className="score-inner">

                  <h1>94%</h1>

                  <span>Overall Score</span>

                </div>

              </div>

              <div className="score-info">

                <div>

                  <FiTrendingUp />

                  +18% This Week

                </div>

                <div>

                  <FiAward />

                  Excellent

                </div>

              </div>

            </div>
                        <div className="metrics-grid">

              <div className="metric-card">

                <div className="metric-icon">
                  <FiMic />
                </div>

                <div>

                  <span>Communication</span>

                  <strong>91%</strong>

                </div>

              </div>

              <div className="metric-card">

                <div className="metric-icon">
                  <FiActivity />
                </div>

                <div>

                  <span>Confidence</span>

                  <strong>89%</strong>

                </div>

              </div>

              <div className="metric-card">

                <div className="metric-icon">
                  <FiFileText />
                </div>

                <div>

                  <span>Resume Match</span>

                  <strong>96%</strong>

                </div>

              </div>

              <div className="metric-card">

                <div className="metric-icon">
                  <FiBarChart2 />
                </div>

                <div>

                  <span>AI Feedback</span>

                  <strong>Excellent</strong>

                </div>

              </div>

            </div>

            <div className="activity-card">

              <div className="activity-header">

                <h4>Recent Sessions</h4>

                <span>Today</span>

              </div>

              <div className="activity-item">

                <div className="activity-dot success"></div>

                <div className="activity-content">

                  <strong>Frontend Interview</strong>

                  <span>Completed • React Developer</span>

                </div>

                <h5>95%</h5>

              </div>

              <div className="activity-item">

                <div className="activity-dot purple"></div>

                <div className="activity-content">

                  <strong>HR Round</strong>

                  <span>Completed • Behavioural</span>

                </div>

                <h5>92%</h5>

              </div>

              <div className="activity-item">

                <div className="activity-dot blue"></div>

                <div className="activity-content">

                  <strong>System Design</strong>

                  <span>Scheduled Tomorrow</span>

                </div>

                <h5>--</h5>

              </div>

            </div>

            <div className="progress-card">

              <div className="progress-header">

                <span>Weekly Improvement</span>

                <strong>+18%</strong>

              </div>

              <div className="progress-bar">

                <div className="progress-fill"></div>

              </div>

              <p>

                Your communication, confidence and technical knowledge
                have improved consistently during the last seven mock
                interviews.

              </p>

            </div>

            <button className="preview-button">

              View Complete Report

              <FiArrowRight />

            </button>

          </div>
                    <div className="floating-widget widget-1">

            <div className="floating-icon">

              <FiTrendingUp />

            </div>

            <div>

              <span>Interview Score</span>

              <strong>+12%</strong>

            </div>

          </div>

          <div className="floating-widget widget-2">

            <div className="floating-icon">

              <FiMic />

            </div>

            <div>

              <span>Communication</span>

              <strong>Excellent</strong>

            </div>

          </div>

          <div className="floating-widget widget-3">

            <div className="floating-icon">

              <FiAward />

            </div>

            <div>

              <span>AI Recommendation</span>

              <strong>Ready for SDE-1</strong>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;