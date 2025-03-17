
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Edit, Trash2, Tag } from "lucide-react";
import { useState } from "react";

// Mock data
const mockProjects = [
  {
    id: "1",
    title: "Diseño web para restaurante",
    category: "Diseño Web",
    date: "2023-06-15",
  },
  {
    id: "2",
    title: "Identidad corporativa para startup",
    category: "Branding",
    date: "2023-05-22",
  },
  {
    id: "3",
    title: "App móvil para tienda online",
    category: "Desarrollo Móvil",
    date: "2023-04-10",
  },
  {
    id: "4",
    title: "Campaña publicitaria para evento",
    category: "Marketing",
    date: "2023-03-28",
  },
];

// Mock categories
const mockCategories = [
  { id: "1", name: "Diseño Web" },
  { id: "2", name: "Branding" },
  { id: "3", name: "Desarrollo Móvil" },
  { id: "4", name: "Marketing" },
];

const AdminPortfolio = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  // Filter projects based on search query and selected category
  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedCategory === "all") return matchesSearch;
    return matchesSearch && project.category === selectedCategory;
  });

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
          <Button variant="outline">
            <Tag className="h-4 w-4 mr-2" />
            Categorías
          </Button>
          <Button>
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
                  <TableHead>Título</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.title}</TableCell>
                    <TableCell>{project.category}</TableCell>
                    <TableCell>{project.date}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" title="Editar">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Eliminar">
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
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPortfolio;
