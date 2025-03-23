
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileUpload } from "@/components/ui/file-upload";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Edit, Save, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AboutEditor = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  
  const [generalData, setGeneralData] = useState({
    title: "Sobre Nosotros",
    subtitle: "Conozca nuestra historia y visión",
    mainContent: "Somos un estudio de diseño y desarrollo web fundado en 2020. Nos especializamos en crear experiencias digitales únicas que combinan estética y funcionalidad. Nuestro equipo está formado por diseñadores y desarrolladores apasionados que trabajan juntos para ofrecer soluciones creativas a problemas complejos.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    vision: "Nuestra visión es transformar la manera en que las marcas conectan con su audiencia a través del diseño digital innovador y centrado en el usuario.",
    mission: "Ayudar a empresas de todos los tamaños a destacar en el entorno digital con diseños funcionales, atractivos y significativos."
  });

  const [teamMembers, setTeamMembers] = useState([
    {
      id: "1",
      name: "Ana García",
      position: "Directora Creativa",
      bio: "Ana tiene más de 10 años de experiencia en diseño digital y ha trabajado con marcas reconocidas internacionalmente.",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
    },
    {
      id: "2",
      name: "Carlos Pérez",
      position: "Desarrollador Senior",
      bio: "Especialista en tecnologías frontend con amplia experiencia en la creación de interfaces interactivas.",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
    },
    {
      id: "3",
      name: "Laura Martínez",
      position: "Diseñadora UX/UI",
      bio: "Apasionada por crear experiencias de usuario intuitivas y visualmente atractivas.",
      photo: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91"
    }
  ]);

  const [editingMember, setEditingMember] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setGeneralData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGeneralImageChange = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGeneralData(prev => ({
          ...prev,
          image: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTeamMember = () => {
    setEditingMember({
      id: String(Date.now()),
      name: "",
      position: "",
      bio: "",
      photo: ""
    });
    setIsDialogOpen(true);
  };

  const handleEditTeamMember = (member: any) => {
    setEditingMember({ ...member });
    setIsDialogOpen(true);
  };

  const handleMemberInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditingMember(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMemberPhotoChange = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingMember(prev => ({
          ...prev,
          photo: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveMember = () => {
    if (editingMember) {
      const exists = teamMembers.some(member => member.id === editingMember.id);
      
      if (exists) {
        setTeamMembers(members =>
          members.map(member => member.id === editingMember.id ? editingMember : member)
        );
      } else {
        setTeamMembers(members => [...members, editingMember]);
      }
      
      setIsDialogOpen(false);
      setEditingMember(null);
    }
  };

  const handleDeleteMember = (id: string) => {
    setTeamMembers(members => members.filter(member => member.id !== id));
  };

  const handleSaveAll = async () => {
    try {
      setIsSaving(true);
      
      // En una app real, aquí guardarías los datos a la base de datos
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "¡Guardado con éxito!",
        description: "Se ha actualizado la sección 'Sobre Nosotros' correctamente."
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
          <h1 className="text-2xl font-bold mb-2">Editor de Sobre Nosotros</h1>
          <p className="text-muted-foreground">
            Personaliza la información sobre tu empresa y equipo
          </p>
        </div>
        <Button onClick={handleSaveAll} disabled={isSaving}>
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
          <TabsTrigger value="general">Información General</TabsTrigger>
          <TabsTrigger value="team">Equipo</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Información General</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título Principal</Label>
                    <Input
                      id="title"
                      name="title"
                      value={generalData.title}
                      onChange={handleGeneralChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subtitle">Subtítulo</Label>
                    <Input
                      id="subtitle"
                      name="subtitle"
                      value={generalData.subtitle}
                      onChange={handleGeneralChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="mainContent">Contenido Principal</Label>
                    <Textarea
                      id="mainContent"
                      name="mainContent"
                      value={generalData.mainContent}
                      onChange={handleGeneralChange}
                      rows={5}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Imagen Principal</Label>
                    <div className="mb-4">
                      {generalData.image && (
                        <div className="relative w-full h-40 rounded-md overflow-hidden mb-2">
                          <img 
                            src={generalData.image} 
                            alt="About us" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <FileUpload
                        accept="image/*"
                        onFileChange={handleGeneralImageChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="vision">Nuestra Visión</Label>
                    <Textarea
                      id="vision"
                      name="vision"
                      value={generalData.vision}
                      onChange={handleGeneralChange}
                      rows={2}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="mission">Nuestra Misión</Label>
                    <Textarea
                      id="mission"
                      name="mission"
                      value={generalData.mission}
                      onChange={handleGeneralChange}
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Equipo</CardTitle>
              <Button onClick={handleAddTeamMember}>
                <Plus className="h-4 w-4 mr-2" />
                Añadir miembro
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Foto</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Cargo</TableHead>
                    <TableHead>Biografía</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teamMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="h-10 w-10 rounded-full overflow-hidden">
                          {member.photo && (
                            <img 
                              src={member.photo} 
                              alt={member.name}
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell>{member.position}</TableCell>
                      <TableCell className="max-w-xs truncate">{member.bio}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditTeamMember(member)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteMember(member.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingMember && editingMember.name ? `Editar ${editingMember.name}` : "Nuevo miembro del equipo"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                name="name"
                value={editingMember?.name || ""}
                onChange={handleMemberInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="position">Cargo</Label>
              <Input
                id="position"
                name="position"
                value={editingMember?.position || ""}
                onChange={handleMemberInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bio">Biografía</Label>
              <Textarea
                id="bio"
                name="bio"
                value={editingMember?.bio || ""}
                onChange={handleMemberInputChange}
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Foto</Label>
              <div className="mb-2">
                {editingMember?.photo && (
                  <div className="relative w-24 h-24 rounded-full overflow-hidden mb-2 mx-auto">
                    <img 
                      src={editingMember.photo} 
                      alt="Team member" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <FileUpload
                  accept="image/*"
                  onFileChange={handleMemberPhotoChange}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveMember}>
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AboutEditor;
