
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layout, Edit, Trash2, Plus, Eye, Check, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// Mock data
const mockPages = [
  { id: "1", title: "Inicio", sections: 4, lastUpdated: "2023-06-20" },
  { id: "2", title: "Sobre nosotros", sections: 3, lastUpdated: "2023-06-15" },
  { id: "3", title: "Servicios", sections: 5, lastUpdated: "2023-06-12" },
  { id: "4", title: "Contacto", sections: 2, lastUpdated: "2023-06-10" },
];

const mockSections = [
  { id: "1", title: "Hero Principal", page: "Inicio", type: "Hero", lastUpdated: "2023-06-20", content: "<h1>Bienvenido a Urdin Art</h1><p>Arte y diseño contemporáneo</p>" },
  { id: "2", title: "Servicios Destacados", page: "Inicio", type: "Grid", lastUpdated: "2023-06-19", content: "Lista de servicios destacados" },
  { id: "3", title: "Sobre Nosotros", page: "Inicio", type: "Content", lastUpdated: "2023-06-18", content: "Somos un estudio de diseño..." },
  { id: "4", title: "Llamada a la Acción", page: "Inicio", type: "CTA", lastUpdated: "2023-06-17", content: "¡Contáctanos hoy mismo!" },
  { id: "5", title: "Historia", page: "Sobre nosotros", type: "Content", lastUpdated: "2023-06-15", content: "Nuestra historia comenzó en..." },
  { id: "6", title: "Equipo", page: "Sobre nosotros", type: "Team", lastUpdated: "2023-06-14", content: "Nuestro equipo está formado por..." },
  { id: "7", title: "Testimonios", page: "Sobre nosotros", type: "Testimonials", lastUpdated: "2023-06-13", content: "Lo que dicen nuestros clientes..." },
];

const mockComponents = [
  { id: "1", title: "Cabecera", type: "Header", lastUpdated: "2023-06-22", content: "Componente de cabecera" },
  { id: "2", title: "Pie de Página", type: "Footer", lastUpdated: "2023-06-21", content: "Componente de pie de página" },
  { id: "3", title: "Barra Lateral", type: "Sidebar", lastUpdated: "2023-06-20", content: "Componente de barra lateral" },
  { id: "4", title: "Newsletter", type: "Component", lastUpdated: "2023-06-19", content: "Suscríbete a nuestro newsletter" },
];

const sectionTypes = [
  { value: "Hero", label: "Hero" },
  { value: "Grid", label: "Grid" },
  { value: "Content", label: "Content" },
  { value: "CTA", label: "CTA" },
  { value: "Team", label: "Team" },
  { value: "Testimonials", label: "Testimonials" },
];

