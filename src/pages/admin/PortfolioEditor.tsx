
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

// Mock data para categorías
const mockCategories = [
  { id: "1", name: "Diseño Web" },
  { id: "2", name: "E-commerce" },
  { id: "3", name: "Branding" },
  { id: "4", name: "UX/UI" },
  { id: "5", name: "Desarrollo" },
];

const PortfolioEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = id !== "new";
  
  const [project, setProject] = useState({
    id: "",
    title: "",
    description: "",
    content: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
    client: "",
    url: "",
    image: null as string | null,
  });
  
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (isEditing && id) {
      // En un caso real, aquí harías una llamada a API
      // Simulamos con datos de ejemplo
      const mockProject = {
        id,
        title: "Portal Corporativo",
        description: "Rediseño completo del sitio web corporativo con un enfoque en UX y rendimiento.",
        content: "Este proyecto incluyó un análisis profundo de la experiencia de usuario actual, identificando puntos de fricción y oportunidades de mejora...",
        category: "Diseño Web",
        date: "2023-03-15",
        client: "Empresa Ficticia S.A.",
        url: "https://ejemplo.com",
        image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      };
      setProject(mockProject);
    }
  }, [id, isEditing]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (category: string) => {
    setProject((prev) => ({ ...prev, category }));
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
          ? "Proyecto actualizado correctamente" 
          : "Proyecto creado correctamente"
      );
      navigate("/admin/portfolio");
    } catch (error) {
      toast.error("Ha ocurrido un error. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate("/admin/portfolio")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>
        <h1 className="text-2xl font-bold">
          {isEditing ? "Editar proyecto" : "Nuevo proyecto"}
        </h1>
        <div className="w-24" />
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Información del proyecto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    name="title"
                    value={project.title}
                    onChange={handleChange}
                    placeholder="Título del proyecto"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Descripción corta</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={project.description}
                    onChange={handleChange}
                    placeholder="Breve descripción del proyecto"
                    className="min-h-[80px]"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoría</Label>
                    <Select
                      value={project.category}
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
                    <Label htmlFor="date">Fecha</Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={project.date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="client">Cliente</Label>
                    <Input
                      id="client"
                      name="client"
                      value={project.client}
                      onChange={handleChange}
                      placeholder="Nombre del cliente"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="url">URL del proyecto</Label>
                    <Input
                      id="url"
                      name="url"
                      value={project.url}
                      onChange={handleChange}
                      placeholder="https://ejemplo.com"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Imagen principal</Label>
                <FileUpload
                  onFileChange={handleImageChange}
                  value={project.image}
                  previewClassName="h-40 w-full object-cover"
                />
                <p className="text-xs text-muted-foreground">
                  Recomendación: imágenes de al menos 1200x1200px
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">Descripción detallada</Label>
              <Textarea
                id="content"
                name="content"
                value={project.content}
                onChange={handleChange}
                placeholder="Descripción detallada del proyecto, proceso, resultados..."
                className="min-h-[300px]"
                required
              />
            </div>
            
            <div className="flex justify-end gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin/portfolio")}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  "Guardando..."
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Guardar proyecto
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

export default PortfolioEditor;
