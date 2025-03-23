
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Save, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FooterEditor = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  
  const [footerData, setFooterData] = useState({
    companyName: "Urdin Art Studio",
    tagline: "Creando experiencias digitales desde 2020.",
    copyright: "© 2023 Urdin Art Studio. Todos los derechos reservados.",
    address: "Ciudad, País",
    email: "info@urdinart.com",
    phone: "+34 123 456 789",
    socialLinks: [
      { name: "Facebook", url: "https://facebook.com", icon: "facebook" },
      { name: "Twitter", url: "https://twitter.com", icon: "twitter" },
      { name: "Instagram", url: "https://instagram.com", icon: "instagram" },
      { name: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" }
    ]
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    section = "general"
  ) => {
    const { name, value } = e.target;
    setFooterData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSocialLinkChange = (index: number, field: string, value: string) => {
    const updatedLinks = [...footerData.socialLinks];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    setFooterData(prev => ({
      ...prev,
      socialLinks: updatedLinks
    }));
  };

  const addSocialLink = () => {
    setFooterData(prev => ({
      ...prev,
      socialLinks: [...prev.socialLinks, { name: "", url: "", icon: "" }]
    }));
  };

  const removeSocialLink = (index: number) => {
    setFooterData(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      
      // En una app real, aquí guardarías los datos a la base de datos
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "¡Guardado con éxito!",
        description: "Se ha actualizado el pie de página correctamente."
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
          <h1 className="text-2xl font-bold mb-2">Editor de Pie de Página</h1>
          <p className="text-muted-foreground">
            Personaliza la información del pie de página de tu sitio
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
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="contacto">Contacto</TabsTrigger>
          <TabsTrigger value="social">Redes Sociales</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Información General</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Nombre de la Empresa</Label>
                <Input
                  id="companyName"
                  name="companyName"
                  value={footerData.companyName}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tagline">Eslogan</Label>
                <Input
                  id="tagline"
                  name="tagline"
                  value={footerData.tagline}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="copyright">Texto de Copyright</Label>
                <Input
                  id="copyright"
                  name="copyright"
                  value={footerData.copyright}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contacto">
          <Card>
            <CardHeader>
              <CardTitle>Información de Contacto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Dirección</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={footerData.address}
                  onChange={handleInputChange}
                  rows={2}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={footerData.email}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={footerData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Redes Sociales</CardTitle>
              <Button onClick={addSocialLink}>Añadir Red Social</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {footerData.socialLinks.map((link, index) => (
                  <div key={index} className="grid grid-cols-12 gap-4 items-end border-b pb-4">
                    <div className="col-span-4 space-y-2">
                      <Label htmlFor={`social-name-${index}`}>Nombre</Label>
                      <Input
                        id={`social-name-${index}`}
                        value={link.name}
                        onChange={(e) => handleSocialLinkChange(index, 'name', e.target.value)}
                        placeholder="Ejemplo: Facebook, Twitter..."
                      />
                    </div>
                    
                    <div className="col-span-4 space-y-2">
                      <Label htmlFor={`social-url-${index}`}>URL</Label>
                      <Input
                        id={`social-url-${index}`}
                        value={link.url}
                        onChange={(e) => handleSocialLinkChange(index, 'url', e.target.value)}
                        placeholder="https://..."
                      />
                    </div>
                    
                    <div className="col-span-3 space-y-2">
                      <Label htmlFor={`social-icon-${index}`}>Icono</Label>
                      <Input
                        id={`social-icon-${index}`}
                        value={link.icon}
                        onChange={(e) => handleSocialLinkChange(index, 'icon', e.target.value)}
                        placeholder="facebook, twitter..."
                      />
                    </div>
                    
                    <div className="col-span-1">
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => removeSocialLink(index)}
                        className="w-full"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                {footerData.socialLinks.length === 0 && (
                  <div className="text-center py-4 text-muted-foreground">
                    No hay redes sociales configuradas. Añade una para empezar.
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

export default FooterEditor;
