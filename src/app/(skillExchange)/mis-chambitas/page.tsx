import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MisChambitasPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Mis Chambitas</h1>
      <p className="text-muted-foreground">
        Administra los servicios que ofreces.
      </p>

      <div className="flex gap-4 mt-4">
        <Button>Nueva chambita</Button>
        <Button variant="outline">Filtrar</Button>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Chambitas activas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            {
              title: "Reparación de computadoras",
              price: "$300 - $800",
              views: 45,
              requests: 3,
            },
            {
              title: "Clases de cocina",
              price: "$200/hora",
              views: 28,
              requests: 2,
            },
            {
              title: "Paseo de perros",
              price: "$100/hora",
              views: 56,
              requests: 5,
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between border-b pb-2"
            >
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-muted-foreground">
                  {item.price} • {item.views} vistas • {item.requests}{" "}
                  solicitudes
                </p>
              </div>
              <div className="flex gap-2">
                <Button size="sm">Ver detalles</Button>
                <Button size="sm" variant="outline">
                  Editar
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Borradores</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[{ title: "Servicio de jardinería", lastEdited: "Hace 2 días" }].map(
            (item, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b pb-2"
              >
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-muted-foreground">
                    Última edición: {item.lastEdited}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm">Continuar</Button>
                  <Button size="sm" variant="outline">
                    Eliminar
                  </Button>
                </div>
              </div>
            )
          )}
        </CardContent>
      </Card>
    </div>
  );
}
