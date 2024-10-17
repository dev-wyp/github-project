import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserReposPage from './pages/UserReposPage';
import RepoIssuesPage from './pages/RepoIssuesPage';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user/:username" element={<UserReposPage />} />
        <Route
          path="/user/:username/repo/:repoName"
          element={<RepoIssuesPage />}
        />
      </Routes>
    </Router>
  );
};

export default App;
