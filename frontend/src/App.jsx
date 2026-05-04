import { Route, Routes, useLocation } from "react-router-dom";
import { Login } from "./pages/Login.jsx";
import { MainPage } from "./pages/MainPage.jsx";
import { Signup } from "./pages/Signup.jsx";
import { ResumeGeneration } from "./pages/ResumeGeneration.jsx";
import { ResumeHistory } from "./pages/ResumeHistory.jsx";
import { TemplatePage } from "./components/Templates/TemplatePage.jsx";
import { AIResumeUpload } from "./pages/aiResumeUpload.jsx";
import { AdminDashboard } from "./pages/AdminDashboard.jsx";
import { PasswordReset } from "./pages/PasswordReset.jsx";
import { ProtectedRoute, AdminRoute } from "./components/ProtectedRoute.jsx";
import { useState } from "react";
import { Navbar } from "./components/Navbar.jsx";
import { Breadcrumbs } from "./components/Breadcrumbs.jsx";
import { Footer } from "./components/Footer.jsx";
import { AboutPage } from "./pages/AboutPage.jsx";
import { ContactPage } from "./pages/ContactPage.jsx";
import { AdminTemplateManagement } from "./pages/AdminTemplateManagement.jsx";

function App() {
  const [currentTemplate, setCurrentTemplate] = useState("default");
  const location = useLocation();
  const hideSiteChrome = [
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
  ].includes(location.pathname);

  return (
    <>
      {!hideSiteChrome && <Navbar />}
      {!hideSiteChrome && <Breadcrumbs />}
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/about" element={<AboutPage />}></Route>
        <Route path="/contact" element={<ContactPage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/forgot-password" element={<PasswordReset />}></Route>
        <Route path="/reset-password" element={<PasswordReset />}></Route>
        <Route
          path="/resumeUpload"
          element={
            <ProtectedRoute>
              <AIResumeUpload />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/resumePreview"
          element={
            <ProtectedRoute>
              <ResumeGeneration currentTemplate={currentTemplate} />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/resume-history"
          element={
            <ProtectedRoute>
              <ResumeHistory />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/templates"
          element={
            <ProtectedRoute>
              <TemplatePage
                currentTemplate={currentTemplate}
                setCurrentTemplate={setCurrentTemplate}
              />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        ></Route>
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        ></Route>
        <Route
          path="/admin/templates"
          element={
            <AdminRoute>
              <AdminTemplateManagement />
            </AdminRoute>
          }
        ></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
