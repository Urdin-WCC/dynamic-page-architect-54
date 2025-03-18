
import React from 'react';
import { Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Index />} />
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
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="blog" element={<BlogManager />} />
        <Route path="blog/new" element={<BlogEditor />} />
        <Route path="blog/edit/:id" element={<BlogEditor />} />
        <Route path="portfolio" element={<PortfolioManager />} />
        <Route path="portfolio/new" element={<PortfolioEditor />} />
        <Route path="portfolio/edit/:id" element={<PortfolioEditor />} />
        <Route path="content" element={<ContentManager />} />
        <Route path="theme" element={<ThemeSettings />} />
        <Route path="security" element={<SecuritySettings />} />
      </Route>
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
