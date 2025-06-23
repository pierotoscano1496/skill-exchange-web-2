export default function ServiciosPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Servicios</h1>
      <p className="text-muted-foreground">Explore nuestro catálogo de servicios disponibles.</p>

      <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="rounded-xl bg-muted/50 p-6">
            <h2 className="text-lg font-semibold mb-2">Servicio #{i}</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Descripción breve del servicio y sus características principales.
            </p>
            <div className="flex justify-between items-center">
              <span className="font-medium">{i % 3 === 0 ? "Premium" : i % 3 === 1 ? "Estándar" : "Básico"}</span>
              <button className="text-sm px-3 py-1 rounded-md bg-primary text-primary-foreground">Solicitar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
