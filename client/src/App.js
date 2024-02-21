
import Registration from './components/Registration';
import React from 'react';
import Learn from './components/Learn';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css';
import Profile from "./components/Profile";
import ProfileEdit from "./components/ProfileEdit";
import NavBar from "./components/NavBar";
import QuizQuestions from "./components/Quizquestion";
import EditUserData from './components/RegistrationEdit';
import UserList from './components/UserList';
import Login from './components/Login';
import LeaderBoard from './components/LeaderBoard';
import { useState } from "react";
import MainPage from './components/MainPage';

function App() {
  const [user, setUser] = useState(localStorage.getItem("currentUser"));
  const [userId, setUserId] = useState(localStorage.getItem("currentUserId"));

  function handleLogin() {
    setUser(localStorage.getItem("currentUser"));
    setUserId(localStorage.getItem("currentUserId"));
  }

  return (
    <div className="App">
      <NavBar userName={user}></NavBar>
       <Router>
            <Routes>
              <Route path='/' element={<MainPage/>} />
                <Route path='/profile' element={<Profile userId={userId} />} />
                <Route path='/profile/edit' element={<ProfileEdit userId={userId} />} />
                  <Route path='/quiz' element={<QuizQuestions />}/>
                    <Route path='/registration' element={<Registration />} />
                    <Route path='/edit-user/:id' element={<EditUserData/>}/>
                    <Route path='/users' element={<UserList/>}/>
                    <Route path='/login' element={<Login onLogin={handleLogin}/>}/>
                    <Route path="/learn" element={<Learn />} />
                    <Route path="/leaderboard" element={<LeaderBoard />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
