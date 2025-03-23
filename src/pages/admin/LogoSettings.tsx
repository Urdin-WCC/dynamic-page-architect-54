
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FileUpload } from "@/components/ui/file-upload";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ImagePlus, Save, Loader2 } from "lucide-react";

const LogoSettings = () => {
  const [logo, setLogo] = useState<File | null>(null);
  const [favicon, setFavicon] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [faviconPreview, setFaviconPreview] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleLogoChange = (file: File | null) => {
    setLogo(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFaviconChange = (file: File | null) => {
    setFavicon(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFaviconPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      
      // En una aplicación real, aquí subirías los archivos al servidor
      // o a un servicio de almacenamiento como Supabase Storage
      
      // Ejemplo de cómo podría ser con Supabase:
      if (logo) {
        // const { data, error } = await supabase.storage
        //   .from('site-assets')
        //   .upload('logo.png', logo, {
        //     upsert: true,
        //     contentType: logo.type
        //   });
        
        // if (error) throw error;
      }
      
      if (favicon) {
        // const { data, error } = await supabase.storage
        //   .from('site-assets')
        //   .upload('favicon.ico', favicon, {
        //     upsert: true,
        //     contentType: favicon.type
        //   });
        
        // if (error) throw error;
      }

      // Simulamos una operación asincrónica
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "¡Guardado con éxito!",
        description: "Se han actualizado el logo y el favicon."
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
      <div>
        <h1 className="text-2xl font-bold mb-2">Logo y Favicon</h1>
        <p className="text-muted-foreground">
          Personaliza el logo y el favicon de tu sitio web
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Logo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 h-48">
              {logoPreview ? (
                <div className="flex flex-col gap-4 items-center">
                  <img 
                    src={logoPreview} 
                    alt="Logo preview" 
                    className="max-h-32 max-w-full object-contain" 
                  />
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setLogo(null);
                      setLogoPreview(null);
                    }}
                  >
                    Eliminar
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-center">
                  <ImagePlus className="h-10 w-10 text-muted-foreground/50" />
                  <p className="text-muted-foreground">Arrastra y suelta tu logo aquí o haz clic para seleccionar</p>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="logo-upload">Subir logo</Label>
              <FileUpload
                id="logo-upload"
                accept="image/*"
                value={logo}
                onFileChange={handleLogoChange}
              />
              <p className="text-sm text-muted-foreground">
                Formato recomendado: PNG o SVG. Tamaño máximo: 1MB.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Favicon</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 h-48">
              {faviconPreview ? (
                <div className="flex flex-col gap-4 items-center">
                  <img 
                    src={faviconPreview} 
                    alt="Favicon preview" 
                    className="max-h-32 max-w-full object-contain" 
                  />
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setFavicon(null);
                      setFaviconPreview(null);
                    }}
                  >
                    Eliminar
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-center">
                  <ImagePlus className="h-10 w-10 text-muted-foreground/50" />
                  <p className="text-muted-foreground">Arrastra y suelta tu favicon aquí o haz clic para seleccionar</p>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="favicon-upload">Subir favicon</Label>
              <FileUpload
                id="favicon-upload"
                accept="image/x-icon,image/png,image/svg+xml"
                value={favicon}
                onFileChange={handleFaviconChange}
              />
              <p className="text-sm text-muted-foreground">
                Formato recomendado: ICO, PNG o SVG. Tamaño: 32x32px o 16x16px.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
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
    </div>
  );
};

export default LogoSettings;