const AdminContent = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("pages");
  const [sections, setSections] = useState(mockSections);
  const [pages, setPages] = useState(mockPages);
  const [components, setComponents] = useState(mockComponents);

  // Dialog states
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [itemType, setItemType] = useState<"page" | "section" | "component">("page");

  const handleEdit = (item: any, type: "page" | "section" | "component") => {
    setCurrentItem({ ...item });
    setItemType(type);
    setEditDialogOpen(true);
  };

  const handleSave = () => {
    if (itemType === "section") {
      const updatedSections = sections.map(section => 
        section.id === currentItem.id ? { ...currentItem, lastUpdated: new Date().toISOString().split('T')[0] } : section
      );
      setSections(updatedSections);
      toast({
        title: "Sección actualizada",
        description: `Se ha actualizado la sección "${currentItem.title}" correctamente.`
      });
    } else if (itemType === "page") {
      const updatedPages = pages.map(page => 
        page.id === currentItem.id ? { ...currentItem, lastUpdated: new Date().toISOString().split('T')[0] } : page
      );
      setPages(updatedPages);
      toast({
        title: "Página actualizada",
        description: `Se ha actualizado la página "${currentItem.title}" correctamente.`
      });
    } else if (itemType === "component") {
      const updatedComponents = components.map(component => 
        component.id === currentItem.id ? { ...currentItem, lastUpdated: new Date().toISOString().split('T')[0] } : component
      );
      setComponents(updatedComponents);
      toast({
        title: "Componente actualizado",
        description: `Se ha actualizado el componente "${currentItem.title}" correctamente.`
      });
    }
    setEditDialogOpen(false);
  };

  const handleDelete = (item: any, type: "page" | "section" | "component") => {
    setCurrentItem(item);
    setItemType(type);
    setConfirmDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (itemType === "section") {
      const updatedSections = sections.filter(section => section.id !== currentItem.id);
      setSections(updatedSections);
      toast({
        title: "Sección eliminada",
        description: `Se ha eliminado la sección "${currentItem.title}" correctamente.`
      });
    } else if (itemType === "page") {
      const updatedPages = pages.filter(page => page.id !== currentItem.id);
      setPages(updatedPages);
      toast({
        title: "Página eliminada",
        description: `Se ha eliminado la página "${currentItem.title}" correctamente.`
      });
    } else if (itemType === "component") {
      const updatedComponents = components.filter(component => component.id !== currentItem.id);
      setComponents(updatedComponents);
      toast({
        title: "Componente eliminado",
        description: `Se ha eliminado el componente "${currentItem.title}" correctamente.`
      });
    }
    setConfirmDeleteOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Gestor de Contenido</h1>
        <p className="text-muted-foreground">
          Administra las páginas, secciones y componentes de tu sitio web
        </p>
      </div>

      <Tabs defaultValue="pages" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="pages">Páginas</TabsTrigger>
          <TabsTrigger value="sections">Secciones</TabsTrigger>
          <TabsTrigger value="components">Componentes</TabsTrigger>
        </TabsList>
        
        <div className="pt-4 flex justify-between">
          <h2 className="text-xl font-medium">
            {activeTab === "pages" && "Páginas"}
            {activeTab === "sections" && "Secciones"}
            {activeTab === "components" && "Componentes"}
          </h2>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            {activeTab === "pages" && "Nueva página"}
            {activeTab === "sections" && "Nueva sección"}
            {activeTab === "components" && "Nuevo componente"}
          </Button>
        </div>
        
        <TabsContent value="pages" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pages.map((page) => (
              <Card key={page.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{page.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground mb-4">
                    <p>{page.sections} secciones</p>
                    <p>Última actualización: {page.lastUpdated}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(page, "page")}>
                      <Layout className="h-4 w-4 mr-2" />
                      Editar layout
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Ver
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive" onClick={() => handleDelete(page, "page")}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="sections" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {sections.map((section) => (
              <Card key={section.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex justify-between">
                    {section.title}
                    <span className="text-sm px-2 py-1 bg-secondary rounded-md">
                      {section.type}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground mb-4">
                    <p>Página: {section.page}</p>
                    <p>Última actualización: {section.lastUpdated}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(section, "section")}>
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive" onClick={() => handleDelete(section, "section")}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Eliminar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="components" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {components.map((component) => (
              <Card key={component.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{component.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground mb-4">
                    <p>Tipo: {component.type}</p>
                    <p>Última actualización: {component.lastUpdated}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(component, "component")}>
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive" onClick={() => handleDelete(component, "component")}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Eliminar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {itemType === "page" && "Editar Página"}
              {itemType === "section" && "Editar Sección"}
              {itemType === "component" && "Editar Componente"}
            </DialogTitle>
          </DialogHeader>
          
          {currentItem && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input 
                  id="title" 
                  value={currentItem.title} 
                  onChange={(e) => setCurrentItem({...currentItem, title: e.target.value})}
                />
              </div>

              {itemType === "section" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="page">Página</Label>
                    <Select 
                      value={currentItem.page}
                      onValueChange={(value) => setCurrentItem({...currentItem, page: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar página" />
                      </SelectTrigger>
                      <SelectContent>
                        {pages.map(page => (
                          <SelectItem key={page.id} value={page.title}>
                            {page.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo</Label>
                    <Select 
                      value={currentItem.type}
                      onValueChange={(value) => setCurrentItem({...currentItem, type: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {sectionTypes.map(type => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="content">Contenido</Label>
                <Textarea 
                  id="content" 
                  value={currentItem.content || ""} 
                  onChange={(e) => setCurrentItem({...currentItem, content: e.target.value})}
                  className="min-h-[150px]"
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleSave}>Guardar cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={confirmDeleteOpen} onOpenChange={setConfirmDeleteOpen}>
        <DialogContent className="max-w-xs">
          <DialogHeader>
            <DialogTitle>Confirmar eliminación</DialogTitle>
          </DialogHeader>
          
          {currentItem && (
            <div>
              <p>¿Estás seguro de que deseas eliminar "{currentItem.title}"?</p>
              <p className="text-sm text-muted-foreground mt-2">Esta acción no se puede deshacer.</p>
            </div>
          )}

          <DialogFooter className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setConfirmDeleteOpen(false)}>
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              <Trash2 className="h-4 w-4 mr-2" />
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminContent;
