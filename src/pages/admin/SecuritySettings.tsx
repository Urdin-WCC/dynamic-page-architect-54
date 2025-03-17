
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Shield, Eye, EyeOff, Save } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

// Mock users
const mockUsers = [
  { id: "1", name: "Admin User", email: "admin@urdinart.com", role: "admin", lastLogin: "2023-06-22" },
  { id: "2", name: "Editor User", email: "editor@urdinart.com", role: "editor", lastLogin: "2023-06-20" },
  { id: "3", name: "Writer User", email: "writer@urdinart.com", role: "writer", lastLogin: "2023-06-18" },
  { id: "4", name: "Basic User", email: "user@urdinart.com", role: "user", lastLogin: "2023-06-15" },
];

const AdminSecurity = () => {
  const { user } = useAuth();
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [maintenanceMessage, setMaintenanceMessage] = useState("Sitio en mantenimiento. Volveremos pronto.");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Seguridad</h1>
        <p className="text-muted-foreground">
          Gestiona los usuarios, contraseñas y ajustes de seguridad
        </p>
      </div>

      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">Usuarios</TabsTrigger>
          <TabsTrigger value="password">Contraseña</TabsTrigger>
          <TabsTrigger value="maintenance">Modo Mantenimiento</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>Gestionar Usuarios</CardTitle>
              {user?.role === "master" && (
                <Button onClick={() => setIsAddUserDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Añadir Usuario
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Último acceso</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">{user?.name}</TableCell>
                    <TableCell>{user?.email}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                        {user?.role}
                      </span>
                    </TableCell>
                    <TableCell>Ahora</TableCell>
                    <TableCell className="text-right">
                      <span className="text-xs text-muted-foreground">
                        (Tú)
                      </span>
                    </TableCell>
                  </TableRow>
                  {mockUsers.map((mockUser) => (
                    <TableRow key={mockUser.id}>
                      <TableCell className="font-medium">{mockUser.name}</TableCell>
                      <TableCell>{mockUser.email}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          mockUser.role === "admin" ? "bg-blue-100 text-blue-800" :
                          mockUser.role === "editor" ? "bg-green-100 text-green-800" :
                          mockUser.role === "writer" ? "bg-yellow-100 text-yellow-800" :
                          "bg-gray-100 text-gray-800"
                        }`}>
                          {mockUser.role}
                        </span>
                      </TableCell>
                      <TableCell>{mockUser.lastLogin}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" title="Editar">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Eliminar">
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
          
          {/* Add User Dialog */}
          <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Añadir nuevo usuario</DialogTitle>
                <DialogDescription>
                  Crea una cuenta para un nuevo miembro del equipo
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input id="name" placeholder="Nombre completo" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="correo@ejemplo.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Rol</Label>
                  <select 
                    id="role" 
                    className="w-full h-10 px-3 border border-input rounded-md"
                  >
                    <option value="admin">Admin</option>
                    <option value="editor">Editor</option>
                    <option value="writer">Writer</option>
                    <option value="user">User</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <div className="relative">
                    <Input 
                      id="password" 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Contraseña" 
                    />
                    <button 
                      type="button"
                      className="absolute right-3 top-2.5 text-muted-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div className="pt-4 flex justify-end gap-4">
                  <Button variant="outline" onClick={() => setIsAddUserDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button>
                    Crear usuario
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </TabsContent>
        
        <TabsContent value="password" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Cambiar contraseña</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Contraseña actual</Label>
                <div className="relative">
                  <Input 
                    id="currentPassword" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                  />
                  <button 
                    type="button"
                    className="absolute right-3 top-2.5 text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">Nueva contraseña</Label>
                <Input 
                  id="newPassword" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                />
                <p className="text-sm text-muted-foreground">
                  La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas y números.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar nueva contraseña</Label>
                <Input 
                  id="confirmPassword" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                />
              </div>
              <div className="pt-4 flex justify-end">
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Cambiar contraseña
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="maintenance" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Modo Mantenimiento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="maintenanceMode"
                  checked={maintenanceMode}
                  onChange={() => setMaintenanceMode(!maintenanceMode)}
                  className="h-4 w-4"
                />
                <Label htmlFor="maintenanceMode" className="font-medium">
                  Activar modo mantenimiento
                </Label>
              </div>
              <p className="text-sm text-muted-foreground">
                Cuando el modo mantenimiento está activo, los visitantes verán un mensaje personalizado en lugar del sitio web. Los administradores podrán acceder normalmente.
              </p>
              
              <div className="pt-4 space-y-2">
                <Label htmlFor="maintenanceMessage">Mensaje de mantenimiento</Label>
                <textarea
                  id="maintenanceMessage"
                  value={maintenanceMessage}
                  onChange={(e) => setMaintenanceMessage(e.target.value)}
                  className="w-full min-h-[100px] p-3 rounded-md border border-input resize-none"
                />
              </div>
              
              <div className="pt-4">
                <h3 className="text-lg font-medium mb-4">Vista previa</h3>
                <div className="p-8 rounded-lg border bg-muted/30 flex flex-col items-center justify-center text-center">
                  <Shield className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-bold mb-2">Modo Mantenimiento</h3>
                  <p className="text-muted-foreground max-w-md mb-4">{maintenanceMessage}</p>
                  <Button variant="outline">
                    Panel de Administración
                  </Button>
                </div>
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button>
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

export default AdminSecurity;
