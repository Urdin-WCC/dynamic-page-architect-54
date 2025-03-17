
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Edit, Trash2, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Mock data
const mockPosts = [
  {
    id: "1",
    title: "Diseño web moderno en 2023",
    excerpt: "Las mejores prácticas para diseño web moderno que debes conocer este año.",
    createdAt: "2023-05-12",
    status: "published",
    comments: 5,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
  },
  {
    id: "2",
    title: "Optimización SEO para tu negocio",
    excerpt: "Cómo mejorar el posicionamiento de tu sitio web y aumentar la visibilidad en buscadores.",
    createdAt: "2023-05-05", 
    status: "published",
    comments: 3,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
  },
  {
    id: "3",
    title: "UI/UX: La importancia de la experiencia de usuario",
    excerpt: "Por qué la experiencia de usuario es fundamental para el éxito de tu proyecto web.",
    createdAt: "2023-04-28",
    status: "draft",
    comments: 0,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
  },
];

const AdminBlog = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  
  // Filter posts based on search query and selected tab
  const filteredPosts = mockPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedTab === "all") return matchesSearch;
    if (selectedTab === "published") return matchesSearch && post.status === "published";
    if (selectedTab === "drafts") return matchesSearch && post.status === "draft";
    
    return matchesSearch;
  });

  const handleEdit = (id: string) => {
    navigate(`/admin/blog/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    setPostToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (postToDelete) {
      // En un caso real, aquí harías una llamada a API para eliminar
      toast.success("Publicación eliminada correctamente");
      setIsDeleteDialogOpen(false);
      setPostToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-2">Gestor de Blog</h1>
          <p className="text-muted-foreground">
            Administra las publicaciones de tu blog
          </p>
        </div>
        <Button onClick={() => navigate("/admin/blog/new")}>
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
                  <TableHead>Imagen</TableHead>
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
                    <TableCell>
                      <div className="h-10 w-16 bg-muted rounded overflow-hidden">
                        {post.image && (
                          <img 
                            src={post.image} 
                            alt={post.title} 
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                    </TableCell>
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
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          title="Editar"
                          onClick={() => handleEdit(post.id)}
                        >
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
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          title="Eliminar"
                          onClick={() => handleDelete(post.id)}
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
              <p className="text-muted-foreground">No se encontraron publicaciones.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar eliminación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar esta publicación? Esta acción no se puede deshacer.
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
    </div>
  );
};

export default AdminBlog;
