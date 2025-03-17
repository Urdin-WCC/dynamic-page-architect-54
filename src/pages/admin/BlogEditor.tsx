
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";
import { FileUpload } from "@/components/ui/file-upload";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data (en producción usarías API o base de datos)
const mockCategories = [
  { id: "1", name: "Diseño Web" },
  { id: "2", name: "SEO" },
  { id: "3", name: "E-commerce" },
  { id: "4", name: "Desarrollo" },
  { id: "5", name: "Marketing Digital" },
];

const BlogEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = id !== "new";
  
  const [post, setPost] = useState({
    id: "",
    title: "",
    excerpt: "",
    content: "",
    category: "",
    image: null as string | null,
    status: "draft"
  });
  
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (isEditing && id) {
      // En un caso real, aquí harías una llamada a API para obtener los datos
      // Simulamos con datos de ejemplo
      const mockPost = {
        id,
        title: "Diseño web moderno en 2023",
        excerpt: "Las mejores prácticas para diseño web moderno que debes conocer este año.",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.",
        category: "Diseño Web",
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
        status: "published"
      };
      setPost(mockPost);
    }
  }, [id, isEditing]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (status: string) => {
    setPost((prev) => ({ ...prev, status }));
  };

  const handleCategoryChange = (category: string) => {
    setPost((prev) => ({ ...prev, category }));
  };

  const handleImageChange = (file: File | null) => {
    setImageFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // En un caso real, aquí enviarías los datos al servidor
      // También subirías la imagen si existe

      // Simulamos un retraso
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(
        isEditing 
          ? "Publicación actualizada correctamente" 
          : "Publicación creada correctamente"
      );
      navigate("/admin/blog");
    } catch (error) {
      toast.error("Ha ocurrido un error. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate("/admin/blog")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>
        <h1 className="text-2xl font-bold">
          {isEditing ? "Editar publicación" : "Nueva publicación"}
        </h1>
        <div className="w-24" />
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Información de la publicación</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    name="title"
                    value={post.title}
                    onChange={handleChange}
                    placeholder="Título de la publicación"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="excerpt">Extracto</Label>
                  <Textarea
                    id="excerpt"
                    name="excerpt"
                    value={post.excerpt}
                    onChange={handleChange}
                    placeholder="Breve descripción de la publicación"
                    className="min-h-[80px]"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoría</Label>
                    <Select
                      value={post.category}
                      onValueChange={handleCategoryChange}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockCategories.map((category) => (
                          <SelectItem key={category.id} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="status">Estado</Label>
                    <Select
                      value={post.status}
                      onValueChange={handleStatusChange}
                    >
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Selecciona un estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="published">Publicado</SelectItem>
                        <SelectItem value="draft">Borrador</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Imagen destacada</Label>
                <FileUpload
                  onFileChange={handleImageChange}
                  value={post.image}
                  previewClassName="h-40 w-full object-cover"
                />
                <p className="text-xs text-muted-foreground">
                  Recomendación: imágenes de al menos 1200x630px
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">Contenido</Label>
              <Textarea
                id="content"
                name="content"
                value={post.content}
                onChange={handleChange}
                placeholder="Contenido completo de la publicación..."
                className="min-h-[300px]"
                required
              />
            </div>
            
            <div className="flex justify-end gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin/blog")}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  "Guardando..."
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Guardar {post.status === "published" ? "y publicar" : "borrador"}
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default BlogEditor;
