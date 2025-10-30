export default function ContratosPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Contratos</h1>
      <p className="text-muted-foreground">Administre sus contratos y documentos legales.</p>

      <div className="mt-6 rounded-xl bg-muted/50 p-6">
        <h2 className="text-xl font-semibold mb-4">Contratos vigentes</h2>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center justify-between border-b pb-2">
              <div>
                <p className="font-medium">Contrato #{20000 + i}</p>
                <p className="text-sm text-muted-foreground">Tipo: {i % 2 === 0 ? "Servicios" : "Productos"}</p>
              </div>
              <div className="flex gap-2">
                <button className="text-sm px-3 py-1 rounded-md bg-primary text-primary-foreground">Ver</button>
                <button className="text-sm px-3 py-1 rounded-md bg-muted text-muted-foreground">Descargar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
