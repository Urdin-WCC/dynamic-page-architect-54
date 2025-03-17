
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Edit, Trash2, MessageSquare } from "lucide-react";

// Mock data
const mockPosts = [
  {
    id: "1",
    title: "Diseño web moderno en 2023",
    excerpt: "Las mejores prácticas para diseño web moderno que debes conocer este año.",
    createdAt: "2023-05-12",
    status: "published",
    comments: 5,
  },
  {
    id: "2",
    title: "Optimización SEO para tu negocio",
    excerpt: "Cómo mejorar el posicionamiento de tu sitio web y aumentar la visibilidad en buscadores.",
    createdAt: "2023-05-05", 
    status: "published",
    comments: 3,
  },
  {
    id: "3",
    title: "UI/UX: La importancia de la experiencia de usuario",
    excerpt: "Por qué la experiencia de usuario es fundamental para el éxito de tu proyecto web.",
    createdAt: "2023-04-28",
    status: "draft",
    comments: 0,
  },
];

const AdminBlog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  
  // Filter posts based on search query and selected tab
  const filteredPosts = mockPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedTab === "all") return matchesSearch;
    if (selectedTab === "published") return matchesSearch && post.status === "published";
    if (selectedTab === "drafts") return matchesSearch && post.status === "draft";
    
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-2">Gestor de Blog</h1>
          <p className="text-muted-foreground">
            Administra las publicaciones de tu blog
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nueva publicación
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar publicaciones..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Tabs defaultValue="all" className="w-full sm:w-auto" onValueChange={setSelectedTab}>
              <TabsList>
                <TabsTrigger value="all">Todas</TabsTrigger>
                <TabsTrigger value="published">Publicadas</TabsTrigger>
                <TabsTrigger value="drafts">Borradores</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          {filteredPosts.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead className="hidden md:table-cell">Extracto</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell className="hidden md:table-cell">{post.excerpt.substring(0, 60)}...</TableCell>
                    <TableCell>{post.createdAt}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        post.status === "published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {post.status === "published" ? "Publicado" : "Borrador"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" title="Editar">
                          <Edit className="h-4 w-4" />
                        </Button>
                        {post.comments > 0 && (
                          <Button variant="ghost" size="icon" title="Ver comentarios">
                            <MessageSquare className="h-4 w-4" />
                            <span className="absolute top-0 right-0 h-4 w-4 bg-primary text-[10px] text-primary-foreground rounded-full">
                              {post.comments}
                            </span>
                          </Button>
                        )}
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
              <p className="text-muted-foreground">No se encontraron publicaciones.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Post Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Nueva publicación</DialogTitle>
            <DialogDescription>
              Crea una nueva publicación para tu blog
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">Título</label>
              <Input id="title" placeholder="Título de la publicación" />
            </div>
            <div className="space-y-2">
              <label htmlFor="excerpt" className="text-sm font-medium">Extracto</label>
              <textarea 
                id="excerpt" 
                className="w-full min-h-20 p-3 rounded-md border border-input resize-none"
                placeholder="Breve descripción de la publicación..."
              ></textarea>
            </div>
            <div className="space-y-2">
              <label htmlFor="content" className="text-sm font-medium">Contenido</label>
              <textarea 
                id="content" 
                className="w-full min-h-40 p-3 rounded-md border border-input resize-none"
                placeholder="Contenido de la publicación..."
              ></textarea>
            </div>
            <div className="pt-4 flex justify-end gap-4">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancelar
              </Button>
              <Button>
                Guardar como borrador
              </Button>
              <Button>
                Publicar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBlog;
