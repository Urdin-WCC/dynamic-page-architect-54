
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileUpload } from "@/components/ui/file-upload";
import { Label } from "@/components/ui/label";
import { Edit, Trash2, Save } from "lucide-react";
import { toast } from "sonner";

// Datos de ejemplo para cada sección
const mockSections = {
  hero: {
    title: "Urdin Art Studio",
    subtitle: "Creamos experiencias digitales inolvidables con un enfoque en el arte y la innovación",
    ctaText: "Ver Portafolio",
    ctaLink: "/portfolio",
    secondaryCtaText: "Leer Blog",
    secondaryCtaLink: "/blog",
  },
  about: {
    title: "Sobre Nosotros",
    content: "Somos un estudio de diseño y desarrollo web fundado en 2020. Nos especializamos en crear experiencias digitales únicas que combinan estética y funcionalidad. Nuestro equipo está formado por diseñadores y desarrolladores apasionados que trabajan juntos para ofrecer soluciones creativas a problemas complejos.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
  },
  services: [
    {
      id: "service1",
      title: "Diseño Web",
      description: "Sitios web modernos y atractivos",
      icon: "Brush"
    },
    {
      id: "service2",
      title: "Diseño Gráfico",
      description: "Identidad visual y branding",
      icon: "Search"
    },
    {
      id: "service3",
      title: "Desarrollo Frontend",
      description: "Interfaces interactivas y responsivas",
      icon: "Code"
    },
    {
      id: "service4",
      title: "Marketing Digital",
      description: "Estrategias para aumentar su visibilidad",
      icon: "Send"
    }
  ],
  contact: {
    title: "Contáctanos",
    address: "Ciudad, País",
    email: "info@urdinart.com",
    phone: "+34 123 456 789",
    formTitle: "Envíanos un mensaje",
    formButtonText: "Enviar mensaje",
  },
  footer: {
    companyName: "Urdin Art Studio",
    companyTagline: "Creando experiencias digitales desde 2020.",
    copyrightText: "© 2023 Urdin Art Studio. Todos los derechos reservados."
  }
};

