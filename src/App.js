import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";



import Header from "./components/Header";
import Footer from "./components/Footer";
import Toaster from './components/Toaster';
import FloatingContactButton from "./components/FloatingContactButton";

// Admin sayfaları
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import GenerateReviewLink from "./pages/admin/GenerateReviewLink";
import AdminReviewLinks from "./pages/admin/AdminReviewLinks";
import Reviews from "./pages/admin/Reviews";

// Ana site sayfaları

import { AuthProvider, useAuth } from "./context/AuthContext";
import Newsletter from "./pages/admin/Newsletter";
import ChangePassword from "./pages/admin/ChangePassword";
import useGoogleAnalytics from "./hooks/useGoogleAnalytics";
import GoogleAnalytics from "./pages/admin/GoogleAnalytics";

// Dynamic imports
const Home = React.lazy(() => import("./pages/home/Home"));

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Layout({ children }) {
  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      <Footer />
    </>
  );
}

// ProtectedRoute component
function ProtectedRoute({ children }) {
  const { token, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!token) return <Navigate to="/admin/login" replace />;

  return children;
}
function AppContent() {
  const location = useLocation();

  // Eğer URL "/admin" ile başlıyorsa butonu gösterme
  const isAdminRoute = location.pathname.startsWith("/admin");
  useGoogleAnalytics("G-HR4MFDD6F7", !isAdminRoute);

  return (
    <>
      <ScrollToTop />
      <Toaster />

      {/* Sadece admin sayfası değilse göster */}
      {!isAdminRoute && <FloatingContactButton />}
      <Routes>
        {/* Ana site sayfaları */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        {/* Admin sayfaları */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/change-password" element={<ChangePassword />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/generate-review-link"
          element={
            <ProtectedRoute>
              <GenerateReviewLink />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/review-links"
          element={
            <ProtectedRoute>
              <AdminReviewLinks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reviews"
          element={
            <ProtectedRoute>
              <Reviews />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/newsletter"
          element={
            <ProtectedRoute>
              <Newsletter />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/analytics"
          element={
            <ProtectedRoute>
              <GoogleAnalytics />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}
