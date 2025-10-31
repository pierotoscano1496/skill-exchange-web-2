"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getServiceById, updateService } from "@/lib/actions/data";
import {
  ServicioDetalle,
  ModalidadPagoServicio,
  RecursoMultimediaServicioResponse,
} from "@/lib/types/api-responses";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { ModalidadPagoTipo, ServicioTipoPrecio } from "@/lib/constants/enums";
import { EditPaymentMethodDialog } from "@/components/servicios/edit-payment-method-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Edit, Plus } from "lucide-react";

const formatearInfoModalidad = (modalidad: ModalidadPagoServicio) => {
  switch (modalidad.tipo) {
    case ModalidadPagoTipo.YAPE:
      return `Celular: ${modalidad.numeroCelular}`;
    case ModalidadPagoTipo.TARJETA:
      return `Cuenta: ***${modalidad.cuentaBancaria?.slice(-4)}`;
    case ModalidadPagoTipo.LINEA:
      return `URL: ${modalidad.url}`;
    case ModalidadPagoTipo.EFECTIVO:
      return "Pago al momento del servicio";
    default:
      return "";
  }
};

export default function Page() {
  const [servicio, setServicio] = useState<ServicioDetalle | null>(null);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tipoPrecio, setTipoPrecio] = useState<ServicioTipoPrecio>(
    ServicioTipoPrecio.FIJO
  );
  const [precio, setPrecio] = useState(0);
  const [precioMinimo, setPrecioMinimo] = useState<number | undefined>(0);
  const [precioMaximo, setPrecioMaximo] = useState<number | undefined>(0);
  const [metodosPago, setMetodosPago] = useState<ModalidadPagoServicio[]>([]);
  const [newMultimedia, setNewMultimedia] = useState<File[]>([]);
  const [yapeMultimedia, setYapeMultimedia] = useState<File | null>(null);
  const [existingMultimedia, setExistingMultimedia] = useState<
    RecursoMultimediaServicioResponse[]
  >([]);
  const [multimediaToDelete, setMultimediaToDelete] = useState<string[]>([]);
  const [modalidadesPagoToDelete, setModalidadesPagoToDelete] = useState<
    string[]
  >([]);

  const params = useParams();
  const router = useRouter();
  const { idServicio } = params;

  useEffect(() => {
    if (idServicio) {
      getServiceById(idServicio as string).then((response) => {
        if (response.success) {
          const data = response.data;
          setServicio(data);
          setTitulo(data.titulo);
          setDescripcion(data.descripcion);
          setTipoPrecio(data.tipoPrecio);
          setPrecio(data.precio);
          setPrecioMinimo(data.precioMinimo);
          setPrecioMaximo(data.precioMaximo);
          setMetodosPago(data.modalidadesPago);
          setExistingMultimedia(data.recursosMultimedia || []);
        }
      });
    }
  }, [idServicio]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!servicio) return;

    const serviceData = {
      titulo,
      descripcion,
      tipoPrecio,
      precio,
      precioMinimo,
      precioMaximo,
      modalidadesPago: metodosPago,
      idRecursosMultimediaToDelete: multimediaToDelete,
      idModalidadesPagoToDelete: modalidadesPagoToDelete,
    };

    const formData = new FormData();
    formData.append(
      "data",
      new Blob([JSON.stringify(serviceData)], { type: "application/json" })
    );

    newMultimedia.forEach((file) => {
      formData.append("multimedia", file, file.name);
    });

    if (yapeMultimedia) {
      formData.set("yapeMultimedia", yapeMultimedia, yapeMultimedia.name);
    }

    const result = await updateService(servicio.id, formData);

    if (result.success) {
      toast.success("Servicio actualizado con éxito");
      router.push("/mis-chambitas");
    } else {
      toast.error("Error al actualizar el servicio", {
        description: result.message,
      });
    }
  };

  const handleMetodoPagoChange = (
    index: number,
    metodo: ModalidadPagoServicio,
    yapeFile?: File
  ) => {
    const newMetodosPago = [...metodosPago];
    newMetodosPago[index] = metodo;
    setMetodosPago(newMetodosPago);
    if (metodo.tipo === ModalidadPagoTipo.YAPE && yapeFile) {
      setYapeMultimedia(yapeFile);
    }
  };

  const addMetodoPago = (metodo: ModalidadPagoServicio, yapeFile?: File) => {
    console.log("Agregando método");
    if (
      metodo.tipo === ModalidadPagoTipo.YAPE &&
      metodosPago.some((m) => m.tipo === ModalidadPagoTipo.YAPE)
    ) {
      console.warn("Solo se puede agregar un método de pago Yape.");
      return;
    }
    setMetodosPago([...metodosPago, metodo]);
    if (metodo.tipo === ModalidadPagoTipo.YAPE && yapeFile) {
      setYapeMultimedia(yapeFile);
    }
  };

  const removeMetodoPago = (index: number) => {
    setModalidadesPagoToDelete([
      ...modalidadesPagoToDelete,
      metodosPago[index].id,
    ]);

    const newMetodosPago = [...metodosPago];
    newMetodosPago.splice(index, 1);
    setMetodosPago(newMetodosPago);

    if (metodosPago[index].tipo === ModalidadPagoTipo.YAPE) {
      setYapeMultimedia(null);
    }
  };

  const handleRemoveExistingMultimedia = (id: string) => {
    setMultimediaToDelete([...multimediaToDelete, id]);
    setExistingMultimedia(existingMultimedia.filter((m) => m.id !== id));
  };

  const handleRemoveNewMultimedia = (index: number) => {
    const newFiles = [...newMultimedia];
    newFiles.splice(index, 1);
    setNewMultimedia(newFiles);
  };

  const handleNewMultimediaChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      setNewMultimedia([...newMultimedia, ...Array.from(e.target.files)]);
    }
  };

  if (!servicio) {
    return <div>Cargando...</div>;
  }

  const hasYape = metodosPago.some((m) => m.tipo === ModalidadPagoTipo.YAPE);

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-6">Editar Servicio</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="titulo">Título</Label>
          <Input
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="descripcion">Descripción</Label>
          <Textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <Label>Tipo de Precio</Label>
          <RadioGroup
            value={tipoPrecio}
            onValueChange={(e) => setTipoPrecio(e as ServicioTipoPrecio)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={ServicioTipoPrecio.FIJO} id="fijo" />
              <Label htmlFor="fijo">Fijo</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={ServicioTipoPrecio.RANGO} id="rango" />
              <Label htmlFor="rango">Rango</Label>
            </div>
          </RadioGroup>
        </div>
        {tipoPrecio === "fijo" || tipoPrecio === "hora" ? (
          <div className="mb-4">
            <Label htmlFor="precio">Precio</Label>
            <Input
              id="precio"
              type="number"
              value={precio}
              onChange={(e) => setPrecio(Number(e.target.value))}
            />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="precioMinimo">Precio Mínimo</Label>
              <Input
                id="precioMinimo"
                type="number"
                value={precioMinimo}
                onChange={(e) => setPrecioMinimo(Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="precioMaximo">Precio Máximo</Label>
              <Input
                id="precioMaximo"
                type="number"
                value={precioMaximo}
                onChange={(e) => setPrecioMaximo(Number(e.target.value))}
              />
            </div>
          </div>
        )}

        <div className="mb-4">
          <Label>Recursos Multimedia Actuales</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {existingMultimedia.map((media) => (
              <div key={media.id} className="relative">
                <img
                  src={media.url}
                  alt="Recurso multimedia"
                  className="w-full h-auto rounded-md"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-1 right-1 h-6 w-6"
                  onClick={() => handleRemoveExistingMultimedia(media.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <Label>Nuevos Recursos Multimedia</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
            {newMultimedia.map((file, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt="Nuevo recurso"
                  className="w-full h-auto rounded-md"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-1 right-1 h-6 w-6"
                  onClick={() => handleRemoveNewMultimedia(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <Input
            id="multimedia"
            type="file"
            multiple
            onChange={handleNewMultimediaChange}
          />
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Métodos de Pago</h2>
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Modalidades de pago</CardTitle>
                </div>
                <EditPaymentMethodDialog
                  onSave={addMetodoPago}
                  hasYape={hasYape}
                >
                  <Button type="button" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Agregar
                  </Button>
                </EditPaymentMethodDialog>
              </div>
            </CardHeader>
            <CardContent>
              {metodosPago.length > 0 ? (
                <div className="space-y-4">
                  {metodosPago.map((modalidad, index) => {
                    return (
                      <Card key={index} className="bg-muted/30">
                        <CardContent className="p-4 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div>
                              <h4 className="font-semibold">
                                {modalidad.tipo}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {formatearInfoModalidad(modalidad)}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <EditPaymentMethodDialog
                              metodo={modalidad}
                              onSave={(editedMetodo, yapeFile) =>
                                handleMetodoPagoChange(
                                  index,
                                  editedMetodo,
                                  yapeFile
                                )
                              }
                              hasYape={
                                hasYape &&
                                modalidad.tipo !== ModalidadPagoTipo.YAPE
                              }
                            >
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </EditPaymentMethodDialog>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeMetodoPago(index)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">
                                Eliminar modalidad
                              </span>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center p-6 border-2 border-dashed rounded-lg">
                  <h3 className="mt-4 text-lg font-medium">
                    No has agregado modalidades de pago
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Agrega al menos una forma de pago para que los clientes
                    puedan contratarte.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <Button type="submit">Guardar Cambios</Button>
      </form>
    </div>
  );
}
