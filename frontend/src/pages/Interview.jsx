import { useState, useEffect, useRef } from "react";
import axios from "axios";
import * as faceapi from "face-api.js";
import { useNavigate } from "react-router-dom";


function Interview() {
  const navigate = useNavigate();

  const storedQuestions =
    localStorage.getItem("interviewQuestions");

  const questions =
    storedQuestions
      ? storedQuestions
          .split("\n")
          .filter(
            (q) =>
              q.trim() !== "" &&
              q.includes("?")
          )
      : ["Tell me about yourself"];

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

    alert(
      "Camera access denied"
    );
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

  const [sessionId, setSessionId] =
    useState(null);
  const videoRef = useRef(null);
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
  const [emotionHistory, setEmotionHistory] =
    useState([]);
    useEffect(() => {

  const interval =
    setInterval(() => {

      detectEmotion();

    }, 2000);

  return () =>
    clearInterval(interval);

}, []);

  const startInterview = async () => {

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


      setSessionId(newSessionId);

      localStorage.setItem(
        "sessionId",
        newSessionId
      );

      console.log(
        "New Session Created:",
        newSessionId
      );

    } catch (error) {

      console.log(error);

      alert(
        "Failed to start interview"
      );
    }
  };

  useEffect(() => {

  const init = async () => {

    await loadModels();

    await startCamera();

    startInterview();
  };

  init();

}, []);

  useEffect(() => {

  if (timeLeft <= 0) {

    if (answer.trim()) {

      handleSubmit();

    }

    handleNext();

    setTimeLeft(60);

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

    if (!answer.trim()) {

      alert(
        "Please enter an answer"
      );

      return;
    }

    try {

      const response =
        await axios.post(
          "http://127.0.0.1:8000/submit-answer",
          {
            session_id: sessionId,
            question:
              questions[currentQuestion],
            answer: answer
          }
        );

      setEvaluation(
        response.data.feedback
      );

      alert(
        `Answer Saved\nScore: ${response.data.score}/10`
      );

    } catch (error) {

      console.log(error);

      alert(
        "Evaluation Failed"
      );
    }
  };

  const handleNext = () => {

    if (
      currentQuestion <
      questions.length - 1
    ) {

      setCurrentQuestion(
        currentQuestion + 1
      );

      setAnswer("");

      setEvaluation("");
      setTimeLeft(60);

    } else {

  captureSnapshot();

localStorage.setItem(
  "emotionHistory",
  JSON.stringify(
    emotionHistory
  )
);

alert(
  "Interview Completed!"
);

navigate("/report");
}
    };

  return (

    <div className="page-container">

      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px"
        }}
      >
        Mock Interview
      </h1>

      <h3
        style={{
          textAlign: "center",
          color: "#6366f1"
        }}
      >
        Session ID: {sessionId}
      </h3>
      <div
  style={{
    textAlign: "center",
    marginBottom: "20px"
  }}
>

  <video
    ref={videoRef}
    autoPlay
    muted
    width="320"
    height="240"
    style={{
      borderRadius: "12px",
      border: "3px solid #8b5cf6"
    }}
  />
  <h3
  style={{
    color: "#fbbf24",
    marginTop: "10px"
  }}
>
  Emotion: {emotion}
</h3>

</div>

      <h2
        style={{
          textAlign: "center"
        }}
      >
        Question {currentQuestion + 1}
        /{questions.length}
      </h2>
      <h3
  style={{
    textAlign: "center",
    color: "#fbbf24",
    marginBottom: "20px"
  }}
>
  Time Left: {timeLeft}s
</h3>
<div
  style={{
    width: "100%",
    height: "12px",
    background: "#374151",
    borderRadius: "10px",
    marginBottom: "25px",
    overflow: "hidden"
  }}
>
  <div
    style={{
      width: `${
        ((currentQuestion + 1) /
          questions.length) *
        100
      }%`,
      height: "100%",
      background:
        "linear-gradient(90deg,#6366f1,#8b5cf6)",
      transition:
        "0.5s"
    }}
  />
</div>

      <div
        style={{
          background: "#ffffff",
          color: "#111827",
          padding: "25px",
          borderRadius: "15px",
          marginBottom: "25px",
          border: "2px solid #8b5cf6",
          fontSize: "20px",
          fontWeight: "500",
          lineHeight: "1.8"
        }}
      >
        {questions[currentQuestion]}
      </div>

      <textarea
        rows="8"
        value={answer}
        onChange={(e) =>
          setAnswer(
            e.target.value
          )
        }
        placeholder="Type your answer here..."
        style={{
          width: "100%",
          padding: "15px",
          borderRadius: "10px",
          border: "1px solid #ccc",
          fontSize: "16px"
        }}
      />
      <div
  style={{
    textAlign: "right",
    marginTop: "8px",
    color: "#94a3b8",
    fontSize: "14px"
  }}
>
  Answer Length:
  {" "}
  {answer.length}
  {" "}
  characters
</div>
      <div
  style={{
    textAlign: "center",
    marginTop: "15px"
  }}
>
  <button
  className="primary-btn"
  onClick={startVoiceInput}
>
  🎤 Speak Answer
</button>
</div>

      <div
        style={{
          textAlign: "center",
          marginTop: "20px"
        }}
      >
        <button
          className="primary-btn"
          onClick={handleSubmit}
        >
          Submit Answer
        </button>
      </div>

      {evaluation && (

        <div
          style={{
            marginTop: "25px",
            background: "#f8fafc",
            border: "1px solid #ddd",
            borderRadius: "12px",
            padding: "20px",
            whiteSpace: "pre-wrap",
            color: "#111827"
          }}
        >
          <h2>
            AI Evaluation
          </h2>

          {evaluation}
        </div>

      )}

      <div
        style={{
          textAlign: "center",
          marginTop: "20px"
        }}
      >
        <button
          className="primary-btn"
          onClick={handleNext}
        >
          Next Question
        </button>
      </div>

    </div>
  );
}

export default Interview;