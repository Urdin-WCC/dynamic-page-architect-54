import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Upload, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const hexToHSL = (hex: string) => {
  hex = hex.replace('#', '');
  
  let r = parseInt(hex.substring(0, 2), 16) / 255;
  let g = parseInt(hex.substring(2, 4), 16) / 255;
  let b = parseInt(hex.substring(4, 6), 16) / 255;
  
  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);
  
  let h = 0;
  let s = 0;
  let l = (max + min) / 2;

  if (max !== min) {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    
    h = Math.round(h * 60);
  }
  
  s = Math.round(s * 100);
  l = Math.round(l * 100);
  
  return `${h} ${s}% ${l}%`;
};

const AdminTheme = () => {
  const { toast } = useToast();
  const [primaryColor, setPrimaryColor] = useState("#1E293B");
  const [secondaryColor, setSecondaryColor] = useState("#F1F5F9");
  const [accentColor, setAccentColor] = useState("#3B82F6");
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [textColor, setTextColor] = useState("#0F172A");
  const [isSaving, setIsSaving] = useState(false);

  const applyColors = (save = false) => {
    const root = document.documentElement;
    
    root.style.setProperty('--primary', hexToHSL(primaryColor));
    root.style.setProperty('--secondary', hexToHSL(secondaryColor));
    root.style.setProperty('--accent', hexToHSL(accentColor));
    root.style.setProperty('--background', hexToHSL(backgroundColor));
    root.style.setProperty('--foreground', hexToHSL(textColor));
    
    if (save) {
      setIsSaving(true);
      setTimeout(() => {
        setIsSaving(false);
        toast({
          title: "Cambios guardados",
          description: "Los cambios en el tema se han guardado correctamente."
        });
      }, 1000);
    }
  };

  useEffect(() => {
    applyColors();
  }, [primaryColor, secondaryColor, accentColor, backgroundColor, textColor]);

  const handleSaveChanges = () => {
    applyColors(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Tema y Ajustes</h1>
        <p className="text-muted-foreground">
          Personaliza el aspecto de tu sitio web
        </p>
      </div>

      <Tabs defaultValue="colors">
        <TabsList className="grid grid-cols-1 sm:grid-cols-4 w-full">
          <TabsTrigger value="colors">Colores</TabsTrigger>
          <TabsTrigger value="typography">Tipografía</TabsTrigger>
          <TabsTrigger value="logo">Logo y Favicon</TabsTrigger>
          <TabsTrigger value="social">Redes Sociales</TabsTrigger>
        </TabsList>

        <TabsContent value="colors" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Esquema de colores</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Color primario</Label>
                    <div className="flex gap-2">
                      <Input
                        id="primaryColor"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                      />
                      <input
                        type="color"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="w-10 h-10 rounded cursor-pointer"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="secondaryColor">Color secundario</Label>
                    <div className="flex gap-2">
                      <Input
                        id="secondaryColor"
                        value={secondaryColor}
                        onChange={(e) => setSecondaryColor(e.target.value)}
                      />
                      <input
                        type="color"
                        value={secondaryColor}
                        onChange={(e) => setSecondaryColor(e.target.value)}
                        className="w-10 h-10 rounded cursor-pointer"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="accentColor">Color de acento</Label>
                    <div className="flex gap-2">
                      <Input
                        id="accentColor"
                        value={accentColor}
                        onChange={(e) => setAccentColor(e.target.value)}
                      />
                      <input
                        type="color"
                        value={accentColor}
                        onChange={(e) => setAccentColor(e.target.value)}
                        className="w-10 h-10 rounded cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="backgroundColor">Color de fondo</Label>
                    <div className="flex gap-2">
                      <Input
                        id="backgroundColor"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                      />
                      <input
                        type="color"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className="w-10 h-10 rounded cursor-pointer"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="textColor">Color de texto</Label>
                    <div className="flex gap-2">
                      <Input
                        id="textColor"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                      />
                      <input
                        type="color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="w-10 h-10 rounded cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <h3 className="text-lg font-medium mb-4">Vista previa</h3>
                <div 
                  className="p-6 rounded-lg border"
                  style={{ backgroundColor }}
                >
                  <div 
                    className="p-4 rounded-md mb-4" 
                    style={{ backgroundColor: primaryColor, color: "#fff" }}
                  >
                    Color primario
                  </div>
                  <div 
                    className="p-4 rounded-md mb-4" 
                    style={{ backgroundColor: secondaryColor, color: textColor }}
                  >
                    Color secundario
                  </div>
                  <div 
                    className="p-4 rounded-md mb-4" 
                    style={{ backgroundColor: accentColor, color: "#fff" }}
                  >
                    Color de acento
                  </div>
                  <p style={{ color: textColor }}>Este es un ejemplo de texto con el color seleccionado.</p>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleSaveChanges} disabled={isSaving}>
                  {isSaving ? (
                    <>Guardando...</>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Guardar cambios
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="typography" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Tipografía</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="headingFont">Fuente de encabezados</Label>
                    <select 
                      id="headingFont" 
                      className="w-full h-10 px-3 border border-input rounded-md"
                    >
                      <option value="Playfair Display">Playfair Display</option>
                      <option value="Montserrat">Montserrat</option>
                      <option value="Roboto">Roboto</option>
                      <option value="Poppins">Poppins</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bodyFont">Fuente de cuerpo</Label>
                    <select 
                      id="bodyFont" 
                      className="w-full h-10 px-3 border border-input rounded-md"
                    >
                      <option value="Inter">Inter</option>
                      <option value="Roboto">Roboto</option>
                      <option value="Open Sans">Open Sans</option>
                      <option value="Lato">Lato</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="headingSize">Tamaño de encabezado H1</Label>
                    <div className="flex gap-2 items-center">
                      <Input
                        id="headingSize"
                        type="number"
                        defaultValue={36}
                        min={12}
                        max={96}
                      />
                      <span>px</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bodySize">Tamaño de texto de cuerpo</Label>
                    <div className="flex gap-2 items-center">
                      <Input
                        id="bodySize"
                        type="number"
                        defaultValue={16}
                        min={12}
                        max={24}
                      />
                      <span>px</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={() => {
                  toast({
                    title: "Cambios guardados",
                    description: "Los cambios en la tipografía se han guardado correctamente."
                  });
                }}>
                  <Save className="h-4 w-4 mr-2" />
                  Guardar cambios
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logo" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Logo y Favicon</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Logo</h3>
                  <div className="border rounded-md p-10 flex items-center justify-center bg-muted/50">
                    <div className="text-center">
                      <div className="mx-auto h-20 w-20 bg-primary rounded flex items-center justify-center text-white font-bold text-xl">
                        UA
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full" onClick={() => {
                    toast({
                      title: "Acción no disponible",
                      description: "La funcionalidad para subir logo estará disponible próximamente."
                    });
                  }}>
                    <Upload className="h-4 w-4 mr-2" />
                    Subir logo
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Favicon</h3>
                  <div className="border rounded-md p-10 flex items-center justify-center bg-muted/50">
                    <div className="text-center">
                      <div className="mx-auto h-12 w-12 bg-primary rounded flex items-center justify-center text-white font-bold text-sm">
                        U
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full" onClick={() => {
                    toast({
                      title: "Acción no disponible",
                      description: "La funcionalidad para subir favicon estará disponible próximamente."
                    });
                  }}>
                    <Upload className="h-4 w-4 mr-2" />
                    Subir favicon
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={() => {
                  toast({
                    title: "Cambios guardados",
                    description: "Los cambios en logo y favicon se han guardado correctamente."
                  });
                }}>
                  <Save className="h-4 w-4 mr-2" />
                  Guardar cambios
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Redes Sociales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center gap-3">
                    <Facebook className="h-5 w-5 text-blue-600" />
                    <Input 
                      placeholder="URL de Facebook" 
                      defaultValue="https://facebook.com/urdinart"
                    />
                    <input 
                      type="checkbox" 
                      id="showFacebook" 
                      className="h-4 w-4" 
                      defaultChecked
                    />
                    <Label htmlFor="showFacebook" className="text-sm">Mostrar</Label>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Twitter className="h-5 w-5 text-blue-400" />
                    <Input 
                      placeholder="URL de Twitter" 
                      defaultValue="https://twitter.com/urdinart"
                    />
                    <input 
                      type="checkbox" 
                      id="showTwitter" 
                      className="h-4 w-4" 
                      defaultChecked
                    />
                    <Label htmlFor="showTwitter" className="text-sm">Mostrar</Label>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Instagram className="h-5 w-5 text-pink-600" />
                    <Input 
                      placeholder="URL de Instagram" 
                      defaultValue="https://instagram.com/urdinart"
                    />
                    <input 
                      type="checkbox" 
                      id="showInstagram" 
                      className="h-4 w-4" 
                      defaultChecked
                    />
                    <Label htmlFor="showInstagram" className="text-sm">Mostrar</Label>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Linkedin className="h-5 w-5 text-blue-700" />
                    <Input 
                      placeholder="URL de LinkedIn" 
                      defaultValue="https://linkedin.com/company/urdinart"
                    />
                    <input 
                      type="checkbox" 
                      id="showLinkedin" 
                      className="h-4 w-4" 
                      defaultChecked
                    />
                    <Label htmlFor="showLinkedin" className="text-sm">Mostrar</Label>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Youtube className="h-5 w-5 text-red-600" />
                    <Input 
                      placeholder="URL de YouTube" 
                      defaultValue="https://youtube.com/urdinart"
                    />
                    <input 
                      type="checkbox" 
                      id="showYoutube" 
                      className="h-4 w-4" 
                      defaultChecked
                    />
                    <Label htmlFor="showYoutube" className="text-sm">Mostrar</Label>
                  </div>
                </div>
                
                <div className="pt-4 space-y-4">
                  <h3 className="font-medium">Ubicación de iconos sociales</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        id="socialHeader" 
                        className="h-4 w-4" 
                        defaultChecked
                      />
                      <Label htmlFor="socialHeader">Cabecera</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        id="socialFooter" 
                        className="h-4 w-4" 
                        defaultChecked
                      />
                      <Label htmlFor="socialFooter">Pie de página</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        id="socialSidebar" 
                        className="h-4 w-4" 
                        defaultChecked
                      />
                      <Label htmlFor="socialSidebar">Barra lateral</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        id="socialPosts" 
                        className="h-4 w-4" 
                        defaultChecked
                      />
                      <Label htmlFor="socialPosts">Publicaciones</Label>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 space-y-4">
                  <h3 className="font-medium">Botones para compartir</h3>
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="enableShare" 
                      className="h-4 w-4" 
                      defaultChecked
                    />
                    <Label htmlFor="enableShare">Habilitar botones para compartir en publicaciones</Label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={() => {
                  toast({
                    title: "Cambios guardados",
                    description: "Los cambios en las redes sociales se han guardado correctamente."
                  });
                }}>
                  <Save className="h-4 w-4 mr-2" />
                  Guardar cambios
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminTheme;

