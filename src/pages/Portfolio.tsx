
import { useState } from 'react';
import { Search } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const categories = [
  "Todos",
  "Diseño Web",
  "E-commerce",
  "Branding",
  "UX/UI"
];

const Portfolio = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');
  
  const filteredProjects = portfolioProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'Todos' || project.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <PageLayout showSidebar={false}>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Portafolio</h1>
        
        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-8">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className="transition-all"
              >
                {category}
              </Button>
            ))}
          </div>
          
          {/* Search Bar */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Buscar proyectos..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <PortfolioCard 
                key={index}
                title={project.title}
                description={project.description}
                category={project.category}
                index={index}
              />
            ))
          ) : (
            <div className="col-span-3 text-center py-16">
              <p className="text-muted-foreground">No se encontraron proyectos que coincidan con tu búsqueda.</p>
              <div className="flex justify-center gap-2 mt-4">
                <Button 
                  variant="ghost" 
                  onClick={() => setSearchQuery('')}
                >
                  Limpiar búsqueda
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => setActiveCategory('Todos')}
                >
                  Ver todas las categorías
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

const PortfolioCard = ({ 
  title, 
  description, 
  category,
  index
}: { 
  title: string; 
  description: string; 
  category: string;
  index: number;
}) => {
  return (
    <article 
      className={cn(
        "group border border-border rounded-lg overflow-hidden bg-card hover:shadow-elevation transition-all",
        "animate-fade-in-up"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="aspect-square bg-muted flex items-center justify-center relative group-hover:opacity-90 transition-opacity">
        <span className="text-sm text-muted-foreground">Imagen del proyecto</span>
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button variant="secondary" size="sm">Ver proyecto</Button>
        </div>
      </div>
      <div className="p-4">
        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
          {category}
        </div>
        <h2 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </article>
  );
};

const portfolioProjects = [
  {
    title: "Portal Corporativo",
    description: "Rediseño completo del sitio web corporativo con un enfoque en UX y rendimiento.",
    category: "Diseño Web"
  },
  {
    title: "Tienda Online Artesanal",
    description: "Plataforma e-commerce para productos artesanales con sistema de pagos y gestión de pedidos.",
    category: "E-commerce"
  },
  {
    title: "Identidad Visual Studio",
    description: "Desarrollo de marca completo incluyendo logotipo, paleta de colores y guía de estilo.",
    category: "Branding"
  },
  {
    title: "App de Gestión de Tareas",
    description: "Diseño de interfaz para aplicación móvil de productividad con múltiples vistas y opciones de personalización.",
    category: "UX/UI"
  },
  {
    title: "Catálogo Digital",
    description: "Catálogo interactivo para empresa de mobiliario con visualización 3D de productos.",
    category: "Diseño Web"
  },
  {
    title: "Marketplace de Artistas",
    description: "Plataforma para compra-venta de obras de arte con perfiles de artista y sistema de subastas.",
    category: "E-commerce"
  }
];

export default Portfolio;
