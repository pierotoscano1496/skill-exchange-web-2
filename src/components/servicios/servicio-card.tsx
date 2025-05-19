import ServicioResponse from "@/interfaces/responsebody/servicio/ServicioResponse";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface ServicioProps {
  servicio: ServicioResponse;
  forPublic?: boolean;
}

const ServicioCard = ({ servicio, forPublic = false }: ServicioProps) => {
  return (
    <Card className="flex flex-row gap-4 items-start p-4 h-full">
      <div className="flex flex-col flex-1 gap-2">
        <h3 className="font-semibold text-lg">{servicio.titulo}</h3>
        <p className="text-muted-foreground">
          {servicio.descripcion.substring(0, 100)}...
        </p>
        <p className="font-semibold">S/. {servicio.precio}</p>
        {forPublic && (
          <p className="text-xs text-muted-foreground">
            Creado por:{" "}
            {`${servicio.usuario.nombres} ${servicio.usuario.apellidos}`}
          </p>
        )}
        <Button asChild variant="link" className="px-0 py-0 h-auto w-fit">
          <Link href={`/servicio/details/${servicio.id}`}>Ver más</Link>
        </Button>
      </div>
      {servicio.urlImagePreview && (
        <div className="w-32 h-32 relative rounded overflow-hidden bg-muted shrink-0">
          <Image
            src={servicio.urlImagePreview}
            alt={servicio.titulo}
            fill
            style={{ objectFit: "cover" }}
            sizes="128px"
          />
        </div>
      )}
    </Card>
  );
};

export default ServicioCard;
