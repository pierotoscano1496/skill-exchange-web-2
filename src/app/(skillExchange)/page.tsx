import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">¡Hola, María!</h1>
      <p className="text-muted-foreground">
        Aquí tienes un resumen de tu actividad reciente.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {[
          { title: "Chambitas activas", value: "3" },
          { title: "Solicitudes nuevas", value: "5" },
          { title: "Mensajes sin leer", value: "2" },
          { title: "Ganancias del mes", value: "$1,250" },
        ].map((stat, i) => (
          <Card key={i} className="bg-primary/10">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
        {[
          { title: "Nueva chambita", description: "Publica un nuevo servicio" },
          {
            title: "Buscar servicios",
            description: "Encuentra chambitas cerca de ti",
          },
          { title: "Ver mensajes", description: "Revisa tus conversaciones" },
          {
            title: "Invitar amigos",
            description: "Gana $100 por cada referido",
          },
        ].map((action, i) => (
          <Card key={i} className="bg-muted/50">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <CardTitle className="text-lg mb-2">{action.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {action.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Actividad reciente</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            {
              title: "Nueva solicitud",
              description: "Juan quiere contratar tu servicio de jardinería",
              time: "Hace 30 min",
            },
            {
              title: "Mensaje nuevo",
              description:
                "Ana te envió un mensaje sobre tu chambita de reparaciones",
              time: "Hace 2 horas",
            },
            {
              title: "Pago recibido",
              description: "Recibiste $350 por tu servicio de paseo de perros",
              time: "Hace 1 día",
            },
          ].map((activity, i) => (
            <div
              key={i}
              className="flex items-center justify-between border-b pb-2"
            >
              <div>
                <p className="font-medium">{activity.title}</p>
                <p className="text-sm text-muted-foreground">
                  {activity.description}
                </p>
              </div>
              <span className="text-sm text-muted-foreground">
                {activity.time}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Popular Near You */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Chambitas populares cerca de ti</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Reparación de celulares",
                price: "$200 - $500",
                distance: "2 km",
              },
              {
                title: "Clases de guitarra",
                price: "$150/hora",
                distance: "5 km",
              },
              {
                title: "Paseo de perros",
                price: "$100/hora",
                distance: "1 km",
              },
            ].map((item, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <h3 className="font-medium">{item.title}</h3>
                  <div className="flex justify-between mt-2 text-sm">
                    <span>{item.price}</span>
                    <span className="text-muted-foreground">
                      A {item.distance}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
