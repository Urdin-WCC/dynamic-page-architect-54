
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Index from '@/pages/Index';
import Home from '@/pages/Home';
import Blog from '@/pages/Blog';
import Portfolio from '@/pages/Portfolio';
import About from '@/pages/About';
import Services from '@/pages/Services';
import Contact from '@/pages/Contact';
import AdminLayout from '@/components/layout/AdminLayout';
import Dashboard from '@/pages/admin/Dashboard';
import BlogManager from '@/pages/admin/BlogManager';
import PortfolioManager from '@/pages/admin/PortfolioManager';
import ContentManager from '@/pages/admin/ContentManager';
import ThemeSettings from '@/pages/admin/ThemeSettings';
import SecuritySettings from '@/pages/admin/SecuritySettings';
import Login from '@/pages/admin/Login';
import Register from '@/pages/admin/Register';
import NotFound from '@/pages/NotFound';
import BlogEditor from '@/pages/admin/BlogEditor';
import PortfolioEditor from '@/pages/admin/PortfolioEditor';
import { useAuth } from '@/contexts/AuthContext';
import HeaderEditor from '@/pages/admin/HeaderEditor';
import FooterEditor from '@/pages/admin/FooterEditor';
import HomeEditor from '@/pages/admin/HomeEditor';
import SidebarEditor from '@/pages/admin/SidebarEditor';
import ServiceEditor from '@/pages/admin/ServiceEditor';
import AboutEditor from '@/pages/admin/AboutEditor';
import UserManager from '@/pages/admin/UserManager';
import LogoSettings from '@/pages/admin/LogoSettings';

// Protected Route component to check authentication
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  
  // While auth is being checked, show nothing or loading
  if (loading) {
    return <div className="flex h-screen justify-center items-center">Cargando...</div>;
  }
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      
      {/* Auth Routes */}
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin/register" element={<Register />} />
      
      {/* Admin Routes */}
      <Route path="/admin" element={
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="blog" element={<BlogManager />} />
        <Route path="blog/new" element={<BlogEditor />} />
        <Route path="blog/edit/:id" element={<BlogEditor />} />
        <Route path="portfolio" element={<PortfolioManager />} />
        <Route path="portfolio/new" element={<PortfolioEditor />} />
        <Route path="portfolio/edit/:id" element={<PortfolioEditor />} />
        <Route path="content" element={<ContentManager />} />
        <Route path="content/header" element={<HeaderEditor />} />
        <Route path="content/footer" element={<FooterEditor />} />
        <Route path="content/home" element={<HomeEditor />} />
        <Route path="content/sidebar" element={<SidebarEditor />} />
        <Route path="content/services" element={<ServiceEditor />} />
        <Route path="content/about" element={<AboutEditor />} />
        <Route path="theme" element={<ThemeSettings />} />
        <Route path="theme/logo" element={<LogoSettings />} />
        <Route path="security" element={<SecuritySettings />} />
        <Route path="security/users" element={<UserManager />} />
      </Route>
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
