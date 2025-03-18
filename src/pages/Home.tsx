
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, Code, Globe, PenTool, Search, Server } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Home = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl">
          <div className="space-y-4 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Diseño web moderno y efectivo
            </h1>
            <p className="text-xl text-muted-foreground">
              Creamos experiencias digitales atractivas y funcionales que impulsan el crecimiento de tu negocio.
            </p>
            <div className="pt-4 flex gap-4">
              <Link to="/contact">
                <Button className="group">
                  Contactar ahora 
                  <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/portfolio">
                <Button variant="outline" className="group">
                  Ver portfolio
                  <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 border-t border-border">
        <h2 className="text-2xl md:text-3xl font-bold mb-12">Nuestros servicios</h2>
        
        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard 
              key={index} 
              title={service.title} 
              description={service.description} 
              icon={service.icon}
              index={index} 
            />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/services">
            <Button variant="outline" className="group">
              Ver todos los servicios
              <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-16 border-t border-border">
        <h2 className="text-2xl md:text-3xl font-bold mb-12">Trabajos recientes</h2>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {portfolioItems.map((item, index) => (
            <PortfolioCard 
              key={index} 
              title={item.title} 
              category={item.category} 
              index={index} 
            />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/portfolio">
            <Button variant="outline" className="group">
              Ver portafolio completo
              <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-16 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Sobre Nosotros</h2>
            <p className="text-muted-foreground mb-6">
              Somos un estudio de diseño y desarrollo web fundado en 2020, especializado en 
              crear experiencias digitales excepcionales. Nuestro equipo multidisciplinar 
              combina creatividad y tecnología para transformar ideas en soluciones digitales efectivas.
            </p>
            <Link to="/about">
              <Button variant="outline" className="group">
                Conoce nuestro equipo
                <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
          <div className="bg-muted rounded-lg flex items-center justify-center h-80">
            <span className="text-muted-foreground">Imagen del equipo</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 border-t border-border">
        <div className="bg-secondary rounded-xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">¿Listo para empezar tu proyecto?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Contacta con nosotros para discutir cómo podemos ayudarte a alcanzar tus objetivos digitales.
          </p>
          <Link to="/contact">
            <Button size="lg" className="group">
              Contactar ahora
              <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </section>
    </PageLayout>
  );
};

const ServiceCard = ({ title, description, icon, index }: { title: string; description: string; icon: React.ReactNode; index: number }) => {
  return (
    <div 
      className={cn(
        "p-6 rounded-lg border border-border bg-card hover:shadow-elevation transition-all",
        "animate-fade-in-up",
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="text-primary mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const PortfolioCard = ({ title, category, index }: { title: string; category: string; index: number }) => {
  return (
    <div 
      className={cn(
        "group rounded-lg overflow-hidden border border-border bg-card",
        "animate-fade-in-up",
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="aspect-video bg-muted flex items-center justify-center">
        <span className="text-sm text-muted-foreground">Imagen del proyecto</span>
      </div>
      <div className="p-4">
        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
          {category}
        </div>
        <h3 className="font-semibold group-hover:text-primary transition-colors">{title}</h3>
      </div>
    </div>
  );
};

const services = [
  {
    title: "Diseño Web",
    description: "Diseños atractivos y funcionales que conectan con tu audiencia y representan tu marca.",
    icon: <Globe size={36} />
  },
  {
    title: "Desarrollo Frontend",
    description: "Interfaces modernas con animaciones fluidas y experiencia de usuario optimizada.",
    icon: <Code size={36} />
  },
  {
    title: "Diseño UX/UI",
    description: "Experiencias de usuario cuidadosamente diseñadas para maximizar la usabilidad.",
    icon: <PenTool size={36} />
  },
  {
    title: "Desarrollo Backend",
    description: "Soluciones robustas que potencian la funcionalidad de tu sitio web.",
    icon: <Server size={36} />
  },
  {
    title: "SEO & Marketing",
    description: "Estrategias para mejorar tu visibilidad en los motores de búsqueda y atraer tráfico.",
    icon: <Search size={36} />
  },
  {
    title: "Consultoría Digital",
    description: "Asesoramiento estratégico para optimizar tu presencia digital y alcanzar tus objetivos.",
    icon: <Briefcase size={36} />
  }
];

const portfolioItems = [
  {
    title: "Rediseño Corporativo",
    category: "Diseño Web"
  },
  {
    title: "Tienda Online",
    category: "E-commerce"
  },
  {
    title: "App de Gestión",
    category: "Desarrollo"
  },
  {
    title: "Identidad de Marca",
    category: "Branding"
  },
  {
    title: "Plataforma Educativa",
    category: "Web App"
  },
  {
    title: "Portal de Noticias",
    category: "Contenidos"
  }
];

export default Home;
