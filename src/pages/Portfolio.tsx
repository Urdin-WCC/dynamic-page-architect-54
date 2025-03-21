
import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowRightIcon } from 'lucide-react';

// Mock projects data
const projects = [
  {
    id: '1',
    title: 'Diseño web para restaurante',
    description: 'Rediseño completo del sitio web para un restaurante local con reservas online y menú digital.',
    category: 'Diseño Web',
    date: '2023-06-15',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    client: 'Restaurante La Buena Mesa',
  },
  {
    id: '2',
    title: 'Identidad corporativa para startup',
    description: 'Desarrollo de marca completa incluyendo logo, papelería, guía de estilo y aplicaciones digitales.',
    category: 'Branding',
    date: '2023-05-22',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    client: 'TechStart Inc.',
  },
  {
    id: '3',
    title: 'App móvil para tienda online',
    description: 'Diseño y desarrollo de aplicación móvil para tienda de ropa con carrito de compras y pagos integrados.',
    category: 'Desarrollo Móvil',
    date: '2023-04-10',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    client: 'ModaExpress',
  },
  {
    id: '4',
    title: 'Campaña publicitaria para evento',
    description: 'Diseño de material gráfico para evento cultural incluyendo carteles, flyers y contenido para redes sociales.',
    category: 'Marketing',
    date: '2023-03-28',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    client: 'Festival Cultural Ciudad',
  },
  {
    id: '5',
    title: 'E-commerce para productos artesanales',
    description: 'Plataforma de comercio electrónico para artesanos locales con múltiples vendedores y sistema de pagos.',
    category: 'E-commerce',
    date: '2023-02-15',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    client: 'Artesanías Unidas',
  },
  {
    id: '6',
    title: 'Rediseño UX para aplicación bancaria',
    description: 'Mejora de la experiencia de usuario para aplicación bancaria, simplificando flujos y aumentando conversión.',
    category: 'UX/UI',
    date: '2023-01-10',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    client: 'Banco Nacional',
  },
];

// Unique categories
const categories = ['Todos', ...Array.from(new Set(projects.map(project => project.category)))];

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  
  const filteredProjects = selectedCategory === 'Todos' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <PageLayout>
      <div className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Nuestro Portfolio</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubre algunos de nuestros mejores trabajos en diseño, desarrollo y marketing.
            Cada proyecto refleja nuestra pasión por la creación y la innovación.
          </p>
        </div>

        <Tabs defaultValue="Todos" className="w-full mb-12">
          <div className="flex justify-center">
            <TabsList className="grid grid-flow-col auto-cols-max gap-2">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  onClick={() => setSelectedCategory(category)}
                  className="px-4"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden group">
              <div className="relative h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-white text-primary hover:bg-gray-100">
                    {project.category}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-5">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {project.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">
                    Cliente: {project.client}
                  </span>
                  <Button variant="ghost" size="sm" className="group-hover:text-primary transition-colors">
                    Ver detalles <ArrowRightIcon className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No hay proyectos en esta categoría.</p>
          </div>
        )}

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-6">¿Listo para comenzar tu proyecto?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Nos encantaría escuchar tu idea y ayudarte a hacerla realidad. 
            Contáctanos para una consulta gratuita.
          </p>
          <Button size="lg" className="px-8">
            Contactar ahora
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default Portfolio;
