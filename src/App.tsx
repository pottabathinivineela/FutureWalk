import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import MentorSelection from "./pages/MentorSelection";
import Dashboard from "./pages/Dashboard";
import MentorChat from "./pages/MentorChat";
import SimulationHub from "./pages/SimulationHub";
import SimulationEntry from "./pages/SimulationEntry";
import FutureSelf from "./pages/FutureSelf";
import JobSimulation from "./pages/JobSimulation";
import CareerRoadmap from "./pages/CareerRoadmap";
import ScholarshipHub from "./pages/ScholarshipHub";
import HackathonHub from "./pages/HackathonHub";
import SkillDashboard from "./pages/SkillDashboard";
import ParentDashboard from "./pages/ParentDashboard";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound, { LoadingScreen, Maintenance } from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Auth mode="student-login" />} />
        <Route path="/signup" element={<Auth mode="student-signup" />} />
        <Route path="/admin-login" element={<Auth mode="admin-login" />} />

        {/* Onboarding flow */}
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/mentor-selection" element={<MentorSelection />} />

        {/* Student app */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mentor-chat" element={<MentorChat />} />
        <Route path="/simulation-hub" element={<SimulationHub />} />
        <Route path="/simulation-entry" element={<SimulationEntry />} />
        <Route path="/future-self" element={<FutureSelf />} />
        <Route path="/job-simulation" element={<JobSimulation />} />
        <Route path="/career-roadmap" element={<CareerRoadmap />} />
        <Route path="/scholarships" element={<ScholarshipHub />} />
        <Route path="/hackathons" element={<HackathonHub />} />
        <Route path="/skills" element={<SkillDashboard />} />
        <Route path="/parent" element={<ParentDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/*" element={<AdminDashboard />} />

        {/* Special */}
        <Route path="/loading" element={<LoadingScreen />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
