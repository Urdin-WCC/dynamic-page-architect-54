
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Briefcase, Clock, Globe, Heart, Shield, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <PageLayout showSidebar={true}>
      {/* Hero Section */}
      <section className="py-12">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Sobre Nosotros</h1>
          <p className="text-xl text-muted-foreground">
            En Urdin Art Studio, creamos experiencias digitales que destacan por su diseño,
            funcionalidad y capacidad para conectar con las audiencias.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Nuestra Historia</h2>
          <p className="mb-4 text-muted-foreground">
            Fundado en 2020, Urdin Art Studio nació con la visión de unir arte y tecnología 
            para crear soluciones digitales excepcionales. Desde entonces, hemos crecido hasta 
            convertirnos en un estudio multidisciplinar con un enfoque centrado en el diseño 
            y la experiencia del usuario.
          </p>
          <p className="mb-4 text-muted-foreground">
            Nuestra filosofía se basa en la colaboración, la innovación y la atención meticulosa 
            a los detalles. Creemos que cada proyecto es una oportunidad para crear algo único 
            que refleje la esencia de cada cliente.
          </p>
          <div className="mt-8">
            <Link to="/contact">
              <Button>Contáctanos</Button>
            </Link>
          </div>
        </div>
        <div className="bg-muted rounded-lg overflow-hidden flex items-center justify-center h-80">
          <span className="text-muted-foreground">Imagen del equipo</span>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="py-12 border-t border-border">
        <h2 className="text-2xl font-semibold mb-8 text-center">Nuestros Valores</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-card p-6 rounded-lg border border-border hover:shadow-md transition-shadow">
              <div className="mb-4 text-primary">{value.icon}</div>
              <h3 className="text-xl font-medium mb-2">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-12 border-t border-border">
        <h2 className="text-2xl font-semibold mb-8 text-center">Nuestro Equipo</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <div key={index} className="text-center">
              <div className="w-32 h-32 bg-muted rounded-full mx-auto mb-4 overflow-hidden flex items-center justify-center">
                <span className="text-xs text-muted-foreground">Foto</span>
              </div>
              <h3 className="font-medium">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.position}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-12 border-t border-border">
        <div className="bg-secondary rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">¿Listo para trabajar con nosotros?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Hablemos sobre cómo podemos ayudarte a conseguir tus objetivos digitales.
          </p>
          <Link to="/contact">
            <Button size="lg">Contáctanos hoy</Button>
          </Link>
        </div>
      </section>
    </PageLayout>
  );
};

const values = [
  {
    title: "Creatividad",
    description: "Exploramos soluciones innovadoras y pensamos fuera de lo convencional para resolver problemas complejos.",
    icon: <Heart size={36} />
  },
  {
    title: "Calidad",
    description: "Nos comprometemos con los más altos estándares en cada aspecto de nuestro trabajo.",
    icon: <Shield size={36} />
  },
  {
    title: "Colaboración",
    description: "Trabajamos estrechamente con nuestros clientes, considerándolos parte integral del proceso creativo.",
    icon: <Users size={36} />
  },
  {
    title: "Responsabilidad",
    description: "Cumplimos nuestros compromisos y asumimos la responsabilidad de nuestro trabajo.",
    icon: <Clock size={36} />
  },
  {
    title: "Adaptabilidad",
    description: "Nos mantenemos flexibles y abiertos a los cambios en un entorno digital en constante evolución.",
    icon: <Globe size={36} />
  },
  {
    title: "Profesionalidad",
    description: "Aportamos experiencia y conocimientos especializados a cada proyecto que emprendemos.",
    icon: <Briefcase size={36} />
  }
];

const team = [
  { name: "Ana Martínez", position: "Directora Creativa" },
  { name: "Carlos Sánchez", position: "Diseñador UX/UI" },
  { name: "Laura Gómez", position: "Desarrolladora Frontend" },
  { name: "Miguel Rodríguez", position: "Desarrollador Backend" },
  { name: "Elena Torres", position: "Especialista en Marketing" },
  { name: "David Pérez", position: "Gestor de Proyectos" },
  { name: "Sara López", position: "Diseñadora Gráfica" },
  { name: "Javier Ruiz", position: "Especialista SEO" }
];

export default About;
