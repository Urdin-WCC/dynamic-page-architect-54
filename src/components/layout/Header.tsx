
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

const navItems = [
  { name: 'Inicio', href: '/' },
  { name: 'Servicios', href: '/services' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Blog', href: '/blog' },
  { name: 'Sobre nosotros', href: '/about' },
  { name: 'Contacto', href: '/contact' },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  // Add scroll event listener to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header 
      className={cn(
        "w-full bg-white sticky top-0 z-50 transition-all duration-300", 
        scrolled ? "shadow-md py-2" : "shadow-subtle py-4"
      )}
    >
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center">
            <span className="h-10 w-10 bg-primary rounded"></span>
            <span className="ml-3 font-display text-xl font-medium">Urdin Art</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "text-sm font-medium hover:text-primary transition-colors relative py-1",
                isActive(item.href)
                  ? "text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary"
                  : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
          
          {isAuthenticated ? (
            <Link
              to="/admin"
              className="text-xs bg-primary text-white hover:bg-primary/90 px-3 py-2 rounded-md transition-colors"
            >
              Panel Admin
            </Link>
          ) : (
            <Link
              to="/admin/login"
              className="text-xs text-muted-foreground hover:text-primary transition-colors ml-4"
            >
              Iniciar sesión
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={cn(
          "md:hidden bg-white border-t border-border overflow-hidden transition-all duration-300 ease-in-out",
          mobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="container py-4 flex flex-col space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "text-sm py-2 px-3 hover:bg-secondary rounded-md transition-colors",
                isActive(item.href)
                  ? "bg-secondary text-primary font-medium"
                  : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
          
          {isAuthenticated ? (
            <Link
              to="/admin"
              className="text-sm py-2 px-3 bg-primary text-white hover:bg-primary/90 rounded-md transition-colors mt-2"
            >
              Panel de Administración
            </Link>
          ) : (
            <Link
              to="/admin/login"
              className="text-sm py-2 px-3 text-muted-foreground hover:bg-secondary rounded-md transition-colors"
            >
              Iniciar sesión
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
