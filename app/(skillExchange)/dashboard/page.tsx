import { Card } from "@/components/ui/card"

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-muted-foreground">Bienvenido a tu panel de control.</p>

      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <Card className="aspect-video bg-muted/50" />
        <Card className="aspect-video bg-muted/50" />
        <Card className="aspect-video bg-muted/50" />
      </div>
      <Card className="min-h-[100vh] flex-1 bg-muted/50 md:min-h-min" />
    </div>
  )
}
