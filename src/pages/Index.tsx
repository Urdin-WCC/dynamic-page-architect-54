
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PageLayout from "@/components/layout/PageLayout";
import { ArrowRight, Briefcase, Code, LineChart, MessageSquare, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: <Code className="h-10 w-10 text-primary" />,
      title: "Diseño Web",
      description: "Diseño de páginas web modernas y atractivas para su negocio o proyecto personal.",
    },
    {
      icon: <LineChart className="h-10 w-10 text-primary" />,
      title: "Marketing Digital",
      description: "Estrategias de marketing digital para aumentar la visibilidad de su marca en internet.",
    },
    {
      icon: <Briefcase className="h-10 w-10 text-primary" />,
      title: "Consultoría",
      description: "Asesoramiento profesional para mejorar su presencia online y aumentar conversiones.",
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-primary" />,
      title: "Soporte",
      description: "Soporte técnico continuo para garantizar el correcto funcionamiento de su sitio web.",
    },
  ];

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="py-20">
        <div className="container">
          <div className="flex flex-col items-center text-center gap-8">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Soluciones digitales <span className="text-primary">creativas</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Diseño web moderno y desarrollo para empresas que buscan destacar en la era digital.
              Creamos experiencias únicas que conectan con su audiencia.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/servicios">Nuestros Servicios</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contacto">Contactar</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Nuestros Servicios</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ofrecemos soluciones completas para su presencia digital
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="mb-2">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-foreground/70">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button variant="outline" asChild>
              <Link to="/servicios" className="group">
                Ver todos los servicios
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Sobre Urdin Art</h2>
              <p className="text-muted-foreground mb-6">
                Somos un equipo de profesionales apasionados por el diseño web y el marketing digital. 
                Nuestra misión es ayudar a empresas y emprendedores a destacar en el mundo digital con 
                soluciones creativas y efectivas.
              </p>
              <p className="text-muted-foreground mb-6">
                Con años de experiencia en el sector, hemos trabajado con clientes de diversos tamaños 
                y sectores, adaptando nuestras soluciones a sus necesidades específicas.
              </p>
              <Button asChild>
                <Link to="/about">Conocer más</Link>
              </Button>
            </div>
            <div className="bg-muted rounded-lg h-80 flex items-center justify-center">
              <Users size={120} className="text-muted-foreground/30" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">¿Listo para dar el siguiente paso?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Contáctanos hoy mismo para discutir cómo podemos ayudarte a alcanzar tus objetivos digitales.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/contacto">Contactar ahora</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;
