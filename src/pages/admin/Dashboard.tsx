
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { LineChart, BarChart, Users, BookOpen, Layout, Image, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  const { user } = useAuth();
  
  const stats = [
    { title: "Publicaciones Blog", value: "24", icon: <BookOpen className="h-5 w-5" />, href: "/admin/blog" },
    { title: "Elementos Portfolio", value: "16", icon: <Image className="h-5 w-5" />, href: "/admin/portfolio" },
    { title: "Secciones", value: "8", icon: <Layout className="h-5 w-5" />, href: "/admin/content" },
    { title: "Usuarios", value: "5", icon: <Users className="h-5 w-5" />, href: "/admin/security" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Bienvenido, {user?.full_name}. Aquí podrás gestionar todo el contenido de tu sitio.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Link key={index} to={stat.href}>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className="text-muted-foreground">{stat.icon}</div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Visitas</CardTitle>
            <CardDescription>Últimos 30 días</CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <LineChart size={100} className="text-muted-foreground/20" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Contenido por sección</CardTitle>
            <CardDescription>Total de elementos</CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <BarChart size={100} className="text-muted-foreground/20" />
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Acciones rápidas</CardTitle>
          <CardDescription>Accede rápidamente a las funciones más utilizadas</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Link to="/admin/blog/new">
            <Button variant="outline" className="flex gap-2">
              <BookOpen className="h-4 w-4" />
              Crear publicación
            </Button>
          </Link>
          <Link to="/admin/portfolio/new">
            <Button variant="outline" className="flex gap-2">
              <Image className="h-4 w-4" />
              Añadir proyecto
            </Button>
          </Link>
          <Link to="/admin/theme">
            <Button variant="outline" className="flex gap-2">
              <Settings className="h-4 w-4" />
              Configurar tema
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
