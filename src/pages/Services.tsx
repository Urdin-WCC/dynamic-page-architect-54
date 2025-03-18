
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Check, Code, Globe, Layout, Lightbulb, Palette, PenTool, Search, Server, Share2, ShoppingBag, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Services = () => {
  return (
    <PageLayout showSidebar={true}>
      {/* Hero Section */}
      <section className="py-12">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Nuestros Servicios</h1>
          <p className="text-xl text-muted-foreground">
            Ofrecemos soluciones digitales completas para ayudar a tu negocio a destacar y crecer en el mundo digital.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              features={service.features}
              index={index}
            />
          ))}
        </div>
      </section>
      
      {/* Process Section */}
      <section className="py-12 mt-8 border-t border-border">
        <h2 className="text-2xl font-semibold mb-8 text-center">Nuestro Proceso</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {process.map((step, index) => (
            <div key={index} className="text-center">
              <div className="bg-primary/10 text-primary h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">{index + 1}</span>
              </div>
              <h3 className="text-lg font-medium mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-12 border-t border-border">
        <h2 className="text-2xl font-semibold mb-8 text-center">Lo que dicen nuestros clientes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-card p-6 rounded-lg border border-border">
              <div className="flex mb-4 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p className="italic mb-4 text-muted-foreground">"{testimonial.text}"</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-muted rounded-full mr-3 flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">Foto</span>
                </div>
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-12 border-t border-border">
        <div className="bg-secondary rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">¿Listo para empezar tu proyecto?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Contáctanos hoy para discutir tus necesidades y cómo podemos ayudarte.
          </p>
          <Link to="/contact">
            <Button size="lg">Solicitar presupuesto</Button>
          </Link>
        </div>
      </section>
    </PageLayout>
  );
};

const ServiceCard = ({ title, description, icon, features, index }) => {
  return (
    <div 
      className={cn(
        "bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow",
        "animate-fade-in-up"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="text-primary mb-4">{icon}</div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const services = [
  {
    title: "Diseño Web",
    description: "Creamos sitios web atractivos y funcionales que representan tu marca y conectan con tu audiencia.",
    icon: <Layout size={36} />,
    features: [
      "Diseño personalizado y adaptado a tu marca",
      "Experiencia de usuario optimizada",
      "Adaptación a todos los dispositivos",
      "Páginas de aterrizaje que convierten"
    ]
  },
  {
    title: "Desarrollo Frontend",
    description: "Implementamos interfaces modernas con código limpio y optimizado para una experiencia fluida.",
    icon: <Code size={36} />,
    features: [
      "Tecnologías modernas (React, Vue, etc.)",
      "Rendimiento optimizado",
      "Animaciones fluidas",
      "Integración perfecta con CMS"
    ]
  },
  {
    title: "Desarrollo Backend",
    description: "Construimos sistemas robustos que potencian tu sitio web con funcionalidades avanzadas.",
    icon: <Server size={36} />,
    features: [
      "Arquitectura escalable",
      "Bases de datos optimizadas",
      "APIs seguras y bien documentadas",
      "Sistemas de autenticación robustos"
    ]
  },
  {
    title: "Diseño de Identidad",
    description: "Desarrollamos la identidad visual de tu marca para que destaque en el mercado.",
    icon: <Palette size={36} />,
    features: [
      "Diseño de logotipos",
      "Paletas de colores",
      "Guías de estilo de marca",
      "Material de papelería"
    ]
  },
  {
    title: "SEO & Marketing Digital",
    description: "Mejoramos tu visibilidad online y atraemos tráfico cualificado a tu sitio web.",
    icon: <Search size={36} />,
    features: [
      "Auditorías SEO completas",
      "Optimización on-page y off-page",
      "Estrategias de contenido",
      "Análisis de competencia"
    ]
  },
  {
    title: "Comercio Electrónico",
    description: "Construimos tiendas online potentes que generan ventas y ofrecen una experiencia de compra excepcional.",
    icon: <ShoppingBag size={36} />,
    features: [
      "Integración con pasarelas de pago",
      "Gestión de inventario",
      "Experiencia de compra optimizada",
      "Estrategias de conversión"
    ]
  },
  {
    title: "Diseño UX/UI",
    description: "Creamos interfaces intuitivas y atractivas que mejoran la experiencia del usuario.",
    icon: <PenTool size={36} />,
    features: [
      "Investigación de usuarios",
      "Wireframes y prototipos",
      "Tests de usabilidad",
      "Sistemas de diseño consistentes"
    ]
  },
  {
    title: "Apps Móviles",
    description: "Desarrollamos aplicaciones nativas y multidispositivo con excelente usabilidad.",
    icon: <Smartphone size={36} />,
    features: [
      "Desarrollo iOS y Android",
      "Aplicaciones React Native",
      "Integraciones con APIs",
      "Mantenimiento y actualizaciones"
    ]
  },
  {
    title: "Consultoría Digital",
    description: "Te asesoramos en tu estrategia digital para maximizar resultados y optimizar recursos.",
    icon: <Lightbulb size={36} />,
    features: [
      "Análisis de necesidades",
      "Hojas de ruta tecnológicas",
      "Optimización de procesos",
      "Formación a equipos"
    ]
  }
];

const process = [
  {
    title: "Descubrimiento",
    description: "Analizamos tus necesidades, objetivos y el mercado para definir una estrategia clara."
  },
  {
    title: "Planificación",
    description: "Desarrollamos una hoja de ruta detallada con plazos, recursos y entregables."
  },
  {
    title: "Ejecución",
    description: "Implementamos la solución con revisiones constantes para garantizar la calidad."
  },
  {
    title: "Lanzamiento y Mejora",
    description: "Realizamos pruebas finales, lanzamos y optimizamos continuamente."
  }
];

const testimonials = [
  {
    text: "Urdin Art Studio transformó por completo nuestra presencia digital. Su enfoque en el diseño y la experiencia de usuario nos ha permitido conectar mejor con nuestros clientes.",
    name: "María López",
    company: "Directora de Marketing, Empresa XYZ"
  },
  {
    text: "El equipo entendió perfectamente nuestras necesidades y entregó un sitio web que superó todas nuestras expectativas. Muy profesionales y atentos.",
    name: "Alberto García",
    company: "CEO, Startup Innovation"
  },
  {
    text: "La estrategia SEO que implementaron ha incrementado nuestro tráfico orgánico en un 200% en solo 6 meses. Resultados impresionantes.",
    name: "Carmen Rodríguez",
    company: "Propietaria, Boutique Online"
  }
];

export default Services;
