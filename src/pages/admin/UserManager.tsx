
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Edit, Save, Loader2, Search, Check, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { UserRole } from "@/contexts/AuthContext";

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  role: UserRole;
  created_at: string;
}

const UserManager = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  // Cargar usuarios
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        
        // En una app real, aquí cargarías los usuarios desde Supabase
        // const { data, error } = await supabase
        //   .from('profiles')
        //   .select('*');
        
        // if (error) throw error;
        
        // Datos de ejemplo para desarrollo
        const mockUsers: UserProfile[] = [
          {
            id: "1",
            email: "admin@urdinart.com",
            full_name: "Admin User",
            role: "admin",
            created_at: "2023-01-15T10:00:00Z"
          },
          {
            id: "2",
            email: "editor@urdinart.com",
            full_name: "Editor User",
            avatar_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
            role: "editor",
            created_at: "2023-02-20T14:30:00Z"
          },
          {
            id: "3",
            email: "writer@urdinart.com",
            full_name: "Writer User",
            role: "writer",
            created_at: "2023-03-10T09:15:00Z"
          },
          {
            id: "4",
            email: "user@urdinart.com",
            full_name: "Regular User",
            role: "user",
            created_at: "2023-04-05T16:45:00Z"
          }
        ];
        
        setUsers(mockUsers);
        setFilteredUsers(mockUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast({
          title: "Error al cargar usuarios",
          description: "No se pudieron cargar los usuarios.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUsers();
  }, [toast]);

  // Filtrar usuarios según la búsqueda
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredUsers(users);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = users.filter(
      user => 
        user.full_name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query)
    );
    
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  const handleEdit = (user: UserProfile) => {
    setEditingUser({ ...user });
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    setEditingUser({
      id: "",
      email: "",
      full_name: "",
      role: "user",
      created_at: new Date().toISOString()
    });
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editingUser) {
      setEditingUser({ ...editingUser, [name]: value });
    }
  };

  const handleRoleChange = (value: string) => {
    if (editingUser) {
      setEditingUser({ ...editingUser, role: value as UserRole });
    }
  };

  const handleSaveUser = async () => {
    if (!editingUser) return;
    
    try {
      setIsSaving(true);
      
      // Validar campos
      if (!editingUser.email || !editingUser.full_name) {
        toast({
          title: "Error al guardar",
          description: "Todos los campos son obligatorios.",
          variant: "destructive"
        });
        return;
      }
      
      if (isEditing) {
        // Actualizar usuario existente
        // En una app real, aquí actualizarías el usuario en Supabase
        // const { error } = await supabase
        //   .from('profiles')
        //   .update({
        //     full_name: editingUser.full_name,
        //     role: editingUser.role
        //   })
        //   .eq('id', editingUser.id);
        
        // if (error) throw error;
        
        setUsers(users.map(user => 
          user.id === editingUser.id ? editingUser : user
        ));
        
        toast({
          title: "Usuario actualizado",
          description: `Se ha actualizado el usuario ${editingUser.full_name}.`
        });
      } else {
        // Crear nuevo usuario
        // En una app real, aquí crearías el usuario en Supabase Auth y Profiles
        // const { data, error } = await supabase.auth.signUp({
        //   email: editingUser.email,
        //   password: "temporaryPassword123", // En un caso real, generarías una contraseña aleatoria
        //   options: {
        //     data: {
        //       full_name: editingUser.full_name
        //     }
        //   }
        // });
        
        // if (error) throw error;
        
        const newUser = {
          ...editingUser,
          id: String(Date.now()), // En una app real, esto vendría de Supabase
          created_at: new Date().toISOString()
        };
        
        setUsers([...users, newUser]);
        
        toast({
          title: "Usuario creado",
          description: `Se ha creado el usuario ${editingUser.full_name}.`
        });
      }
      
      setIsDialogOpen(false);
      setEditingUser(null);
      
    } catch (error) {
      console.error("Error saving user:", error);
      toast({
        title: "Error al guardar",
        description: "Ocurrió un error al guardar el usuario.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      // En una app real, aquí eliminarías el usuario de Supabase
      // const { error } = await supabase
      //   .from('profiles')
      //   .delete()
      //   .eq('id', id);
      
      // if (error) throw error;
      
      setUsers(users.filter(user => user.id !== id));
      
      toast({
        title: "Usuario eliminado",
        description: "El usuario ha sido eliminado correctamente."
      });
      
    } catch (error) {
      console.error("Error deleting user:", error);
      toast({
        title: "Error al eliminar",
        description: "Ocurrió un error al eliminar el usuario.",
        variant: "destructive"
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getRoleBadgeClasses = (role: UserRole) => {
    switch (role) {
      case 'master':
        return "bg-purple-100 text-purple-800";
      case 'admin':
        return "bg-red-100 text-red-800";
      case 'editor':
        return "bg-blue-100 text-blue-800";
      case 'writer':
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Gestión de Usuarios</h1>
        <p className="text-muted-foreground">
          Administra los usuarios y sus permisos en la plataforma
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Usuarios</CardTitle>
          <Button onClick={handleAddNew}>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Usuario
          </Button>
        </CardHeader>
        <CardContent>
          <div className="relative w-full max-w-sm mb-6">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar usuarios..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              {filteredUsers.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Usuario</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Rol</TableHead>
                      <TableHead>Fecha de registro</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                              {user.avatar_url ? (
                                <img 
                                  src={user.avatar_url} 
                                  alt={user.full_name} 
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <span className="text-xs font-medium">
                                  {user.full_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                </span>
                              )}
                            </div>
                            <span className="font-medium">{user.full_name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${getRoleBadgeClasses(user.role)}`}>
                            {user.role}
                          </span>
                        </TableCell>
                        <TableCell>{formatDate(user.created_at)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(user)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(user.id)}
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
                <div className="text-center py-8 text-muted-foreground">
                  No se encontraron usuarios que coincidan con la búsqueda.
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? `Editar Usuario: ${editingUser?.full_name}` : "Nuevo Usuario"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="full_name">Nombre Completo</Label>
              <Input
                id="full_name"
                name="full_name"
                value={editingUser?.full_name || ""}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={editingUser?.email || ""}
                onChange={handleInputChange}
                disabled={isEditing} // No permitir cambiar el email de usuarios existentes
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Rol</Label>
              <Select 
                value={editingUser?.role} 
                onValueChange={handleRoleChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="writer">Escritor</SelectItem>
                  <SelectItem value="user">Usuario</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
            <Button onClick={handleSaveUser} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Guardar
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManager;
