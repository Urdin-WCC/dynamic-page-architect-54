
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  NavigationMenu, 
  NavigationMenuList, 
  NavigationMenuItem, 
  NavigationMenuLink,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { Brush, Code, Search, Send } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Header with Navigation */}
      <header className="container py-4 border-b">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold flex items-center gap-2">
            Urdin Art
          </Link>
          
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Inicio
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/portfolio">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Portafolio
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/blog">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Blog
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/contact">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Contacto
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Urdin Art Studio
          </h1>
          <p className="text-xl text-muted-foreground">
            Creamos experiencias digitales inolvidables con un enfoque en el arte y la innovación
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button asChild size="lg">
              <Link to="/portfolio">Ver Portafolio</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/blog">Leer Blog</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="container py-20 space-y-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Trabajos Destacados</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Exploramos nuevas formas de comunicar a través del diseño y la tecnología
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Portal Corporativo",
              image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
              category: "Diseño Web"
            },
            {
              title: "Tienda de Artesanías",
              image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
              category: "E-commerce"
            },
            {
              title: "App de Gestión",
              image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
              category: "Desarrollo"
            }
          ].map((item, index) => (
            <div key={index} className="group relative overflow-hidden rounded-lg">
              <div className="h-72 bg-muted/50 flex items-center justify-center">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity p-6">
                <span className="text-xs font-medium text-primary-foreground bg-primary px-2 py-1 rounded mb-2">
                  {item.category}
                </span>
                <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                <Button variant="outline" className="text-white border-white">
                  Ver detalles
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="bg-muted/30 py-20">
        <div className="container space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Nuestros Servicios</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ofrecemos soluciones completas adaptadas a sus necesidades
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                title: "Diseño Web", 
                description: "Sitios web modernos y atractivos",
                icon: <Brush className="h-10 w-10 text-primary mb-4" />
              },
              { 
                title: "Diseño Gráfico", 
                description: "Identidad visual y branding",
                icon: <Search className="h-10 w-10 text-primary mb-4" />
              },
              { 
                title: "Desarrollo Frontend", 
                description: "Interfaces interactivas y responsivas",
                icon: <Code className="h-10 w-10 text-primary mb-4" />
              },
              { 
                title: "Marketing Digital", 
                description: "Estrategias para aumentar su visibilidad",
                icon: <Send className="h-10 w-10 text-primary mb-4" />
              }
            ].map((service, idx) => (
              <div key={idx} className="p-6 bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
                {service.icon}
                <h3 className="text-xl font-medium mb-2">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-20">
        <div className="bg-primary text-primary-foreground rounded-xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para comenzar su proyecto?</h2>
          <p className="mb-6 max-w-lg mx-auto">
            Contáctenos hoy mismo para discutir sus ideas y cómo podemos ayudarle a llevarlas a cabo.
          </p>
          <Button variant="secondary" size="lg" asChild>
            <Link to="/contact">Contactar</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Urdin Art Studio</h3>
              <p className="text-muted-foreground">
                Creando experiencias digitales desde 2020.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Enlaces</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-muted-foreground hover:text-primary">Inicio</Link></li>
                <li><Link to="/portfolio" className="text-muted-foreground hover:text-primary">Portafolio</Link></li>
                <li><Link to="/blog" className="text-muted-foreground hover:text-primary">Blog</Link></li>
                <li><Link to="/contact" className="text-muted-foreground hover:text-primary">Contacto</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Servicios</h3>
              <ul className="space-y-2">
                <li><span className="text-muted-foreground">Diseño Web</span></li>
                <li><span className="text-muted-foreground">Diseño Gráfico</span></li>
                <li><span className="text-muted-foreground">Desarrollo Frontend</span></li>
                <li><span className="text-muted-foreground">Marketing Digital</span></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Contacto</h3>
              <address className="not-italic text-muted-foreground">
                <p>Ciudad, País</p>
                <p>info@urdinart.com</p>
                <p>+34 123 456 789</p>
              </address>
            </div>
          </div>
          
          <div className="border-t mt-12 pt-6 text-center text-muted-foreground">
            <p>&copy; 2023 Urdin Art Studio. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
