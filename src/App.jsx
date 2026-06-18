import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import Loader from "./components/Loader/Loader";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./sections/Hero/Hero";
import Events from "./sections/Events/Events";
import Journey from "./sections/Journey/Journey";
import WhatIs from "./sections/WhatIs/WhatIs";
import Categories from "./sections/Categories/Categories";
import Disciplines from "./sections/Disciplines/Disciplines";
import Advantage from "./sections/Advantage/Advantage";
import Ecosystem from "./sections/Ecosystem/Ecosystem";
import Sponsors from "./sections/Sponsors/Sponsors";
import Footer from "./sections/Footer/Footer";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

function HomePage() {
  return (
    <main>
      <Hero />
      <Events />
      <Journey />
      <WhatIs />
      <Categories />
      <Disciplines />
      <Advantage />
      <Ecosystem />
      <Sponsors />
    </main>
  );
}

function Layout() {
  const location = useLocation();
  const isAuth =
    location.pathname === "/login" || location.pathname === "/register";
  return (
    <>
      {!isAuth && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      {!isAuth && <Footer />}
    </>
  );
}

export default function App() {
  const [loaderDone, setLoaderDone] = useState(false);

  return (
    <BrowserRouter>
      <AuthProvider>
        {!loaderDone && <Loader onDone={() => setLoaderDone(true)} />}
        <div style={{ visibility: loaderDone ? "visible" : "hidden" }}>
          <Layout />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
