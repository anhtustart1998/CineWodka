import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import { Navbar } from "./components/Navbar/Navbar.jsx";
import { Footer } from "./components/Footer/Footer.jsx";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { LoginPage } from "./pages/Login/LoginPage.jsx";
import { RegisterPage } from "./pages/Register/RegisterPage.jsx";
import { HomePage } from "./pages/Home/HomePage.jsx";
import { Provider } from "react-redux";
import { store } from "./Store/store.jsx";

function App() {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col text-sm bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 overflow-x-hidden w-full">
            <Navbar />

            <main className="flex-grow w-full mt-20">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
