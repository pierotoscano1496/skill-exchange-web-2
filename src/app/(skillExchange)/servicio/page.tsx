import { searchServicioWithParams } from "@/actions/servicio.actions";
import SearchServicioForm from "@/components/busqueda-servicio/SearchServicioForm";
import ServicioCard from "@/components/servicios/servicio-card";
import SEServicio from "@/components/servicios/SEServicio";
import SEContainer from "@/components/skill-exchange/containers/SEContainer";
import SEGridContainer from "@/components/skill-exchange/containers/SEGridContainer";
import SEParragraph from "@/components/skill-exchange/text/SEParragraph";
import { Card } from "@/components/ui/card";
import SearchServiciosParametersBody from "@/interfaces/requestbody/servicio/SearchServiciosParametersBody";

type Props = {
  searchParams: Promise<SearchServiciosParametersBody>;
};

const ServicioPage = async ({ searchParams }: Props) => {
  const servicios = await searchServicioWithParams(await searchParams);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <Card className="min-h-[100vh] flex-1 bg-muted/50 md:min-h-min p-6">
        <div className="flex flex-col gap-6">
          <SearchServicioForm />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {servicios.length > 0 ? (
              servicios.map((s) => (
                <ServicioCard key={s.id} servicio={s} forPublic={true} />
              ))
            ) : (
              <p className="text-muted-foreground text-center col-span-2">
                Sin resultados
              </p>
            )}
          </div>
        </div>
      </Card>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <Card className="aspect-video bg-muted/50" />
        <Card className="aspect-video bg-muted/50" />
        <Card className="aspect-video bg-muted/50" />
      </div>
    </div>
  );
};

ServicioPage.displayName = "ServicioPage";

export default ServicioPage;
