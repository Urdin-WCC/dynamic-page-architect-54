
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Edit, Save, Loader2, MoveUp, MoveDown } from "lucide-react";

// Datos de ejemplo para la navegación
const initialNavItems = [
  { id: "1", name: "Inicio", href: "/", isActive: true },
  { id: "2", name: "Servicios", href: "/services", isActive: true },
  { id: "3", name: "Portfolio", href: "/portfolio", isActive: true },
  { id: "4", name: "Blog", href: "/blog", isActive: true },
  { id: "5", name: "Sobre nosotros", href: "/about", isActive: true },
  { id: "6", name: "Contacto", href: "/contact", isActive: true },
];

const HeaderEditor = () => {
  const [navItems, setNavItems] = useState(initialNavItems);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleToggleActive = (id: string) => {
    setNavItems(items =>
      items.map(item => item.id === id ? { ...item, isActive: !item.isActive } : item)
    );
  };

  const handleEdit = (item: any) => {
    setEditingItem({ ...item });
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    setEditingItem({
      id: String(Date.now()),
      name: "",
      href: "",
      isActive: true
    });
    setIsDialogOpen(true);
  };

  const handleSaveItem = () => {
    if (editingItem) {
      const exists = navItems.some(item => item.id === editingItem.id);
      
      if (exists) {
        setNavItems(items =>
          items.map(item => item.id === editingItem.id ? editingItem : item)
        );
      } else {
        setNavItems(items => [...items, editingItem]);
      }
      
      setIsDialogOpen(false);
      setEditingItem(null);
    }
  };

  const handleDelete = (id: string) => {
    setNavItems(items => items.filter(item => item.id !== id));
  };

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      const newItems = [...navItems];
      const temp = newItems[index];
      newItems[index] = newItems[index - 1];
      newItems[index - 1] = temp;
      setNavItems(newItems);
    }
  };

  const handleMoveDown = (index: number) => {
    if (index < navItems.length - 1) {
      const newItems = [...navItems];
      const temp = newItems[index];
      newItems[index] = newItems[index + 1];
      newItems[index + 1] = temp;
      setNavItems(newItems);
    }
  };

  const handleSaveAll = async () => {
    try {
      setIsSaving(true);
      
      // En una app real, aquí guardarías los datos a la base de datos
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "¡Guardado con éxito!",
        description: "Se han actualizado los elementos de navegación."
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
          <h1 className="text-2xl font-bold mb-2">Editor de Cabecera</h1>
          <p className="text-muted-foreground">
            Personaliza los elementos de navegación de la cabecera de tu sitio
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

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Elementos de Navegación</CardTitle>
          <Button onClick={handleAddNew}>
            <Plus className="h-4 w-4 mr-2" />
            Añadir elemento
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Enlace</TableHead>
                <TableHead>Activo</TableHead>
                <TableHead>Orden</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {navItems.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.href}</TableCell>
                  <TableCell>
                    <Switch
                      checked={item.isActive}
                      onCheckedChange={() => handleToggleActive(item.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        disabled={index === 0}
                        onClick={() => handleMoveUp(index)}
                      >
                        <MoveUp className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        disabled={index === navItems.length - 1}
                        onClick={() => handleMoveDown(index)}
                      >
                        <MoveDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(item)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(item.id)}
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingItem && editingItem.name ? `Editar ${editingItem.name}` : "Nuevo elemento de navegación"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                value={editingItem?.name || ""}
                onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                placeholder="Ejemplo: Inicio, Servicios, etc."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="href">Enlace</Label>
              <Input
                id="href"
                value={editingItem?.href || ""}
                onChange={(e) => setEditingItem({ ...editingItem, href: e.target.value })}
                placeholder="Ejemplo: /, /about, /services, etc."
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="active"
                checked={editingItem?.isActive || false}
                onCheckedChange={(checked) => setEditingItem({ ...editingItem, isActive: checked })}
              />
              <Label htmlFor="active">Activo</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveItem}>
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HeaderEditor;
