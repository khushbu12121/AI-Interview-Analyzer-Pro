import toast from "react-hot-toast";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import * as faceapi from "face-api.js";
import { useNavigate } from "react-router-dom";
import InterviewWelcome from "../components/InterviewWelcome";

function VoiceCameraInterview() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);

useEffect(() => {

  const storedQuestions =
    localStorage.getItem("interviewQuestions");

  if (
    storedQuestions &&
    storedQuestions !== "undefined" &&
    storedQuestions !== "null"
  ) {

    const parsedQuestions = storedQuestions
      .split("\n")
      .map(q => q.trim())
      .filter(q => q !== "");

    setQuestions(parsedQuestions);

  } else {

    setQuestions([
      "Tell me about yourself.",
      "Explain the difference between OOP and Procedural Programming.",
      "What is Polymorphism?",
      "What is Inheritance?",
      "Difference between Process and Thread?",
      "Explain TCP and UDP.",
      "What is DBMS? Explain Primary Key and Foreign Key.",
      "What are REST APIs?",
      "Tell me about one project you have worked on.",
      "Why should we hire you?"
    ]);

  }

}, []);
  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [answer, setAnswer] =
    useState("");
    const startVoiceInput = () => {

  const recognition =
    new window.webkitSpeechRecognition();

  recognition.lang = "en-US";

  recognition.continuous = false;

  recognition.interimResults = false;

  recognition.onresult = (event) => {

    const transcript =
      event.results[0][0].transcript;

    setAnswer(
      transcript
    );
  };
  recognition.onstart = () => {
  console.log("Recording Started");
};

recognition.onerror = (event) => {
  console.log(
    "ERROR =",
    event.error
  );
};

recognition.onend = () => {
  console.log(
    "Recording Ended"
  );
};

  recognition.start();
};
const startCamera = async () => {

  try {

    const stream =
      await navigator.mediaDevices.getUserMedia({
        video: true
      });

    if (videoRef.current) {

      videoRef.current.srcObject =
        stream;
    }

  } catch (error) {

    console.log(error);

    toast.error("Camera access denied");
  }
};

