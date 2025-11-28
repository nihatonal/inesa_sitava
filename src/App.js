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

//SEO
import SEO from './components/SEO.js';
import { seoData } from "./constants/seoData";

// Ana site sayfaları

import { AuthProvider, useAuth } from "./context/AuthContext";
import Newsletter from "./pages/admin/Newsletter";
import ChangePassword from "./pages/admin/ChangePassword";
import useGoogleAnalytics from "./hooks/useGoogleAnalytics";
import GoogleAnalytics from "./pages/admin/GoogleAnalytics";
import { useTranslation } from "react-i18next";

// Dynamic imports
const Home = React.lazy(() => import("./pages/home/Home"));
const About =React.lazy(()=>import("./pages/about/About.js"))
const CountryDetail = React.lazy(() => import("./pages/Destinations/CountryDetails.js"));
const Destinations = React.lazy(() => import("./pages/Destinations/Destinations.js"));
const Blogs = React.lazy(() => import("./pages/blogs/Blogs.js"))
const SingleBlogPage = React.lazy(() => import("./pages/blogs/SingleBlogPage.js"));
const Contact = React.lazy(() => import("./pages/contact/Contact.js"))
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

// SEO props
let seoProps;

function useSEO() {
  const { i18n } = useTranslation();
  const location = useLocation();

  const lang = i18n.language || "ru";
  const path = location.pathname;

  const seoProps =
    (seoData[lang] && seoData[lang][path]) || seoData["/404"];
  return seoProps;
}


function AppContent() {
  const location = useLocation();
  const seo = useSEO();
  // Dinamik SEO uygulanacak pathler
  const disableGlobalSEO =
    location.pathname.startsWith("/destinations/") ||
    location.pathname.startsWith("/blogs/") ||
    location.pathname.startsWith("/admin");


  // Eğer URL "/admin" ile başlıyorsa butonu gösterme
  const isAdminRoute = location.pathname.startsWith("/admin");
  useGoogleAnalytics("G-HR4MFDD6F7", !isAdminRoute);

  return (
    <>
      {/* Global SEO sadece dinamik olmayan sayfalarda uygulanır */}
      {!disableGlobalSEO && (
        <SEO
          title={seo.title}
          description={seo.description}
          jsonLD={seo.jsonLD}
        />
      )}
      <ScrollToTop />
      <Toaster />

      {/* Sadece admin sayfası değilse göster */}
      {!isAdminRoute && <FloatingContactButton />}
      <Routes>
        {/* Ana site sayfaları */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/destinations" element={<Layout><Destinations /></Layout>} />
        <Route path="/destinations/:cid" element={<Layout><CountryDetail /></Layout>} />
        <Route path="/blogs" element={<Layout><Blogs /></Layout>} />
        <Route path="/blogs/:bid" element={<Layout><SingleBlogPage /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />

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
