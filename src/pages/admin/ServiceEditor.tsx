
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileUpload } from "@/components/ui/file-upload";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Edit, Save, Loader2 } from "lucide-react";

// Datos de ejemplo para los servicios
const initialServices = [
  {
    id: "1",
    title: "Diseño Web",
    description: "Sitios web modernos y atractivos",
    longDescription: "Creamos diseños web personalizados que capturan la esencia de tu marca y ofrecen una experiencia única a tus usuarios. Nuestros diseños son modernos, responsivos y optimizados para todos los dispositivos.",
    icon: "Brush",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
  },
  {
    id: "2",
    title: "Diseño Gráfico",
    description: "Identidad visual y branding",
    longDescription: "Desarrollamos identidades visuales completas que ayudan a tu marca a destacar. Desde logotipos hasta materiales promocionales, creamos diseños coherentes que comunican los valores de tu empresa.",
    icon: "Search",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5"
  },
  {
    id: "3",
    title: "Desarrollo Frontend",
    description: "Interfaces interactivas y responsivas",
    longDescription: "Implementamos interfaces de usuario modernas y responsivas utilizando las últimas tecnologías web. Nos especializamos en crear experiencias de usuario fluidas y agradables que funcionan perfectamente en cualquier dispositivo.",
    icon: "Code",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97"
  },
  {
    id: "4",
    title: "Marketing Digital",
    description: "Estrategias para aumentar su visibilidad",
    longDescription: "Desarrollamos estrategias de marketing digital personalizadas para aumentar la visibilidad de tu marca en línea, generar más tráfico a tu sitio web y convertir visitantes en clientes.",
    icon: "Send",
    image: "https://images.unsplash.com/photo-1533750516457-a7f992034fec"
  }
];

const ServiceEditor = () => {
  const [services, setServices] = useState(initialServices);
  const [editingService, setEditingService] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleEdit = (service: any) => {
    setEditingService({ ...service });
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    setEditingService({
      id: String(Date.now()),
      title: "",
      description: "",
      longDescription: "",
      icon: "",
      image: ""
    });
    setIsDialogOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditingService(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingService(prev => ({
          ...prev,
          image: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveService = () => {
    if (editingService) {
      const exists = services.some(service => service.id === editingService.id);
      
      if (exists) {
        setServices(services =>
          services.map(service => service.id === editingService.id ? editingService : service)
        );
      } else {
        setServices(services => [...services, editingService]);
      }
      
      setIsDialogOpen(false);
      setEditingService(null);
    }
  };

  const handleDelete = (id: string) => {
    setServices(services => services.filter(service => service.id !== id));
  };

  const handleSaveAll = async () => {
    try {
      setIsSaving(true);
      
      // En una app real, aquí guardarías los datos a la base de datos
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "¡Guardado con éxito!",
        description: "Se han actualizado los servicios correctamente."
      });
      
    } catch (error) {
      console.error("Error al guardar:", error);
      toast({
        title: "Error al guardar",
        description: "Ocurrió un error al guardar los cambios.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-2">Editor de Servicios</h1>
          <p className="text-muted-foreground">
            Personaliza los servicios ofrecidos por tu empresa
          </p>
        </div>
        <Button onClick={handleSaveAll} disabled={isSaving}>
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Guardando...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Guardar cambios
            </>
          )}
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Lista de Servicios</CardTitle>
          <Button onClick={handleAddNew}>
            <Plus className="h-4 w-4 mr-2" />
            Añadir servicio
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Imagen</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Icono</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>
                    <div className="h-10 w-16 bg-muted rounded overflow-hidden">
                      {service.image && (
                        <img 
                          src={service.image} 
                          alt={service.title}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{service.title}</TableCell>
                  <TableCell>{service.description}</TableCell>
                  <TableCell>{service.icon}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(service)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(service.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingService && editingService.title ? `Editar ${editingService.title}` : "Nuevo servicio"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  name="title"
                  value={editingService?.title || ""}
                  onChange={handleInputChange}
                  placeholder="Ejemplo: Diseño Web"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Descripción Corta</Label>
                <Input
                  id="description"
                  name="description"
                  value={editingService?.description || ""}
                  onChange={handleInputChange}
                  placeholder="Breve descripción del servicio"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="icon">Icono</Label>
                <Input
                  id="icon"
                  name="icon"
                  value={editingService?.icon || ""}
                  onChange={handleInputChange}
                  placeholder="Ejemplo: Brush, Code, etc."
                />
                <p className="text-xs text-muted-foreground">
                  Usa nombres de iconos de Lucide React, como Brush, Code, Search, etc.
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="longDescription">Descripción Detallada</Label>
                <Textarea
                  id="longDescription"
                  name="longDescription"
                  value={editingService?.longDescription || ""}
                  onChange={handleInputChange}
                  placeholder="Descripción completa del servicio"
                  rows={4}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Imagen</Label>
                <div className="mb-2">
                  {editingService?.image && (
                    <div className="relative w-full h-40 rounded-md overflow-hidden mb-2">
                      <img 
                        src={editingService.image} 
                        alt="Service" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <FileUpload
                    accept="image/*"
                    onFileChange={handleImageChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveService}>
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServiceEditor;
