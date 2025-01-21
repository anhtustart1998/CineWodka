import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import { Navbar } from "./components/Navbar/Navbar.jsx";
import { Footer } from "./components/Footer/Footer.jsx";
import {
  Routes,
  Route,
  BrowserRouter,
  ScrollRestoration,
} from "react-router-dom";
import { LoginPage } from "./pages/Login/LoginPage.jsx";
import { RegisterPage } from "./pages/Register/RegisterPage.jsx";
import { HomePage } from "./pages/Home/HomePage.jsx";
import { Provider } from "react-redux";
import { store } from "./Store/store.jsx";
import { AdminPage } from "./pages/Admin/AdminPage.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute.jsx";
import { UserManagement } from "./components/AdminManagements/UserManagements/UserManagement.jsx";
import { MovieManagement } from "./components/AdminManagements/MovieManagements/MovieManagement.jsx";
import DetailMovie from "./pages/Detail/DetailMovie.jsx";
import ScrollToTop from "./components/CustomerHook/ScrollToTop.jsx";

function App() {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col text-sm bg-gray-100 dark:bg-gray-900 transition-colors duration-300 overflow-x-hidden w-full">
            <Navbar />

            <main className="flex-grow w-full mt-16">
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="detail/:id" element={<DetailMovie />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute adminOnly>
                      <AdminPage />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<div>Admin Dashboard</div>} />
                  <Route path="users" element={<UserManagement />} />
                  <Route path="movies" element={<MovieManagement />} />
                </Route>
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
