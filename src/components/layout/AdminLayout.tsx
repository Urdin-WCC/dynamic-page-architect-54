import { useState, useEffect } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  BookText, 
  LayoutDashboard, 
  LogOut, 
  PanelLeft, 
  Palette, 
  Settings, 
  Shield, 
  Image, 
  Users, 
  Home, 
  SquareMenu,
  Menu,
  ArrowDown,
  FileImage,
  Info
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from 'lucide-react';

const AdminLayout = () => {
  const { isAuthenticated, user, logout, hasPermission, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { toast } = useToast();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    content: false,
    theme: false,
    security: false
  });

  useEffect(() => {
    // Redirigir si no está autenticado
    if (!loading && !isAuthenticated) {
      navigate('/admin/login');
    }

    // Abrir automáticamente el grupo correspondiente a la ruta actual
    const path = location.pathname;
    if (path.includes('/admin/content')) {
      setOpenGroups(prev => ({ ...prev, content: true }));
    } else if (path.includes('/admin/theme')) {
      setOpenGroups(prev => ({ ...prev, theme: true }));
    } else if (path.includes('/admin/security')) {
      setOpenGroups(prev => ({ ...prev, security: true }));
    }
  }, [isAuthenticated, navigate, loading, location.pathname]);

  // Mientras verifica la autenticación, mostrar un indicador de carga
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // Si no está autenticado después de cargar, no mostrar nada (ya redirigirá)
  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = async () => {
    await logout();
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente"
    });
    navigate('/admin/login');
  };

  const toggleGroup = (group: string) => {
    setOpenGroups(prev => ({
      ...prev,
      [group]: !prev[group]
    }));
  };

  const isActive = (path: string, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const mainNavItems = [
    { 
      name: 'Dashboard', 
      href: '/admin', 
      icon: <LayoutDashboard size={20} />,
      exact: true,
      roles: ['master', 'admin', 'editor', 'writer'] as UserRole[]
    },
    { 
      name: 'Blog', 
      href: '/admin/blog', 
      icon: <BookText size={20} />,
      roles: ['master', 'admin', 'editor', 'writer'] as UserRole[]
    },
    { 
      name: 'Portafolio', 
      href: '/admin/portfolio', 
      icon: <Image size={20} />,
      roles: ['master', 'admin', 'editor', 'writer'] as UserRole[]
    }
  ];

  const contentItems = [
    { 
      name: 'General', 
      href: '/admin/content', 
      icon: <PanelLeft size={18} />,
      roles: ['master', 'admin', 'editor'] as UserRole[]
    },
    { 
      name: 'Página de Inicio', 
      href: '/admin/content/home', 
      icon: <Home size={18} />,
      roles: ['master', 'admin', 'editor'] as UserRole[]
    },
    { 
      name: 'Servicios', 
      href: '/admin/content/services', 
      icon: <Settings size={18} />,
      roles: ['master', 'admin', 'editor'] as UserRole[]
    },
    { 
      name: 'Sobre Nosotros', 
      href: '/admin/content/about', 
      icon: <Info size={18} />,
      roles: ['master', 'admin', 'editor'] as UserRole[]
    },
    { 
      name: 'Cabecera', 
      href: '/admin/content/header', 
      icon: <SquareMenu size={18} />,
      roles: ['master', 'admin', 'editor'] as UserRole[]
    },
    { 
      name: 'Barra Lateral', 
      href: '/admin/content/sidebar', 
      icon: <Menu size={18} />,
      roles: ['master', 'admin', 'editor'] as UserRole[]
    },
    { 
      name: 'Pie de Página', 
      href: '/admin/content/footer', 
      icon: <ArrowDown size={18} />,
      roles: ['master', 'admin', 'editor'] as UserRole[]
    }
  ];

  const themeItems = [
    { 
      name: 'Ajustes de Tema', 
      href: '/admin/theme', 
      icon: <Palette size={18} />,
      roles: ['master', 'admin'] as UserRole[]
    },
    { 
      name: 'Logo y Favicon', 
      href: '/admin/theme/logo', 
      icon: <FileImage size={18} />,
      roles: ['master', 'admin'] as UserRole[]
    }
  ];

  const securityItems = [
    { 
      name: 'Seguridad', 
      href: '/admin/security', 
      icon: <Shield size={18} />,
      roles: ['master', 'admin'] as UserRole[]
    },
    { 
      name: 'Gestión de Usuarios', 
      href: '/admin/security/users', 
      icon: <Users size={18} />,
      roles: ['master', 'admin'] as UserRole[]
    }
  ];

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
              {user?.full_name} <span className="text-muted-foreground">({user?.role})</span>
            </span>
            <Button variant="ghost" size="icon" onClick={handleLogout} title="Cerrar sesión">
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
              {/* Main Navigation Items */}
              {mainNavItems.map((item) => 
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

              {/* Content Management */}
              {hasPermission(['master', 'admin', 'editor'] as UserRole[]) && (
                <li>
                  <Collapsible 
                    open={openGroups.content} 
                    onOpenChange={() => toggleGroup('content')}
                    className="w-full"
                  >
                    <CollapsibleTrigger className={cn(
                      "flex items-center justify-between w-full px-3 py-2 rounded-md text-sm transition-colors",
                      isActive('/admin/content') 
                        ? "bg-primary/10 text-primary" 
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}>
                      <div className="flex items-center gap-3">
                        <PanelLeft size={20} />
                        {sidebarOpen && <span>Gestión de Contenido</span>}
                      </div>
                      {sidebarOpen && (
                        openGroups.content ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                      )}
                    </CollapsibleTrigger>
                    {sidebarOpen && (
                      <CollapsibleContent className="pl-3 space-y-1 mt-1">
                        {contentItems.map((item) => 
                          hasPermission(item.roles) && (
                            <Link
                              key={item.href}
                              to={item.href}
                              className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                                isActive(item.href, item.href === '/admin/content') 
                                  ? "bg-primary text-primary-foreground" 
                                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                              )}
                            >
                              {item.icon}
                              <span>{item.name}</span>
                            </Link>
                          )
                        )}
                      </CollapsibleContent>
                    )}
                  </Collapsible>
                </li>
              )}

              {/* Theme Management */}
              {hasPermission(['master', 'admin'] as UserRole[]) && (
                <li>
                  <Collapsible 
                    open={openGroups.theme} 
                    onOpenChange={() => toggleGroup('theme')}
                    className="w-full"
                  >
                    <CollapsibleTrigger className={cn(
                      "flex items-center justify-between w-full px-3 py-2 rounded-md text-sm transition-colors",
                      isActive('/admin/theme') 
                        ? "bg-primary/10 text-primary" 
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}>
                      <div className="flex items-center gap-3">
                        <Palette size={20} />
                        {sidebarOpen && <span>Tema y Diseño</span>}
                      </div>
                      {sidebarOpen && (
                        openGroups.theme ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                      )}
                    </CollapsibleTrigger>
                    {sidebarOpen && (
                      <CollapsibleContent className="pl-3 space-y-1 mt-1">
                        {themeItems.map((item) => 
                          hasPermission(item.roles) && (
                            <Link
                              key={item.href}
                              to={item.href}
                              className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                                isActive(item.href, item.href === '/admin/theme') 
                                  ? "bg-primary text-primary-foreground" 
                                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                              )}
                            >
                              {item.icon}
                              <span>{item.name}</span>
                            </Link>
                          )
                        )}
                      </CollapsibleContent>
                    )}
                  </Collapsible>
                </li>
              )}

              {/* Security Management */}
              {hasPermission(['master', 'admin'] as UserRole[]) && (
                <li>
                  <Collapsible 
                    open={openGroups.security} 
                    onOpenChange={() => toggleGroup('security')}
                    className="w-full"
                  >
                    <CollapsibleTrigger className={cn(
                      "flex items-center justify-between w-full px-3 py-2 rounded-md text-sm transition-colors",
                      isActive('/admin/security') 
                        ? "bg-primary/10 text-primary" 
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}>
                      <div className="flex items-center gap-3">
                        <Shield size={20} />
                        {sidebarOpen && <span>Seguridad</span>}
                      </div>
                      {sidebarOpen && (
                        openGroups.security ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                      )}
                    </CollapsibleTrigger>
                    {sidebarOpen && (
                      <CollapsibleContent className="pl-3 space-y-1 mt-1">
                        {securityItems.map((item) => 
                          hasPermission(item.roles) && (
                            <Link
                              key={item.href}
                              to={item.href}
                              className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                                isActive(item.href, item.href === '/admin/security') 
                                  ? "bg-primary text-primary-foreground" 
                                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                              )}
                            >
                              {item.icon}
                              <span>{item.name}</span>
                            </Link>
                          )
                        )}
                      </CollapsibleContent>
                    )}
                  </Collapsible>
                </li>
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
