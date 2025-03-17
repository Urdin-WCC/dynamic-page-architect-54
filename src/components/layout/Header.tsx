
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Inicio', href: '/' },
  { name: 'Blog', href: '/blog' },
  { name: 'Portafolio', href: '/portfolio' },
  { name: 'Sobre nosotros', href: '/about' },
  { name: 'Servicios', href: '/services' },
  { name: 'Contacto', href: '/contact' },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="w-full bg-white shadow-subtle sticky top-0 z-50">
      <div className="container flex items-center justify-between py-4">
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
                location.pathname === item.href
                  ? "text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary"
                  : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
          <Link
            to="/admin"
            className="text-xs text-muted-foreground hover:text-primary transition-colors ml-4"
          >
            Admin
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-border animate-fade-in">
          <div className="container py-4 flex flex-col space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "text-sm py-2 px-3 hover:bg-secondary rounded-md transition-colors",
                  location.pathname === item.href
                    ? "bg-secondary text-primary font-medium"
                    : "text-muted-foreground"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/admin"
              className="text-xs py-2 px-3 text-muted-foreground hover:bg-secondary rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Panel de Administración
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
