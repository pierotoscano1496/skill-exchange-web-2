import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Star } from "lucide-react";

export default function ExplorarPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Explorar Chambitas</h1>
      <p className="text-muted-foreground">
        Descubre servicios disponibles cerca de ti.
      </p>

      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <div className="relative flex-1">
          <Input placeholder="¿Qué chambita necesitas?" className="pl-10" />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        <Select>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Todas las categorías" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las categorías</SelectItem>
            <SelectItem value="hogar">Hogar</SelectItem>
            <SelectItem value="tecnologia">Tecnología</SelectItem>
            <SelectItem value="educacion">Educación</SelectItem>
            <SelectItem value="mascotas">Mascotas</SelectItem>
            <SelectItem value="belleza">Belleza</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Distancia" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Cualquier distancia</SelectItem>
            <SelectItem value="1km">Menos de 1 km</SelectItem>
            <SelectItem value="5km">Menos de 5 km</SelectItem>
            <SelectItem value="10km">Menos de 10 km</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 mt-6">
        {[
          { name: "Hogar", icon: "🏠" },
          { name: "Tecnología", icon: "💻" },
          { name: "Educación", icon: "📚" },
          { name: "Mascotas", icon: "🐾" },
          { name: "Belleza", icon: "💇" },
          { name: "Transporte", icon: "🚗" },
        ].map((category) => (
          <Card
            key={category.name}
            className="bg-muted/30 hover:bg-muted/50 cursor-pointer transition-colors"
          >
            <CardContent className="p-4 text-center">
              <div className="text-3xl mb-2">{category.icon}</div>
              <h3 className="font-medium text-sm">{category.name}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Popular services */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Chambitas populares</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Reparación de celulares",
                provider: "Carlos M.",
                rating: 4.8,
                reviews: 56,
                price: "$200 - $500",
                distance: "2 km",
                image: "📱",
              },
              {
                title: "Clases de guitarra",
                provider: "Ana L.",
                rating: 4.9,
                reviews: 32,
                price: "$150/hora",
                distance: "5 km",
                image: "🎸",
              },
              {
                title: "Paseo de perros",
                provider: "Roberto G.",
                rating: 4.7,
                reviews: 89,
                price: "$100/hora",
                distance: "1 km",
                image: "🐕",
              },
              {
                title: "Corte de cabello",
                provider: "Laura T.",
                rating: 4.9,
                reviews: 124,
                price: "$180",
                distance: "3 km",
                image: "✂️",
              },
              {
                title: "Plomería",
                provider: "Miguel R.",
                rating: 4.6,
                reviews: 45,
                price: "$250 - $800",
                distance: "4 km",
                image: "🔧",
              },
              {
                title: "Limpieza de hogar",
                provider: "Sofía P.",
                rating: 4.8,
                reviews: 76,
                price: "$300",
                distance: "2 km",
                image: "🧹",
              },
            ].map((item, i) => (
              <Card key={i} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-3xl">{item.image}</div>
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.provider}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center text-sm mb-2">
                    <span className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1 fill-current" />
                      {item.rating}
                    </span>
                    <span className="mx-2 text-muted-foreground">•</span>
                    <span className="text-muted-foreground">
                      {item.reviews} reseñas
                    </span>
                  </div>
                  <div className="flex justify-between mt-2 text-sm">
                    <span className="font-medium">{item.price}</span>
                    <span className="text-muted-foreground">
                      A {item.distance}
                    </span>
                  </div>
                  <Button className="w-full mt-3" size="sm">
                    Ver detalles
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Near you */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Cerca de ti</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Jardinería",
                provider: "Pedro S.",
                rating: 4.5,
                reviews: 28,
                price: "$200 - $600",
                distance: "0.8 km",
                image: "🌱",
              },
              {
                title: "Reparación de bicicletas",
                provider: "Javier M.",
                rating: 4.7,
                reviews: 19,
                price: "$150 - $300",
                distance: "1.2 km",
                image: "🚲",
              },
              {
                title: "Cuidado de niños",
                provider: "María G.",
                rating: 4.9,
                reviews: 42,
                price: "$120/hora",
                distance: "1.5 km",
                image: "👶",
              },
            ].map((item, i) => (
              <Card key={i} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-3xl">{item.image}</div>
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.provider}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center text-sm mb-2">
                    <span className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1 fill-current" />
                      {item.rating}
                    </span>
                    <span className="mx-2 text-muted-foreground">•</span>
                    <span className="text-muted-foreground">
                      {item.reviews} reseñas
                    </span>
                  </div>
                  <div className="flex justify-between mt-2 text-sm">
                    <span className="font-medium">{item.price}</span>
                    <span className="text-muted-foreground">
                      A {item.distance}
                    </span>
                  </div>
                  <Button className="w-full mt-3" size="sm">
                    Ver detalles
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