const ContentManager = () => {
  const [activeTab, setActiveTab] = useState('hero');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);

  const handleSaveChanges = () => {
    toast.success("Cambios guardados correctamente");
    // En una app real aquí guardarías a la base de datos
  };

  const handleEditHero = () => {
    setEditingItem({...mockSections.hero});
    setIsDialogOpen(true);
  };

  const handleEditAbout = () => {
    setEditingItem({...mockSections.about});
    setIsDialogOpen(true);
  };

  const handleEditContact = () => {
    setEditingItem({...mockSections.contact});
    setIsDialogOpen(true);
  };

  const handleEditFooter = () => {
    setEditingItem({...mockSections.footer});
    setIsDialogOpen(true);
  };

  const handleEditService = (serviceId: string) => {
    const service = mockSections.services.find(s => s.id === serviceId);
    if (service) {
      setEditingItem({...service});
      setEditingServiceId(serviceId);
      setIsDialogOpen(true);
    }
  };

  const handleSaveDialog = () => {
    // En una app real aquí actualizarías la base de datos
    toast.success("Contenido actualizado correctamente");
    setIsDialogOpen(false);
    setEditingItem(null);
    setEditingServiceId(null);
  };

  const renderDialogContent = () => {
    if (!editingItem) return null;

    if (activeTab === 'hero') {
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input 
              id="title" 
              name="title" 
              value={editingItem.title} 
              onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subtitle">Subtítulo</Label>
            <Textarea 
              id="subtitle" 
              name="subtitle" 
              value={editingItem.subtitle} 
              onChange={(e) => setEditingItem({...editingItem, subtitle: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ctaText">Texto CTA Principal</Label>
              <Input 
                id="ctaText" 
                name="ctaText" 
                value={editingItem.ctaText} 
                onChange={(e) => setEditingItem({...editingItem, ctaText: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ctaLink">Enlace CTA Principal</Label>
              <Input 
                id="ctaLink" 
                name="ctaLink" 
                value={editingItem.ctaLink} 
                onChange={(e) => setEditingItem({...editingItem, ctaLink: e.target.value})}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="secondaryCtaText">Texto CTA Secundario</Label>
              <Input 
                id="secondaryCtaText" 
                name="secondaryCtaText" 
                value={editingItem.secondaryCtaText} 
                onChange={(e) => setEditingItem({...editingItem, secondaryCtaText: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="secondaryCtaLink">Enlace CTA Secundario</Label>
              <Input 
                id="secondaryCtaLink" 
                name="secondaryCtaLink" 
                value={editingItem.secondaryCtaLink} 
                onChange={(e) => setEditingItem({...editingItem, secondaryCtaLink: e.target.value})}
              />
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === 'about') {
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="aboutTitle">Título</Label>
            <Input 
              id="aboutTitle" 
              name="title" 
              value={editingItem.title} 
              onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="aboutContent">Contenido</Label>
            <Textarea 
              id="aboutContent" 
              name="content" 
              value={editingItem.content} 
              onChange={(e) => setEditingItem({...editingItem, content: e.target.value})}
              className="min-h-[150px]"
            />
          </div>
          <div className="space-y-2">
            <Label>Imagen</Label>
            <FileUpload 
              value={editingItem.image}
              onFileChange={(file) => {
                // En una app real, subirías el archivo y actualizarías la URL
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setEditingItem({...editingItem, image: reader.result as string});
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </div>
        </div>
      );
    }

    if (activeTab === 'services' && editingServiceId) {
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="serviceTitle">Título</Label>
            <Input 
              id="serviceTitle" 
              name="title" 
              value={editingItem.title} 
              onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="serviceDescription">Descripción</Label>
            <Textarea 
              id="serviceDescription" 
              name="description" 
              value={editingItem.description} 
              onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="serviceIcon">Icono</Label>
            <Input 
              id="serviceIcon" 
              name="icon" 
              value={editingItem.icon} 
              onChange={(e) => setEditingItem({...editingItem, icon: e.target.value})}
            />
            <p className="text-sm text-muted-foreground">
              Nombre del icono (Brush, Code, Search, Send, etc.)
            </p>
          </div>
        </div>
      );
    }

    if (activeTab === 'contact') {
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="contactTitle">Título</Label>
            <Input 
              id="contactTitle" 
              name="title" 
              value={editingItem.title} 
              onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactAddress">Dirección</Label>
              <Input 
                id="contactAddress" 
                name="address" 
                value={editingItem.address} 
                onChange={(e) => setEditingItem({...editingItem, address: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPhone">Teléfono</Label>
              <Input 
                id="contactPhone" 
                name="phone" 
                value={editingItem.phone} 
                onChange={(e) => setEditingItem({...editingItem, phone: e.target.value})}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactEmail">Email</Label>
            <Input 
              id="contactEmail" 
              name="email" 
              value={editingItem.email} 
              onChange={(e) => setEditingItem({...editingItem, email: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="formTitle">Título del formulario</Label>
            <Input 
              id="formTitle" 
              name="formTitle" 
              value={editingItem.formTitle} 
              onChange={(e) => setEditingItem({...editingItem, formTitle: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="formButtonText">Texto del botón</Label>
            <Input 
              id="formButtonText" 
              name="formButtonText" 
              value={editingItem.formButtonText} 
              onChange={(e) => setEditingItem({...editingItem, formButtonText: e.target.value})}
            />
          </div>
        </div>
      );
    }

    if (activeTab === 'footer') {
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">Nombre de la empresa</Label>
            <Input 
              id="companyName" 
              name="companyName" 
              value={editingItem.companyName} 
              onChange={(e) => setEditingItem({...editingItem, companyName: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyTagline">Eslogan</Label>
            <Input 
              id="companyTagline" 
              name="companyTagline" 
              value={editingItem.companyTagline} 
              onChange={(e) => setEditingItem({...editingItem, companyTagline: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="copyrightText">Texto de copyright</Label>
            <Input 
              id="copyrightText" 
              name="copyrightText" 
              value={editingItem.copyrightText} 
              onChange={(e) => setEditingItem({...editingItem, copyrightText: e.target.value})}
            />
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-2">Gestionar Contenido</h1>
          <p className="text-muted-foreground">
            Edita el contenido de las distintas secciones de tu sitio web
          </p>
        </div>
        <Button onClick={handleSaveChanges}>
          <Save className="h-4 w-4 mr-2" />
          Guardar todos los cambios
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="hero">Inicio Hero</TabsTrigger>
          <TabsTrigger value="about">Sobre Nosotros</TabsTrigger>
          <TabsTrigger value="services">Servicios</TabsTrigger>
          <TabsTrigger value="contact">Contacto</TabsTrigger>
          <TabsTrigger value="footer">Pie de Página</TabsTrigger>
        </TabsList>

        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Sección Hero</CardTitle>
                <Button variant="outline" size="sm" onClick={handleEditHero}>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Título:</p>
                  <p className="text-muted-foreground">{mockSections.hero.title}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Subtítulo:</p>
                  <p className="text-muted-foreground">{mockSections.hero.subtitle}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">CTA Principal:</p>
                    <p className="text-muted-foreground">{mockSections.hero.ctaText} → {mockSections.hero.ctaLink}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">CTA Secundario:</p>
                    <p className="text-muted-foreground">{mockSections.hero.secondaryCtaText} → {mockSections.hero.secondaryCtaLink}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Sección Sobre Nosotros</CardTitle>
                <Button variant="outline" size="sm" onClick={handleEditAbout}>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Título:</p>
                  <p className="text-muted-foreground">{mockSections.about.title}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Contenido:</p>
                  <p className="text-muted-foreground">{mockSections.about.content}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Imagen:</p>
                  <div className="mt-2 h-40 w-full max-w-md bg-muted rounded-md overflow-hidden">
                    {mockSections.about.image && (
                      <img 
                        src={mockSections.about.image} 
                        alt="Sobre nosotros" 
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>Servicios</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockSections.services.map((service) => (
                  <div key={service.id} className="flex justify-between items-start border-b pb-4">
                    <div>
                      <h3 className="font-medium">{service.title}</h3>
                      <p className="text-muted-foreground">{service.description}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Icono: {service.icon}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleEditService(service.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  Añadir nuevo servicio
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Sección Contacto</CardTitle>
                <Button variant="outline" size="sm" onClick={handleEditContact}>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Título:</p>
                  <p className="text-muted-foreground">{mockSections.contact.title}</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium">Dirección:</p>
                    <p className="text-muted-foreground">{mockSections.contact.address}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Email:</p>
                    <p className="text-muted-foreground">{mockSections.contact.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Teléfono:</p>
                    <p className="text-muted-foreground">{mockSections.contact.phone}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Título del formulario:</p>
                    <p className="text-muted-foreground">{mockSections.contact.formTitle}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Texto del botón:</p>
                    <p className="text-muted-foreground">{mockSections.contact.formButtonText}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="footer">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Pie de Página</CardTitle>
                <Button variant="outline" size="sm" onClick={handleEditFooter}>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Nombre de la empresa:</p>
                  <p className="text-muted-foreground">{mockSections.footer.companyName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Eslogan:</p>
                  <p className="text-muted-foreground">{mockSections.footer.companyTagline}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Texto de copyright:</p>
                  <p className="text-muted-foreground">{mockSections.footer.copyrightText}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Editar {activeTab === 'hero' ? 'Sección Hero' : 
                      activeTab === 'about' ? 'Sección Sobre Nosotros' : 
                      activeTab === 'services' ? 'Servicio' : 
                      activeTab === 'contact' ? 'Sección Contacto' : 
                      'Pie de Página'}
            </DialogTitle>
          </DialogHeader>
          
          {renderDialogContent()}
          
          <div className="flex justify-end gap-4 pt-4">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveDialog}>
              Guardar cambios
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContentManager;
