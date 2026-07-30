import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

import Dashboard from "./pages/Dashboard";
import Interview from "./pages/Interview";

import VoiceCameraInterview from "./pages/VoiceCameraInterview";
import History from "./pages/History";
import Report from "./pages/Report";
import Summary from "./pages/Summary";
import Profile from "./pages/Profile";

import ProtectedLayout from "./components/ProtectedLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import ResumeResult from "./pages/ResumeResult";


function App() {

  return (

    <BrowserRouter>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1f2937",
            color: "#fff",
            borderRadius: "10px",
          },
        }}
      />

      <Routes>

        {/* Public Routes */}

        <Route
          path="/"
          element={<Home />}
        />
       <Route path="/resume-result" element={<ResumeResult />} />
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Protected Routes */}

        <Route
          element={
            <ProtectedRoute>
              <ProtectedLayout />
            </ProtectedRoute>
          }
        >

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/interview"
            element={<Interview />}
          />

          

          <Route
            path="/voice-camera"
            element={<VoiceCameraInterview />}
          />

          <Route
            path="/history"
            element={<History />}
          />

          <Route
            path="/report"
            element={<Report />}
          />

          <Route
            path="/summary"
            element={<Summary />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

        </Route>

      </Routes>

    </BrowserRouter>

  );

}

export default App;