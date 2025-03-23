
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileUpload } from "@/components/ui/file-upload";
import { useToast } from "@/hooks/use-toast";
import { Save, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const HomeEditor = () => {
  const [activeTab, setActiveTab] = useState("hero");
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  
  const [heroData, setHeroData] = useState({
    title: "Urdin Art Studio",
    subtitle: "Creamos experiencias digitales inolvidables con un enfoque en el arte y la innovación",
    backgroundImage: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?auto=format&fit=crop&w=1400",
    ctaText: "Ver Portafolio",
    ctaLink: "/portfolio",
    secondaryCtaText: "Leer Blog",
    secondaryCtaLink: "/blog"
  });

  const [featuresData, setFeaturesData] = useState([
    {
      title: "Diseño Web Personalizado",
      description: "Creamos sitios web únicos que destacan tu marca.",
      icon: "Brush"
    },
    {
      title: "Desarrollo Frontend",
      description: "Aplicaciones web modernas y responsivas.",
      icon: "Code"
    },
    {
      title: "UX/UI Design",
      description: "Interfaces intuitivas centradas en el usuario.",
      icon: "Layers"
    }
  ]);

  const handleHeroChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setHeroData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleHeroImageChange = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setHeroData(prev => ({
          ...prev,
          backgroundImage: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFeatureChange = (index: number, field: string, value: string) => {
    const updatedFeatures = [...featuresData];
    updatedFeatures[index] = { ...updatedFeatures[index], [field]: value };
    setFeaturesData(updatedFeatures);
  };

  const addFeature = () => {
    setFeaturesData(prev => [...prev, { title: "", description: "", icon: "" }]);
  };

  const removeFeature = (index: number) => {
    setFeaturesData(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      
      // En una app real, aquí guardarías los datos a la base de datos
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "¡Guardado con éxito!",
        description: "Se ha actualizado la página de inicio correctamente."
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
          <h1 className="text-2xl font-bold mb-2">Editor de Página de Inicio</h1>
          <p className="text-muted-foreground">
            Personaliza el contenido de la página de inicio de tu sitio
          </p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
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

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="hero">Sección Hero</TabsTrigger>
          <TabsTrigger value="features">Características</TabsTrigger>
        </TabsList>

        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <CardTitle>Sección Hero</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  name="title"
                  value={heroData.title}
                  onChange={handleHeroChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtítulo</Label>
                <Textarea
                  id="subtitle"
                  name="subtitle"
                  value={heroData.subtitle}
                  onChange={handleHeroChange}
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label>Imagen de Fondo</Label>
                <div className="mb-4">
                  {heroData.backgroundImage && (
                    <div className="relative w-full h-40 rounded-md overflow-hidden mb-2">
                      <img 
                        src={heroData.backgroundImage} 
                        alt="Hero background" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <FileUpload
                    accept="image/*"
                    onFileChange={handleHeroImageChange}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ctaText">Texto CTA Principal</Label>
                  <Input
                    id="ctaText"
                    name="ctaText"
                    value={heroData.ctaText}
                    onChange={handleHeroChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ctaLink">Enlace CTA Principal</Label>
                  <Input
                    id="ctaLink"
                    name="ctaLink"
                    value={heroData.ctaLink}
                    onChange={handleHeroChange}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="secondaryCtaText">Texto CTA Secundario</Label>
                  <Input
                    id="secondaryCtaText"
                    name="secondaryCtaText"
                    value={heroData.secondaryCtaText}
                    onChange={handleHeroChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="secondaryCtaLink">Enlace CTA Secundario</Label>
                  <Input
                    id="secondaryCtaLink"
                    name="secondaryCtaLink"
                    value={heroData.secondaryCtaLink}
                    onChange={handleHeroChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Características Destacadas</CardTitle>
              <Button onClick={addFeature}>Añadir Característica</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {featuresData.map((feature, index) => (
                  <div key={index} className="grid grid-cols-12 gap-4 items-start border-b pb-4">
                    <div className="col-span-12 md:col-span-3 space-y-2">
                      <Label htmlFor={`feature-title-${index}`}>Título</Label>
                      <Input
                        id={`feature-title-${index}`}
                        value={feature.title}
                        onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                      />
                    </div>
                    
                    <div className="col-span-12 md:col-span-6 space-y-2">
                      <Label htmlFor={`feature-description-${index}`}>Descripción</Label>
                      <Textarea
                        id={`feature-description-${index}`}
                        value={feature.description}
                        onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                        rows={2}
                      />
                    </div>
                    
                    <div className="col-span-10 md:col-span-2 space-y-2">
                      <Label htmlFor={`feature-icon-${index}`}>Icono</Label>
                      <Input
                        id={`feature-icon-${index}`}
                        value={feature.icon}
                        onChange={(e) => handleFeatureChange(index, 'icon', e.target.value)}
                        placeholder="Brush, Code, etc."
                      />
                    </div>
                    
                    <div className="col-span-2 md:col-span-1 pt-8">
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => removeFeature(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                {featuresData.length === 0 && (
                  <div className="text-center py-4 text-muted-foreground">
                    No hay características configuradas. Añade una para empezar.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HomeEditor;