const loadModels = async () => {

  await faceapi.nets.tinyFaceDetector.loadFromUri(
    "/models"
  );

  await faceapi.nets.faceExpressionNet.loadFromUri(
    "/models"
  );

  console.log(
    "Models Loaded"
  );
};
const detectEmotion = async () => {

  if (!videoRef.current) return;

  const detection =
    await faceapi
      .detectSingleFace(
        videoRef.current,
        new faceapi.TinyFaceDetectorOptions()
      )
      .withFaceExpressions();

  if (
    detection &&
    detection.expressions
  ) {

    const expressions =
      detection.expressions;

    const dominantEmotion =
      Object.keys(expressions)
        .reduce((a, b) =>
          expressions[a] >
          expressions[b]
            ? a
            : b
        );

    setEmotion(
      dominantEmotion
    );
    setEmotionHistory(
  prev => [
    ...prev,
    dominantEmotion
  ]
);
  }
};
  const [evaluation, setEvaluation] =
    useState("");
  const [loading, setLoading] = useState(false);
  const [totalWords, setTotalWords] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [totalAnswers, setTotalAnswers] = useState(0);
  const [sessionId, setSessionId] =
    useState(null);
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const videoRef = useRef(null);
  const interviewStarted = useRef(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const captureSnapshot = () => {

  const canvas =
    document.createElement("canvas");

  canvas.width = 320;
  canvas.height = 240;

  const ctx =
    canvas.getContext("2d");

  ctx.drawImage(
    videoRef.current,
    0,
    0,
    320,
    240
  );

  const image =
    canvas.toDataURL(
      "image/png"
    );

  localStorage.setItem(
    "snapshot",
    image
  );
};
  const [timeLeft, setTimeLeft] =
    useState(60);
  const [emotion, setEmotion] =
    useState("Loading...");
 const [submitted, setSubmitted] =
  useState(false);
  const [emotionHistory, setEmotionHistory] =
    useState([]);
    useEffect(() => {

  localStorage.setItem(
    "emotionHistory",
    JSON.stringify(emotionHistory)
  );

}, [emotionHistory]);
useEffect(() => {

  localStorage.setItem(
    "speakingAnalysis",
    JSON.stringify({
      totalWords,
      totalTime,
      totalAnswers
    })
  );

}, [totalWords, totalTime, totalAnswers]);
    useEffect(() => {

  const interval =
    setInterval(() => {

      detectEmotion();

    }, 2000);

  return () =>
    clearInterval(interval);

}, []);

 const startInterview = async () => {

  const existingSession =
    localStorage.getItem("sessionId");

  if (existingSession) {

    setSessionId(existingSession);
   const storedQuestions =
  localStorage.getItem("interviewQuestions");

if (storedQuestions) {

  setQuestions(
    storedQuestions
      .split("\n")
      .filter(q => q.trim())
  );

}
    console.log(
      "Using Existing Session:",
      existingSession
    );

    return;
  }

  try {

    const token =
      localStorage.getItem("token");

    const response =
      await axios.post(
        "http://127.0.0.1:8000/start-interview",
        {},
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    const newSessionId =
      response.data.session_id;

    setSessionId(
      newSessionId
    );

    localStorage.setItem(
      "sessionId",
      newSessionId
    );

  }

  catch (error) {

    console.log(error);

    toast.error(
      "Failed to start interview"
    );

  }

}
const startAIInterview = () => {

  setShowCountdown(true);

  setCountdown(3);

  let count = 3;

  const timer = setInterval(() => {

    count--;

    if (count > 0) {

      setCountdown(count);

    } else {

      clearInterval(timer);

      setShowCountdown(false);

      setIsInterviewStarted(true);

    }

  }, 1000);

};

  useEffect(() => {

  if (!isInterviewStarted) return;
  if (interviewStarted.current) return;

  interviewStarted.current = true;

  const init = async () => {

    await loadModels();

    await startCamera();

    await startInterview();

  };

  init();

}, [isInterviewStarted]);

  useEffect(() => {

 if (timeLeft <= 0) {

  if (answer.trim()) {

    handleSubmit();

  }

  return;

}

  const timer =
    setTimeout(() => {

      setTimeLeft(
        timeLeft - 1
      );

    }, 1000);

  return () =>
    clearTimeout(timer);

}, [timeLeft]);

  const handleSubmit = async () => {

  if (loading) return;

  if (submitted) return;

  if (!answer.trim()) {

    toast.error("Please enter an answer");

    return;

  }

  setLoading(true);

  try {

    const response = await axios.post(

      "http://127.0.0.1:8000/submit-answer",

      {

        session_id: sessionId,

        question: questions[currentQuestion],

        answer: answer

      }

    );
    console.log("SUBMIT RESPONSE =", response.data);
    setEvaluation(response.data.feedback);

    toast.success(
      `Answer Saved • Score: ${response.data.score}/10`
    );

    setSubmitted(true);

// 👇 Ye naya code add karo
const words = answer
  .trim()
  .split(/\s+/)
  .filter(word => word.length > 0).length;

setTotalWords(prev => prev + words);

setTotalTime(prev => prev + (60 - timeLeft));

setTotalAnswers(prev => prev + 1);

// 👇 Fir ye existing code rahega
if (response.data.completed) {

  captureSnapshot();

  alert("COMPLETED = TRUE");

  navigate("/report");

  return;

}
  }
  catch (error) {

    console.log(error);

    toast.error("Evaluation Failed");

  }

  finally {

    setLoading(false);

  }

};
  const handleNext = () => {

    if (!submitted) {
        toast.error("Please submit your answer first.");
        return;
    }

    // Agar last question hai to Next par kuch mat karo.
    // Report pehle hi handleSubmit() me open ho jayegi.
    if (currentQuestion === questions.length - 1) {
        return;
    }

    setCurrentQuestion(prev => prev + 1);

    setAnswer("");

    setEvaluation("");

    setSubmitted(false);

    setTimeLeft(60);

};
if (!isInterviewStarted) {
  if (showCountdown) {

  return (

    <div className="page-container">

      <div className="countdown-container">

        <h1 className="countdown-title">

          🤖 Preparing AI Interview

        </h1>

        <p className="countdown-subtitle">

          Setting up your interview environment...

        </p>

        <div className="countdown-number">

          {countdown}

        </div>

        <div className="loading-bar">

          <div className="loading-fill"></div>

        </div>

      </div>

    </div>

  );

}
  return (
  <div className="page-container">

    <InterviewWelcome
      questions={questions}
      startAIInterview={startAIInterview}
    />

  </div>
);
}

  return (

    <div className="page-container">

      <h1 className="interview-title">
        🤖 AI Interview Session
      </h1>
      <p className="live-subtitle">
  Answer confidently and naturally.
</p>
     {/*
      <h3 className="session-id">
        Session ID: {sessionId}
      </h3> */}
      <div className="camera-section">
        <p className="camera-title">
    📹 Live Camera Feed
</p>

  <video
  ref={videoRef}
  autoPlay
  muted
  width="220"
  height="165"
  className="camera-video"
/>
 {/*
  <h3 className="emotion-text">
  Emotion: {emotion}
</h3>  */}

</div>

     <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "20px 0"
  }}
>

  <h2 className="question-number">
    Question {Math.min(currentQuestion + 1, questions.length)} of {questions.length || 10}
  </h2>

  <div className="timer-badge">
    ⏱ {timeLeft}s Remaining
</div>

</div>
<div className="progress-bar">
  <div
    className="progress-fill"
    style={{
      width: `${
((currentQuestion + 1) /
(Math.max(questions.length,1))) * 100
}%`
    }}
  />
</div>

      <div className="question-card">
  {questions[currentQuestion] || "Loading question..."}
</div>

      <textarea
  rows="8"
  value={answer}
  onChange={(e) => setAnswer(e.target.value)}
  placeholder="Type your answer here..."
  className="answer-box"
/>
      <div className="character-count">
  Answer Length:
  {" "}
  {answer.length}
  {" "}
  characters
</div>
     <div className="button-group">

 <button
    className="primary-btn speak-btn"
    onClick={startVoiceInput}
>
    🎤 Speak
</button>

<button
    className="primary-btn submit-btn"
    onClick={handleSubmit}
    disabled={loading}
>
    {loading ? "Submitting..." : "✅ Submit"}
</button>

<button
    className="primary-btn next-btn"
    onClick={handleNext}
>
    ➡️ Next
</button>

</div>
    </div>
  );
}

export default VoiceCameraInterview;