
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layout, Edit, Trash2, Plus, Eye } from "lucide-react";

// Mock data
const mockPages = [
  { id: "1", title: "Inicio", sections: 4, lastUpdated: "2023-06-20" },
  { id: "2", title: "Sobre nosotros", sections: 3, lastUpdated: "2023-06-15" },
  { id: "3", title: "Servicios", sections: 5, lastUpdated: "2023-06-12" },
  { id: "4", title: "Contacto", sections: 2, lastUpdated: "2023-06-10" },
];

const mockSections = [
  { id: "1", title: "Hero Principal", page: "Inicio", type: "Hero", lastUpdated: "2023-06-20" },
  { id: "2", title: "Servicios Destacados", page: "Inicio", type: "Grid", lastUpdated: "2023-06-19" },
  { id: "3", title: "Sobre Nosotros", page: "Inicio", type: "Content", lastUpdated: "2023-06-18" },
  { id: "4", title: "Llamada a la Acción", page: "Inicio", type: "CTA", lastUpdated: "2023-06-17" },
  { id: "5", title: "Historia", page: "Sobre nosotros", type: "Content", lastUpdated: "2023-06-15" },
  { id: "6", title: "Equipo", page: "Sobre nosotros", type: "Team", lastUpdated: "2023-06-14" },
  { id: "7", title: "Testimonios", page: "Sobre nosotros", type: "Testimonials", lastUpdated: "2023-06-13" },
];

const mockComponents = [
  { id: "1", title: "Cabecera", type: "Header", lastUpdated: "2023-06-22" },
  { id: "2", title: "Pie de Página", type: "Footer", lastUpdated: "2023-06-21" },
  { id: "3", title: "Barra Lateral", type: "Sidebar", lastUpdated: "2023-06-20" },
  { id: "4", title: "Newsletter", type: "Component", lastUpdated: "2023-06-19" },
];

const AdminContent = () => {
  const [activeTab, setActiveTab] = useState("pages");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Gestor de Contenido</h1>
        <p className="text-muted-foreground">
          Administra las páginas, secciones y componentes de tu sitio web
        </p>
      </div>

      <Tabs defaultValue="pages" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="pages">Páginas</TabsTrigger>
          <TabsTrigger value="sections">Secciones</TabsTrigger>
          <TabsTrigger value="components">Componentes</TabsTrigger>
        </TabsList>
        
        <div className="pt-4 flex justify-between">
          <h2 className="text-xl font-medium">
            {activeTab === "pages" && "Páginas"}
            {activeTab === "sections" && "Secciones"}
            {activeTab === "components" && "Componentes"}
          </h2>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            {activeTab === "pages" && "Nueva página"}
            {activeTab === "sections" && "Nueva sección"}
            {activeTab === "components" && "Nuevo componente"}
          </Button>
        </div>
        
        <TabsContent value="pages" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockPages.map((page) => (
              <Card key={page.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{page.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground mb-4">
                    <p>{page.sections} secciones</p>
                    <p>Última actualización: {page.lastUpdated}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Layout className="h-4 w-4 mr-2" />
                      Editar layout
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Ver
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="sections" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {mockSections.map((section) => (
              <Card key={section.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex justify-between">
                    {section.title}
                    <span className="text-sm px-2 py-1 bg-secondary rounded-md">
                      {section.type}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground mb-4">
                    <p>Página: {section.page}</p>
                    <p>Última actualización: {section.lastUpdated}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Eliminar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="components" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockComponents.map((component) => (
              <Card key={component.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{component.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground mb-4">
                    <p>Tipo: {component.type}</p>
                    <p>Última actualización: {component.lastUpdated}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminContent;
