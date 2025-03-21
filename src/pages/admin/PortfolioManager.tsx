import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Edit, Trash2, Tag, Eye } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

const mockProjects = [
  {
    id: "1",
    title: "Diseño web para restaurante",
    category: "Diseño Web",
    date: "2023-06-15",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
  },
  {
    id: "2",
    title: "Identidad corporativa para startup",
    category: "Branding",
    date: "2023-05-22",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
  },
  {
    id: "3",
    title: "App móvil para tienda online",
    category: "Desarrollo Móvil",
    date: "2023-04-10",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
  },
  {
    id: "4",
    title: "Campaña publicitaria para evento",
    category: "Marketing",
    date: "2023-03-28",
    image: null,
  },
];

const mockCategories = [
  { id: "1", name: "Diseño Web" },
  { id: "2", name: "Branding" },
  { id: "3", name: "Desarrollo Móvil" },
  { id: "4", name: "Marketing" },
];

const AdminPortfolio = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedCategory === "all") return matchesSearch;
    return matchesSearch && project.category === selectedCategory;
  });

  const handleEdit = (id: string) => {
    navigate(`/admin/portfolio/edit/${id}`);
  };

  const handlePreview = (id: string) => {
    toast.info("Esta función estará disponible próximamente");
  };

  const handleDelete = (id: string) => {
    setProjectToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (projectToDelete) {
      toast.success("Proyecto eliminado correctamente");
      setIsDeleteDialogOpen(false);
      setProjectToDelete(null);
    }
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      toast.success(`Categoría "${newCategory}" añadida correctamente`);
      setNewCategory("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-2">Gestor de Portafolio</h1>
          <p className="text-muted-foreground">
            Administra los proyectos de tu portafolio
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsCategoryDialogOpen(true)}>
            <Tag className="h-4 w-4 mr-2" />
            Categorías
          </Button>
          <Button onClick={() => navigate("/admin/portfolio/new")}>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo proyecto
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar proyectos..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Tabs defaultValue="all" className="w-full sm:w-auto" onValueChange={setSelectedCategory}>
              <TabsList className="grid grid-cols-2 sm:grid-cols-5 w-full sm:w-auto">
                <TabsTrigger value="all">Todos</TabsTrigger>
                {mockCategories.map(category => (
                  <TabsTrigger key={category.id} value={category.name}>
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          {filteredProjects.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Imagen</TableHead>
                  <TableHead>Título</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>
                      <div className="h-10 w-16 bg-muted rounded overflow-hidden">
                        {project.image && (
                          <img 
                            src={project.image} 
                            alt={project.title} 
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{project.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{project.category}</Badge>
                    </TableCell>
                    <TableCell>{project.date}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          title="Vista previa"
                          onClick={() => handlePreview(project.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          title="Editar"
                          onClick={() => handleEdit(project.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          title="Eliminar"
                          onClick={() => handleDelete(project.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No se encontraron proyectos.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => navigate("/admin/portfolio/new")}
              >
                <Plus className="h-4 w-4 mr-2" />
                Crear un proyecto
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar eliminación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar este proyecto? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-4 pt-4">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Eliminar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Gestionar categorías</DialogTitle>
            <DialogDescription>
              Añade, edita o elimina categorías para tus proyectos
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {mockCategories.map((category) => (
              <div key={category.id} className="flex items-center justify-between py-2 border-b">
                <Badge variant="outline">{category.name}</Badge>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-2 mt-4">
              <Input 
                placeholder="Nueva categoría" 
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
              />
              <Button onClick={handleAddCategory}>Añadir</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPortfolio;
