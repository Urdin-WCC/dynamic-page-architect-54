
import { useState } from 'react';
import { Search } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageLayout showSidebar={false}>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Blog</h1>
        
        {/* Search Bar */}
        <div className="relative mb-12">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Buscar artículos..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Blog Posts Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <BlogPostCard 
                key={index}
                title={post.title}
                date={post.date}
                excerpt={post.excerpt}
                category={post.category}
                index={index}
              />
            ))
          ) : (
            <div className="col-span-2 text-center py-16">
              <p className="text-muted-foreground">No se encontraron artículos que coincidan con tu búsqueda.</p>
              <Button 
                variant="ghost" 
                className="mt-4"
                onClick={() => setSearchQuery('')}
              >
                Limpiar búsqueda
              </Button>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

const BlogPostCard = ({ 
  title, 
  date, 
  excerpt, 
  category,
  index 
}: { 
  title: string; 
  date: string; 
  excerpt: string; 
  category: string;
  index: number;
}) => {
  return (
    <article 
      className={cn(
        "border border-border rounded-lg overflow-hidden bg-card hover:shadow-elevation transition-all",
        "animate-fade-in-up"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="aspect-video bg-muted flex items-center justify-center">
        <span className="text-sm text-muted-foreground">Imagen del artículo</span>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-medium px-2 py-1 bg-secondary rounded text-muted-foreground">
            {category}
          </span>
          <time className="text-xs text-muted-foreground">{date}</time>
        </div>
        <h2 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">{title}</h2>
        <p className="text-muted-foreground text-sm mb-4">{excerpt}</p>
        <Button variant="link" className="p-0 h-auto text-primary">Leer más</Button>
      </div>
    </article>
  );
};

const blogPosts = [
  {
    title: "Principios de Diseño Web Moderno",
    date: "15 Jun 2023",
    excerpt: "Explora los fundamentos del diseño web contemporáneo y cómo aplicarlos en tus proyectos para crear experiencias memorables.",
    category: "Diseño Web"
  },
  {
    title: "Optimización SEO para Principiantes",
    date: "23 May 2023",
    excerpt: "Guía básica para mejorar el posicionamiento de tu sitio web en los motores de búsqueda sin conocimientos técnicos avanzados.",
    category: "SEO"
  },
  {
    title: "El Futuro del Comercio Electrónico",
    date: "10 Abr 2023",
    excerpt: "Análisis de las tendencias emergentes en e-commerce y cómo preparar tu negocio para los cambios que se avecinan.",
    category: "E-commerce"
  },
  {
    title: "Animaciones Web con CSS y JavaScript",
    date: "02 Mar 2023",
    excerpt: "Técnicas prácticas para implementar animaciones fluidas y atractivas que mejoren la experiencia de usuario.",
    category: "Desarrollo"
  }
];

export default Blog;
