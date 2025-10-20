// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ResumePage from "./pages/ResumePage";
import ScrollToHash from "./components/ScrollToHash";

export default function App() {
  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <Navbar />
        <ScrollToHash /> {/* <= add this */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/resume" element={<ResumePage />} />
        </Routes>
      </div>
    </div>
  );
}
