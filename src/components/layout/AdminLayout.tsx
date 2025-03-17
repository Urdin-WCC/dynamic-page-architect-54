
import { useState, useEffect } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { BookText, LayoutDashboard, LogOut, PanelLeft, Palette, Settings, Shield, Image } from 'lucide-react';
import { cn } from '@/lib/utils';

const AdminLayout = () => {
  const { isAuthenticated, user, logout, hasPermission } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const navItems = [
    { 
      name: 'Dashboard', 
      href: '/admin', 
      icon: <LayoutDashboard size={20} />,
      exact: true,
      roles: ['master', 'admin', 'editor', 'writer']
    },
    { 
      name: 'Blog', 
      href: '/admin/blog', 
      icon: <BookText size={20} />,
      roles: ['master', 'admin', 'editor', 'writer']
    },
    { 
      name: 'Portafolio', 
      href: '/admin/portfolio', 
      icon: <Image size={20} />,
      roles: ['master', 'admin', 'editor', 'writer']
    },
    { 
      name: 'Contenido', 
      href: '/admin/content', 
      icon: <PanelLeft size={20} />,
      roles: ['master', 'admin', 'editor']
    },
    { 
      name: 'Tema y Ajustes', 
      href: '/admin/theme', 
      icon: <Palette size={20} />,
      roles: ['master', 'admin']
    },
    { 
      name: 'Seguridad', 
      href: '/admin/security', 
      icon: <Shield size={20} />,
      roles: ['master', 'admin']
    }
  ];

  const isActive = (path: string, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <div className="min-h-screen bg-secondary/20">
      {/* Admin Header */}
      <header className="bg-background border-b sticky top-0 z-10">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="font-medium flex items-center">
              <span className="h-8 w-8 bg-primary rounded mr-2"></span>
              Urdin Art
            </Link>
            <span className="text-sm text-muted-foreground">Panel de Administración</span>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm mr-2">
              {user?.name} <span className="text-muted-foreground">({user?.role})</span>
            </span>
            <Button variant="ghost" size="icon" onClick={() => logout()} title="Cerrar sesión">
              <LogOut size={18} />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Admin Sidebar */}
        <aside className={cn(
          "bg-background border-r h-[calc(100vh-4rem)] sticky top-16 transition-all duration-300 overflow-y-auto",
          sidebarOpen ? "w-64" : "w-16"
        )}>
          <nav className="p-2">
            <ul className="space-y-1">
              {navItems.map((item) => 
                hasPermission(item.roles) && (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                        isActive(item.href, item.exact) 
                          ? "bg-primary text-primary-foreground" 
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      )}
                    >
                      {item.icon}
                      {sidebarOpen && <span>{item.name}</span>}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </nav>
        </aside>

        {/* Admin Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
