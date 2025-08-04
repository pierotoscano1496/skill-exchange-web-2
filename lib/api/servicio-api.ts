// Tipos para la API
import type {
  Medio,
  ModalidadPagoTipo,
  ServicioDia,
  ServicioModalidad,
  ServicioTipoPrecio,
} from "../constants/enums";

export interface SkillAPI {
  idServicio?: string;
  idSkill: string;
}

export interface DisponibilidadAPI {
  id?: string;
  idServicio?: string;
  dia: ServicioDia;
  horaInicio: string;
  horaFin: string;
}

export interface ModalidadPagoAPI {
  id?: string;
  tipo: ModalidadPagoTipo;
  cuentaBancaria?: string;
  numeroCelular?: string;
  url?: string;
}

export interface RecursosMultimediaAPI {
  id?: string;
  medio: Medio; // "imagen", "video", etc.
  url: string;
}

export interface ServicioRequestBody {
  data: {
    titulo: string;
    descripcion: string;
    precio: number;
    idProveedor: string;
    tipoPrecio: ServicioTipoPrecio;
    precioMinimo?: number;
    precioMaximo?: number;
    ubicacion: string;
    modalidad: ServicioModalidad;
    aceptaTerminos: boolean;
    skills: SkillAPI[];
    disponibilidades: DisponibilidadAPI[];
    modalidadesPago: ModalidadPagoAPI[];
  };
  multimedia: (File | string)[];
}

export interface ServicioResponse {
  id: string;
  titulo: string;
  descripcion: string;
  precio: number;
  idProveedor: string;
  precioMaximo?: number;
  precioMinimo?: number;
  tipoPrecio: ServicioTipoPrecio;
  ubicacion: string;
  modalidad: ServicioModalidad;
  aceptaTerminos: boolean;
  recursosMultimedia: RecursosMultimediaAPI[];
  modalidadesPago: ModalidadPagoAPI[];
  disponibilidades: DisponibilidadAPI[];
  skills: SkillAPI[];
}

// Configuración de la API
const API_BASE_URL = "http://localhost:9081/api";

// Función para subir archivos a S3
export async function uploadFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Error al subir el archivo");
    }

    const result = await response.json();
    return result.url; // Asumiendo que la respuesta contiene la URL del archivo
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}

// Función para crear un servicio
export async function crearServicio(
  requestBody: ServicioRequestBody
): Promise<ServicioResponse> {
  try {
    const formData = new FormData();
    formData.append("data", JSON.stringify(requestBody.data));

    // Adjuntar archivos multimedia
    requestBody.multimedia.forEach((file) => {
      if (file instanceof File) {
        formData.append("multimedia", file);
      }
    });

    const response = await fetch(`${API_BASE_URL}/servicio`, {
      method: "POST",
      body: formData, // FormData se encarga de los headers
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Error ${response.status}: ${response.statusText} - ${errorText}`
      );
    }

    const result: ServicioResponse = await response.json();
    return result;
  } catch (error) {
    console.error("Error creating service:", error);
    throw error;
  }
}

// Función para obtener skills disponibles (asumiendo que existe este endpoint)
export async function obtenerSkills(): Promise<
  { id: string; nombre: string; categoria: string }[]
> {
  try {
    const response = await fetch(`${API_BASE_URL}/skills`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener skills");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching skills:", error);
    return [];
  }
}

// Utilidades para transformar datos del formulario al formato de la API
export function transformarHorario(hora: string): {
  hour: number;
  minute: number;
  second: number;
  nano: number;
} {
  const [hourStr, minuteStr] = hora.split(":");
  return {
    hour: Number.parseInt(hourStr, 10),
    minute: Number.parseInt(minuteStr, 10),
    second: 0,
    nano: 0,
  };
}

export function transformarDisponibilidades(disponibilidad: {
  dias: ServicioDia[];
  horaInicio: string;
  horaFin: string;
}): DisponibilidadAPI[] {
  return disponibilidad.dias.map((dia) => ({
    dia,
    horaInicio: disponibilidad.horaInicio,
    horaFin: disponibilidad.horaFin,
  }));
}
