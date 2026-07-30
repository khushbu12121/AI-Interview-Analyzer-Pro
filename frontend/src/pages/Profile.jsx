import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { FaUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { HiIdentification } from "react-icons/hi2";
import "./Profile.css";
import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {

  const [user, setUser] =
    useState(null);

  const [analytics, setAnalytics] =
    useState(null);

  useEffect(() => {

    fetchProfile();

  }, []);

  const fetchProfile =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await axios.get(
            "http://127.0.0.1:8000/me",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setUser(
          response.data
        );

        const analyticsResponse =
          await axios.get(
            "http://127.0.0.1:8000/profile-analytics"
          );

        setAnalytics(
          analyticsResponse.data
        );

      } catch (error) {

        console.log(error);

        toast.error("Failed to load profile");
      }
    };
if (!user) {
  return <Loader />;
}

return (

  <div className="page-container">

    {/* ===========================
            PAGE HEADER
    =========================== */}

    <div className="profile-header">

      <div>

        <h1 className="page-title">
          My Profile
        </h1>

        <p className="profile-page-subtitle">
          Manage your account and track your AI interview journey.
        </p>

      </div>

      <div className="profile-badge">
        👤 Candidate
      </div>

    </div>

    {/* ===========================
            PROFILE HERO
    =========================== */}

    <div className="profile-card profile-hero">

      <div className="avatar-section">

        <div className="avatar-circle">
          <FaUserCircle className="avatar-icon" />
        </div>

        <h2 className="profile-name">
          {user.name}
        </h2>

        <p className="profile-subtitle">
          AI Interview Candidate
        </p>

        <div className="profile-tags">

          <span className="profile-chip">
            🆔 ID #{user.id}
          </span>

          <span className="profile-chip">
            <MdEmail />
            {user.email}
          </span>

        </div>

      </div>

      <div className="profile-divider"></div>

      <div className="profile-info">

        <h2>
          👤 User Information
        </h2>

        <div className="info-row">

          <div className="info-left">

            <HiIdentification className="profile-icon" />

            <span>User ID</span>

          </div>

          <strong>
            {user.id}
          </strong>

        </div>

        <div className="info-row">

          <div className="info-left">

            👤

            <span>Name</span>

          </div>

          <strong>
            {user.name}
          </strong>

        </div>

        <div className="info-row">

          <div className="info-left">

            <MdEmail className="profile-icon" />

            <span>Email</span>

          </div>

          <strong>
            {user.email}
          </strong>

        </div>

      </div>

    </div>

    {/* ===========================
            ANALYTICS
    =========================== */}

    {analytics && (
            <div className="profile-card analytics-card">

        <div className="analytics-header">

          <div>

            <h2>
              📊 Profile Analytics
            </h2>

            <p className="analytics-subtitle">
              Track your interview performance and overall progress.
            </p>

          </div>

        </div>

        {/* ===========================
                STATS
        =========================== */}

        <div className="profile-stats">

          <div className="profile-stat">

            <h1>{analytics.total_interviews}</h1>

            <p>📂 Total Interviews</p>

          </div>

          <div className="profile-stat">

            <h1>{analytics.average_score}</h1>

            <p>📈 Average Score</p>

          </div>

          <div className="profile-stat">

            <h1>{analytics.best_score}</h1>

            <p>🏆 Best Score</p>

          </div>

        </div>

        {/* ===========================
                PERFORMANCE
        =========================== */}

        <div className="performance-grid">

          <div className="performance-card">

            <h3>
              📈 Improvement Trend
            </h3>

            <p>
              {analytics.improvement}
            </p>

          </div>

          <div className="performance-card">

            <h3>
              💪 Strongest Skill
            </h3>

            <p>
              {analytics.strongest_skill}
            </p>

          </div>

          <div className="performance-card">

            <h3>
              ⚠ Needs Improvement
            </h3>

            <p>
              {analytics.weakest_skill}
            </p>

          </div>

        </div>

      </div>

    )}

  </div>

);

}

export default Profile;