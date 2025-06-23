// Tipos para la API
import type { ModalidadPagoTipo, ServicioDia, ServicioModalidad, ServicioTipoPrecio } from "../constants/enums"

export interface SkillAPI {
  idServicio?: string
  idSkill: string
}

export interface DisponibilidadAPI {
  idServicio?: string
  dia: ServicioDia
  horaInicio: {
    hour: number
    minute: number
    second: number
    nano: number
  }
  horaFin: {
    hour: number
    minute: number
    second: number
    nano: number
  }
}

export interface ModalidadPagoAPI {
  tipo: ModalidadPagoTipo
  cuentaBancaria?: string
  numeroCelular?: string
  url?: string
}

export interface ServicioRequestBody {
  data: {
    titulo: string
    descripcion: string
    precio: number
    idProveedor: string
    tipoPrecio: ServicioTipoPrecio
    precioMinimo?: number
    precioMaximo?: number
    ubicacion: string
    modalidad: ServicioModalidad
    aceptaTerminos: boolean
    skills: SkillAPI[]
    disponibilidades: DisponibilidadAPI[]
    modalidadesPago: ModalidadPagoAPI[]
  }
  multimedia: string[]
}

export interface ServicioResponse {
  success: boolean
  message: string
  data?: {
    id: string
    titulo: string
    // otros campos de respuesta
  }
}

// Configuración de la API
const API_BASE_URL = "http://localhost:9081/api"

// Función para subir archivos a S3
export async function uploadFile(file: File): Promise<string> {
  const formData = new FormData()
  formData.append("file", file)

  try {
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error("Error al subir el archivo")
    }

    const result = await response.json()
    return result.url // Asumiendo que la respuesta contiene la URL del archivo
  } catch (error) {
    console.error("Error uploading file:", error)
    throw error
  }
}

// Función para crear un servicio
export async function crearServicio(requestBody: ServicioRequestBody): Promise<ServicioResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/servicio`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    const result: ServicioResponse = await response.json()
    return result
  } catch (error) {
    console.error("Error creating service:", error)
    throw error
  }
}

// Función para obtener skills disponibles (asumiendo que existe este endpoint)
export async function obtenerSkills(): Promise<{ id: string; nombre: string; categoria: string }[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/skills`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Error al obtener skills")
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching skills:", error)
    return []
  }
}

// Utilidades para transformar datos del formulario al formato de la API
export function transformarHorario(hora: string): { hour: number; minute: number; second: number; nano: number } {
  const [hourStr, minuteStr] = hora.split(":")
  return {
    hour: Number.parseInt(hourStr, 10),
    minute: Number.parseInt(minuteStr, 10),
    second: 0,
    nano: 0,
  }
}

export function transformarDisponibilidades(disponibilidad: {
  dias: ServicioDia[]
  horaInicio: string
  horaFin: string
}): DisponibilidadAPI[] {
  return disponibilidad.dias.map((dia) => ({
    dia,
    horaInicio: transformarHorario(disponibilidad.horaInicio),
    horaFin: transformarHorario(disponibilidad.horaFin),
  }))
}
