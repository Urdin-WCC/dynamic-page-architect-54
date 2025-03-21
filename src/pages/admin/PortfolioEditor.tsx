
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Loader2, ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { FileUpload } from "@/components/ui/file-upload";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// Mock data para categorías
const mockCategories = [
  { id: "1", name: "Diseño Web" },
  { id: "2", name: "E-commerce" },
  { id: "3", name: "Branding" },
  { id: "4", name: "UX/UI" },
  { id: "5", name: "Desarrollo" },
];

// Form validation schema
const projectFormSchema = z.object({
  title: z.string().min(3, { message: "El título debe tener al menos 3 caracteres" }),
  description: z.string().min(10, { message: "La descripción debe tener al menos 10 caracteres" }),
  content: z.string().min(20, { message: "El contenido debe tener al menos 20 caracteres" }),
  category: z.string({ required_error: "Selecciona una categoría" }),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Formato de fecha inválido" }),
  client: z.string().optional(),
  url: z.string().url({ message: "URL inválida" }).optional().or(z.literal("")),
  image: z.any().optional(),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

const PortfolioEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id && id !== "new";
  
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Set up form with default values
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
      client: "",
      url: "",
      image: null,
    },
  });

  useEffect(() => {
    if (isEditing) {
      setLoading(true);
      // In a real app, fetch project data here
      
      // For now, use mock data
      setTimeout(() => {
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
        
        // Reset form with fetched data
        form.reset(mockProject);
        setLoading(false);
      }, 800);
    }
  }, [id, isEditing, form]);

  const handleImageChange = (file: File | null) => {
    setImageFile(file);
    form.setValue("image", file || form.getValues("image"));
  };

  const onSubmit = async (data: ProjectFormValues) => {
    setLoading(true);
    
    try {
      // Handle file upload if needed
      if (imageFile) {
        // In a real app, upload the file here and get a URL
        console.log("Uploading image:", imageFile.name);
      }
      
      // In a real app, send the data to your API
      console.log("Form data:", data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(
        isEditing 
          ? "Proyecto actualizado correctamente" 
          : "Proyecto creado correctamente"
      );
      navigate("/admin/portfolio");
    } catch (error) {
      console.error("Error saving project:", error);
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

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>Información del proyecto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-4">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Título</FormLabel>
                            <FormControl>
                              <Input placeholder="Título del proyecto" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Descripción corta</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Breve descripción del proyecto" 
                                className="min-h-[80px]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Categoría</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecciona una categoría" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {mockCategories.map((category) => (
                                    <SelectItem key={category.id} value={category.name}>
                                      {category.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="date"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Fecha</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="client"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Cliente</FormLabel>
                              <FormControl>
                                <Input placeholder="Nombre del cliente" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="url"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>URL del proyecto</FormLabel>
                              <FormControl>
                                <Input placeholder="https://ejemplo.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Imagen principal</FormLabel>
                            <FormControl>
                              <FileUpload
                                onFileChange={handleImageChange}
                                value={typeof field.value === 'string' ? field.value : null}
                                previewClassName="h-40 w-full object-cover"
                              />
                            </FormControl>
                            <p className="text-xs text-muted-foreground mt-1">
                              Recomendación: imágenes de al menos 1200x1200px
                            </p>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descripción detallada</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Descripción detallada del proyecto, proceso, resultados..."
                            className="min-h-[300px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
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
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Guardando...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Guardar proyecto
                        </>
                      )}
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default PortfolioEditor;
