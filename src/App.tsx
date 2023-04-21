import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./mainCss.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Main from "./components/main/Main";
import Registration from "./components/registration/Registration";
import Example from "./components/login/SignInWithGoogle";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/bla" element={<Example />} ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
