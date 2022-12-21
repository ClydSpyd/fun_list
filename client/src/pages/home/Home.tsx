import React from 'react'
import LoginForm from '../../components/LoginForm';
import { useAuth } from "../../context/AuthContext";
import logo from "../../logo.svg";

const Home = () => {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <LoginForm />
    </header>
  )
}

export default Home