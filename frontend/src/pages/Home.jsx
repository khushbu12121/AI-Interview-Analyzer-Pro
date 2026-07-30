import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import "./Home.css";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
FiFileText,
FiMic,
FiBarChart2,
FiArrowRight,
FiArrowUpRight
} from "react-icons/fi";

import { FaRobot } from "react-icons/fa";
import { BsEmojiSmile } from "react-icons/bs";
import { MdRocketLaunch } from "react-icons/md";

function Home() {

  const navigate = useNavigate();
  useEffect(() => {

  AOS.init({

    duration: 900,
    once: true,
    offset: 120,
    easing: "ease-out-cubic",

  });

}, []);

  const handleStart = () => {

    if(localStorage.getItem("token")){

      navigate("/dashboard");

    }

    else{

      navigate("/login");

    }

  };

  const features=[

    {
      icon:<FiFileText />,
      title:"Resume Analysis",
      desc:"Upload your resume and receive ATS score, keyword suggestions, AI improvements and detailed profile analysis."
    },

    {
      icon:<FaRobot />,
      title:"AI Interview Generator",
      desc:"Generate personalized interview questions according to your resume, role and selected technology."
    },

    {
      icon:<FiMic />,
      title:"Voice Interview",
      desc:"Practice real voice interviews with speech recognition, communication analysis and confidence scoring."
    },

    {
      icon:<BsEmojiSmile />,
      title:"Emotion Detection",
      desc:"Track facial expressions, confidence level and emotions throughout the interview session."
    },

    {
      icon:<FiBarChart2 />,
      title:"Detailed Reports",
      desc:"Receive AI-powered performance reports with strengths, weaknesses and actionable improvements."
    },

    {
      icon:<MdRocketLaunch />,
      title:"Career Roadmap",
      desc:"Get personalized learning recommendations and career guidance based on interview performance."
    }

  ];

  const process=[

    {
      no:"01",
      title:"Upload Resume",
      desc:"Upload your latest resume so AI can understand your profile."
    },

    {
      no:"02",
      title:"Generate Questions",
      desc:"Receive interview questions tailored to your skills and experience."
    },

    {
      no:"03",
      title:"Take Interview",
      desc:"Practice with voice interaction, AI evaluation and emotion analysis."
    },

    {
      no:"04",
      title:"View Report",
      desc:"Receive detailed feedback with improvement suggestions and scores."
    }

  ];

  return(

    <>

      <Navbar/>

      <main className="home-page">

        <Hero handleStart={handleStart}/>

        {/* ================= TRUST ================= */}

        <section className="home-trust-section">

          <div className="home-trust-card">

            <div className="home-trust-item">

    <div className="trust-icon">
        <FiMic/>
    </div>

    <h2>1000+</h2>

    <p>AI Mock Interviews</p>

</div>

            <div className="home-trust-item">

    <div className="trust-icon">
        <FiBarChart2/>
    </div>

    <h2>95%</h2>

    <p>Evaluation Accuracy</p>

</div>

            <div className="home-trust-item">

    <div className="trust-icon">
        <MdRocketLaunch/>
    </div>

    <h2>24/7</h2>

    <p>Always Available</p>

</div>

            <div className="home-trust-item">

    <div className="trust-icon">
        <BsEmojiSmile/>
    </div>

    <h2>4.9★</h2>

    <p>Student Rating</p>

</div>

          </div>

        </section>

        {/* ================= FEATURES ================= */}

        <section
id="features"
className="home-features-section"
data-aos="fade-up"
>

          <div className="home-section-heading">

            <span>

              EVERYTHING YOU NEED

            </span>

            <h2>

              One Platform.
              Every Interview Skill.

            </h2>

            <p>

              Practice realistic interviews, improve communication,
              analyze resumes and receive AI-powered feedback through
              one modern interview preparation platform.

            </p>

          </div>

          <div className="home-features-grid">

            {

              features.map((feature,index)=>(

                <div
className="home-feature-card"
key={index}
data-aos="fade-up"
data-aos-delay={index * 100}
>
                  <div className="feature-arrow">

    <FiArrowUpRight/>

</div>

                  <div className="home-feature-icon">

                    {feature.icon}

                  </div>

                  <h3>

                    {feature.title}

                  </h3>

                  <p>

                    {feature.desc}

                  </p>
                  <div className="feature-tags">

    <span>AI Powered</span>

    <span>24/7</span>

</div>

                  <button className="home-card-link">

                    Learn More

                    <FiArrowRight/>

                  </button>

                </div>

              ))

            }

          </div>

        </section>
                {/* ================= HOW IT WORKS ================= */}

        <section
id="how-it-works"
className="home-process-section"
data-aos="fade-up"
>

          <div className="home-section-heading">

            <span>

              SIMPLE PROCESS

            </span>

            <h2>

              Prepare in Four Simple Steps

            </h2>

            <p>

              Start practicing interviews within minutes. Our AI guides
              you through every stage—from resume analysis to detailed
              performance reports.

            </p>

          </div>

          <div className="home-process-grid">

            {

              process.map((step,index)=>(

               <div
className="home-process-card"
key={index}
data-aos="fade-up"
data-aos-delay={index * 120}
>

                  <div className="home-process-number">

                    {step.no}

                  </div>
                  <div className="process-line"></div>

<h3>

    {step.title}

</h3>

<p>

    {step.desc}

</p>

                </div>

              ))

            }

          </div>

        </section>

        {/* ================= CTA ================= */}

        <section
className="home-cta-section"
data-aos="zoom-in"
>

          <div className="home-cta-card">

            <span>

              READY TO START?

            </span>

            <h2>

              Crack Your Next Interview
              with AI Confidence.

            </h2>

            <p>

              Experience personalized mock interviews, resume analysis,
              emotion detection and detailed AI feedback—all in one
              platform designed to help you succeed.

            </p>

            <div className="home-cta-buttons">

              <button
                className="home-primary-btn"
                onClick={handleStart}
              >

                Get Started

              </button>

              <button
                className="home-secondary-btn"
                onClick={()=>navigate("/about")}
              >

                Learn More

              </button>

            </div>

          </div>

        </section>

      </main>

      {/* ================= FOOTER ================= */}

      <footer
id="contact"
className="home-footer"
data-aos="fade-up"
>

        <div className="home-footer-container">

          <div className="home-footer-brand">

            <div className="footer-logo">

    <div className="footer-logo-box">

        AI

    </div>

    <div>

        <small>AI Interview</small>

        <h2>Analyzer</h2>

    </div>

</div>

            <p>

              Prepare smarter with AI-powered mock interviews,
              resume analysis, emotion detection and personalized
              performance insights.

            </p>
            <div className="footer-badge">

    AI Powered Interview Platform

</div>

          </div>

          <div className="home-footer-links">

  <div>

    <h4>Product</h4>

    <a href="#features">Features</a>

    <a href="#how-it-works">How It Works</a>

    <button onClick={handleStart}>Dashboard</button>

  </div>

  <div>

    <h4>Resources</h4>

    <a href="#features">Documentation</a>

    <a href="#how-it-works">FAQ</a>

    <button>Support</button>

  </div>

  <div>

    <h4>Company</h4>

    <button onClick={()=>navigate("/about")}>About</button>

    <button onClick={()=>navigate("/contact")}>Contact</button>

    <button>Careers</button>

  </div>

  <div>

    <h4>Legal</h4>

    <button>Privacy</button>

    <button>Terms</button>

    <button>Cookies</button>

  </div>

</div>

        </div>

        <div className="home-footer-bottom">

          <p>

            © {new Date().getFullYear()} InterviewAI.
            All Rights Reserved.

          </p>

        </div>

      </footer>

    </>

  );

}

export default Home;
        