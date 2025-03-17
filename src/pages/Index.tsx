
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
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
          {[1, 2, 3].map((item) => (
            <div key={item} className="group relative overflow-hidden rounded-lg">
              <div className="h-72 bg-muted/50 flex items-center justify-center">
                <span className="text-3xl font-bold text-muted-foreground/30">Proyecto {item}</span>
              </div>
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="outline" className="text-white border-white">Ver detalles</Button>
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
              { title: "Diseño Web", description: "Sitios web modernos y atractivos" },
              { title: "Diseño Gráfico", description: "Identidad visual y branding" },
              { title: "Desarrollo Frontend", description: "Interfaces interactivas y responsivas" },
              { title: "Marketing Digital", description: "Estrategias para aumentar su visibilidad" }
            ].map((service, idx) => (
              <div key={idx} className="p-6 bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow">
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
          <Button variant="secondary" size="lg">Contactar</Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
