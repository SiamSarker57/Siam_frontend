import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './MainLayout/MainLayout';
import Home from './components/Home';
import Scanner from './components/Scanner';
import BatchAudit from './components/BatchAudit';
import Dashboard from './components/Dashboard';
import History from './components/History';
import Profile from './components/Profile';
import Prediction from './components/Prediction';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import OAuthCallback from './components/OAuthCallback';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/oauth-callback" element={<OAuthCallback />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/scanner" element={<Scanner />} />
          <Route path="/prediction" element={<Prediction />} />
          <Route path="/batch" element={<BatchAudit />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
