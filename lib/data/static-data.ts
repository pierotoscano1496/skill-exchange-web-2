import { ServicioResponse } from "../api/servicio-api";
import {
  Medio,
  ModalidadPagoTipo,
  ServicioDia,
  ServicioModalidad,
  ServicioTipoPrecio,
} from "../constants/enums";
import type {
  ApiResponse,
  Skill,
  Categoria,
  ServicioCreado,
  UploadResponse,
  ServicioBusqueda,
  BusquedaServiciosRequest,
  ServicioDetalle,
  ReviewsServicio,
  SolicitudRecibida,
  SolicitudEnviada,
  OwnLastMessage,
  SkillAsignadoResponse,
} from "../types/api-responses";

// Skills estáticos (solo los datos, sin ApiResponse wrapper)
export const STATIC_SKILLS: Skill[] = [
  {
    id: "skill-1",
    nombre: "Reparación de celulares",
    categoria: "tecnologia",
    descripcion: "Reparación y mantenimiento de dispositivos móviles",
  },
  {
    id: "skill-2",
    nombre: "Clases de guitarra",
    categoria: "educacion",
    descripcion: "Enseñanza de guitarra para principiantes y avanzados",
  },
  {
    id: "skill-3",
    nombre: "Paseo de perros",
    categoria: "mascotas",
    descripcion: "Cuidado y paseo de mascotas",
  },
  {
    id: "skill-4",
    nombre: "Corte de cabello",
    categoria: "belleza",
    descripcion: "Servicios de peluquería y estilismo",
  },
  {
    id: "skill-5",
    nombre: "Plomería",
    categoria: "hogar",
    descripcion: "Reparaciones e instalaciones de plomería",
  },
  {
    id: "skill-6",
    nombre: "Limpieza de hogar",
    categoria: "hogar",
    descripcion: "Servicios de limpieza doméstica",
  },
];

// Categorías estáticas (solo los datos, sin ApiResponse wrapper)
export const STATIC_CATEGORIAS: Categoria[] = [
  {
    id: "cat-1",
    nombre: "Hogar",
    descripcion: "Servicios para el hogar",
    subcategorias: [
      { id: "sub-1", nombre: "Limpieza", categoriaId: "cat-1" },
      { id: "sub-2", nombre: "Reparaciones", categoriaId: "cat-1" },
      { id: "sub-3", nombre: "Jardinería", categoriaId: "cat-1" },
    ],
  },
  {
    id: "cat-2",
    nombre: "Tecnología",
    descripcion: "Servicios tecnológicos",
    subcategorias: [
      {
        id: "sub-4",
        nombre: "Reparación de dispositivos",
        categoriaId: "cat-2",
      },
      { id: "sub-5", nombre: "Desarrollo web", categoriaId: "cat-2" },
      { id: "sub-6", nombre: "Soporte técnico", categoriaId: "cat-2" },
    ],
  },
  {
    id: "cat-3",
    nombre: "Educación",
    descripcion: "Servicios educativos",
    subcategorias: [
      { id: "sub-7", nombre: "Clases particulares", categoriaId: "cat-3" },
      { id: "sub-8", nombre: "Idiomas", categoriaId: "cat-3" },
      { id: "sub-9", nombre: "Música", categoriaId: "cat-3" },
    ],
  },
];

// Servicios estáticos para búsqueda
export const STATIC_SERVICIOS: ServicioBusqueda[] = [
  {
    id: "servicio-1",
    proveedor: {
      id: "user-1", // Este es el usuario actual en modo estático
      dni: "12345678",
      tipoDocumento: "dni",
      correo: "carlos@email.com",
      nombres: "Carlos",
      apellidos: "Mendoza",
      fechaNacimiento: "1990-05-15",
      introduccion:
        "Técnico especializado en reparación de celulares con 5 años de experiencia",
      perfilLinkedin: "https://linkedin.com/in/carlos-mendoza",
    },
    titulo: "Reparación de celulares",
    descripcion:
      "Servicio profesional de reparación de smartphones y tablets. Cambio de pantallas, baterías, y más.",
    precio: 200,
    precioMaximo: 500,
    precioMinimo: 150,
    tipoPrecio: "rango",
    ubicacion: "Lima, Perú",
    modalidad: "presencial",
    aceptaTerminos: true,
    disponibilidades: [
      {
        id: "disp-1",
        idServicio: "servicio-1",
        dia: "lunes",
        horaInicio: { hour: 9, minute: 0, second: 0, nano: 0 },
        horaFin: { hour: 18, minute: 0, second: 0, nano: 0 },
      },
      {
        id: "disp-2",
        idServicio: "servicio-1",
        dia: "martes",
        horaInicio: { hour: 9, minute: 0, second: 0, nano: 0 },
        horaFin: { hour: 18, minute: 0, second: 0, nano: 0 },
      },
    ],
    skills: [{ idServicio: "servicio-1", idSkill: "skill-1" }],
    modalidadesPago: [
      {
        id: "pago-1",
        tipo: "yape",
        numeroCelular: "987654321",
      },
      {
        id: "pago-2",
        tipo: "efectivo",
      },
    ],
    urlImagePreview: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "servicio-2",
    proveedor: {
      id: "user-1", // Este es el usuario actual en modo estático
      dni: "87654321",
      tipoDocumento: "dni",
      correo: "carlos@email.com",
      nombres: "Carlos",
      apellidos: "Mendoza",
      fechaNacimiento: "1985-08-22",
      introduccion: "Profesional con experiencia en múltiples áreas",
      perfilInstagram: "https://instagram.com/carlos_mendoza",
    },
    titulo: "Clases de guitarra",
    descripcion:
      "Clases personalizadas de guitarra para todos los niveles. Método adaptado a cada estudiante.",
    precio: 150,
    tipoPrecio: "hora",
    ubicacion: "Lima, Perú",
    modalidad: "mixto",
    aceptaTerminos: true,
    disponibilidades: [
      {
        id: "disp-3",
        idServicio: "servicio-2",
        dia: "miercoles",
        horaInicio: { hour: 16, minute: 0, second: 0, nano: 0 },
        horaFin: { hour: 20, minute: 0, second: 0, nano: 0 },
      },
      {
        id: "disp-4",
        idServicio: "servicio-2",
        dia: "sabado",
        horaInicio: { hour: 10, minute: 0, second: 0, nano: 0 },
        horaFin: { hour: 16, minute: 0, second: 0, nano: 0 },
      },
    ],
    skills: [{ idServicio: "servicio-2", idSkill: "skill-2" }],
    modalidadesPago: [
      {
        id: "pago-3",
        tipo: "yape",
        numeroCelular: "912345678",
      },
      {
        id: "pago-4",
        tipo: "tarjeta",
        url: "https://payment-link.com/ana-guitar",
      },
    ],
    urlImagePreview: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "servicio-3",
    proveedor: {
      id: "user-1", // Este es el usuario actual en modo estático
      dni: "11223344",
      tipoDocumento: "dni",
      correo: "carlos@email.com",
      nombres: "Carlos",
      apellidos: "Mendoza",
      fechaNacimiento: "1992-03-10",
      introduccion:
        "Amante de los animales, especializado en cuidado de mascotas",
    },
    titulo: "Paseo de perros",
    descripcion:
      "Servicio confiable de paseo y cuidado de perros. Experiencia con todas las razas.",
    precio: 100,
    tipoPrecio: "hora",
    ubicacion: "Lima, Perú",
    modalidad: "presencial",
    aceptaTerminos: true,
    disponibilidades: [
      {
        id: "disp-5",
        idServicio: "servicio-3",
        dia: "lunes",
        horaInicio: { hour: 7, minute: 0, second: 0, nano: 0 },
        horaFin: { hour: 10, minute: 0, second: 0, nano: 0 },
      },
      {
        id: "disp-6",
        idServicio: "servicio-3",
        dia: "martes",
        horaInicio: { hour: 7, minute: 0, second: 0, nano: 0 },
        horaFin: { hour: 10, minute: 0, second: 0, nano: 0 },
      },
    ],
    skills: [{ idServicio: "servicio-3", idSkill: "skill-3" }],
    modalidadesPago: [
      {
        id: "pago-5",
        tipo: "yape",
        numeroCelular: "998877665",
      },
      {
        id: "pago-6",
        tipo: "efectivo",
      },
    ],
    urlImagePreview: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "servicio-4",
    proveedor: {
      id: "user-1", // Este es el usuario actual en modo estático
      dni: "11223344",
      tipoDocumento: "dni",
      correo: "carlos@email.com",
      nombres: "Carlos",
      apellidos: "Mendoza",
      fechaNacimiento: "1992-03-10",
      introduccion:
        "Amante de los animales, especializado en cuidado de mascotas",
    },
    titulo: "Servicio de jardinería",
    descripcion:
      "Mantenimiento y diseño de jardines. Poda, siembra y cuidado de plantas.",
    precio: 120,
    tipoPrecio: "hora",
    ubicacion: "Lima, Perú",
    modalidad: "presencial",
    aceptaTerminos: true,
    disponibilidades: [
      {
        id: "disp-7",
        idServicio: "servicio-4",
        dia: "jueves",
        horaInicio: { hour: 8, minute: 0, second: 0, nano: 0 },
        horaFin: { hour: 16, minute: 0, second: 0, nano: 0 },
      },
      {
        id: "disp-8",
        idServicio: "servicio-4",
        dia: "viernes",
        horaInicio: { hour: 8, minute: 0, second: 0, nano: 0 },
        horaFin: { hour: 16, minute: 0, second: 0, nano: 0 },
      },
    ],
    skills: [{ idServicio: "servicio-4", idSkill: "skill-6" }],
    modalidadesPago: [
      {
        id: "pago-7",
        tipo: "efectivo",
      },
    ],
    urlImagePreview: "/placeholder.svg?height=200&width=300",
  },
];

// Solicitudes recibidas estáticas (como prestamista)
export const STATIC_SOLICITUDES_PRESTAMISTA: SolicitudRecibida[] = [
  {
    id: "match-1",
    servicio: STATIC_SERVICIOS[0], // Reparación de celulares
    cliente: {
      id: "cliente-1",
      dni: "87654321",
      tipoDocumento: "dni",
      correo: "maria.garcia@email.com",
      nombres: "Usuario de Ejemplo",
      apellidos: "García",
      fechaNacimiento: "1988-03-20",
      introduccion: "Necesito reparar mi celular urgentemente",
    },
    fecha: "2024-01-15T10:30:00.000Z",
    fechaInicio: "2024-01-16T09:00:00.000Z",
    fechaCierre: "2024-01-23T18:00:00.000Z",
    estado: "solicitado",
    puntuacion: 0,
    costo: 250,
    mensaje:
      "Hola, necesito reparar la pantalla de mi iPhone 13. ¿Podrías ayudarme? Tengo disponibilidad mañana por la tarde.",
  },
  {
    id: "match-2",
    servicio: STATIC_SERVICIOS[1], // Clases de guitarra
    cliente: {
      id: "cliente-2",
      dni: "11223344",
      tipoDocumento: "dni",
      correo: "juan.perez@email.com",
      nombres: "Juan",
      apellidos: "Pérez",
      fechaNacimiento: "1995-07-12",
      introduccion: "Quiero aprender a tocar guitarra desde cero",
    },
    fecha: "2024-01-14T16:45:00.000Z",
    fechaInicio: "2024-01-17T16:00:00.000Z",
    fechaCierre: "2024-01-24T20:00:00.000Z",
    estado: "pendiente_pago",
    puntuacion: 0,
    costo: 150,
    mensaje:
      "Me interesa tomar clases de guitarra. Soy principiante total. ¿Cuándo podríamos empezar?",
  },
  {
    id: "match-3",
    servicio: STATIC_SERVICIOS[2], // Paseo de perros
    cliente: {
      id: "cliente-3",
      dni: "55667788",
      tipoDocumento: "dni",
      correo: "ana.lopez@email.com",
      nombres: "Ana",
      apellidos: "López",
      fechaNacimiento: "1990-11-05",
      introduccion: "Dueña de un Golden Retriever muy activo",
    },
    fecha: "2024-01-13T08:20:00.000Z",
    fechaInicio: "2024-01-15T07:00:00.000Z",
    fechaCierre: "2024-01-22T10:00:00.000Z",
    estado: "ejecucion",
    puntuacion: 0,
    costo: 100,
    mensaje:
      "Necesito que paseen a mi perro Max los lunes y martes por las mañanas. Es muy amigable y obediente.",
  },
  {
    id: "match-4",
    servicio: STATIC_SERVICIOS[0], // Reparación de celulares
    cliente: {
      id: "cliente-4",
      dni: "99887766",
      tipoDocumento: "dni",
      correo: "carlos.ruiz@email.com",
      nombres: "Carlos",
      apellidos: "Ruiz",
      fechaNacimiento: "1985-12-18",
      introduccion: "Empresario que necesita su teléfono funcionando",
    },
    fecha: "2024-01-12T14:15:00.000Z",
    fechaInicio: "2024-01-13T09:00:00.000Z",
    fechaCierre: "2024-01-20T18:00:00.000Z",
    estado: "finalizado",
    puntuacion: 5,
    costo: 180,
    mensaje:
      "Mi Samsung Galaxy se quedó sin sonido. ¿Podrías revisarlo? Es urgente por trabajo.",
  },
  {
    id: "match-5",
    servicio: STATIC_SERVICIOS[3], // Jardinería
    cliente: {
      id: "cliente-5",
      dni: "44556677",
      tipoDocumento: "dni",
      correo: "lucia.torres@email.com",
      nombres: "Lucía",
      apellidos: "Torres",
      fechaNacimiento: "1992-04-25",
      introduccion: "Ama las plantas pero no tiene tiempo para cuidarlas",
    },
    fecha: "2024-01-11T11:30:00.000Z",
    fechaInicio: "2024-01-12T08:00:00.000Z",
    fechaCierre: "2024-01-19T16:00:00.000Z",
    estado: "rechazado",
    puntuacion: 0,
    costo: 120,
    mensaje:
      "Hola, necesito que mantengan mi jardín. Tengo muchas plantas que requieren cuidado especializado.",
  },
];

export const STATIC_SKILLS_ASIGNADOS: SkillAsignadoResponse[] = [
  {
    id: "skill-1",
    descripcion: "Reparación y mantenimiento de dispositivos móviles",
    nombreSubCategoria: "Reparación de dispositivos",
    nombreCategoria: "Tecnología",
    nivelConocimiento: 4,
    descripcionDesempeno: "Experto en reparación de celulares y tablets, manejo de herramientas especializadas y diagnóstico avanzado.",
  },
  {
    id: "skill-2",
    descripcion: "Enseñanza de guitarra para principiantes y avanzados",
    nombreSubCategoria: "Música",
    nombreCategoria: "Educación",
    nivelConocimiento: 5,
    descripcionDesempeno: "Profesor con experiencia en clases grupales e individuales, método adaptado a cada estudiante.",
  },
  {
    id: "skill-3",
    descripcion: "Cuidado y paseo de mascotas",
    nombreSubCategoria: "Jardinería",
    nombreCategoria: "Hogar",
    nivelConocimiento: 3,
    descripcionDesempeno: "Responsable y puntual, experiencia con perros de diferentes razas y tamaños.",
  },
  {
    id: "skill-4",
    descripcion: "Servicios de peluquería y estilismo",
    nombreSubCategoria: "Belleza",
    nombreCategoria: "Hogar",
    nivelConocimiento: 4,
    descripcionDesempeno: "Especialista en cortes modernos y clásicos, atención personalizada.",
  },
  {
    id: "skill-5",
    descripcion: "Reparaciones e instalaciones de plomería",
    nombreSubCategoria: "Reparaciones",
    nombreCategoria: "Hogar",
    nivelConocimiento: 3,
    descripcionDesempeno: "Solución rápida y eficiente de problemas de plomería doméstica.",
  },
  {
    id: "skill-6",
    descripcion: "Servicios de limpieza doméstica",
    nombreSubCategoria: "Limpieza",
    nombreCategoria: "Hogar",
    nivelConocimiento: 5,
    descripcionDesempeno: "Limpieza profunda y mantenimiento regular, uso de productos ecológicos.",
  },
];

// NUEVO: Solicitudes enviadas estáticas (como cliente)
export const STATIC_SOLICITUDES_ENVIADAS: SolicitudEnviada[] = [
  {
    id: "solicitud-enviada-1",
    servicio: STATIC_SERVICIOS[0],
    proveedor: STATIC_SERVICIOS[0].proveedor,
    fecha: "2024-01-15T10:30:00Z",
    fechaInicio: "2024-01-16T09:00:00Z",
    fechaCierre: "2024-01-16T17:00:00Z",
    estado: "solicitado",
    puntuacion: 0,
    costo: 150,
    mensaje:
      "Hola, estoy interesado en reparar la pantalla de mi celular. ¿Podrías ayudarme? Tengo disponibilidad mañana por la tarde.",
  },
  {
    id: "solicitud-enviada-2",
    servicio: STATIC_SERVICIOS[1],
    proveedor: STATIC_SERVICIOS[1].proveedor,
    fecha: "2024-01-14T14:20:00Z",
    fechaInicio: "2024-01-15T10:00:00Z",
    fechaCierre: "2024-01-15T18:00:00Z",
    estado: "pendiente_pago",
    puntuacion: 0,
    costo: 200,
    mensaje:
      "Estoy interesado en este servicio, pero necesito más información sobre los horarios.",
  },
  {
    id: "solicitud-enviada-3",
    servicio: STATIC_SERVICIOS[2],
    proveedor: STATIC_SERVICIOS[2].proveedor,
    fecha: "2024-01-13T16:45:00Z",
    fechaInicio: "2024-01-14T08:00:00Z",
    fechaCierre: "2024-01-14T16:00:00Z",
    estado: "ejecucion",
    puntuacion: 0,
    costo: 300,
    mensaje: "Todo en orden, gracias.",
  },
  {
    id: "solicitud-enviada-4",
    servicio: STATIC_SERVICIOS[3],
    proveedor: STATIC_SERVICIOS[3].proveedor,
    fecha: "2024-01-12T11:15:00Z",
    fechaInicio: "2024-01-13T09:00:00Z",
    fechaCierre: "2024-01-13T17:00:00Z",
    estado: "finalizado",
    puntuacion: 5,
    costo: 180,
    mensaje: "Todo en orden, gracias.",
  },
  {
    id: "solicitud-enviada-5",
    servicio: STATIC_SERVICIOS[0], // Reutilizamos el primer servicio
    proveedor: STATIC_SERVICIOS[0].proveedor,
    fecha: "2024-01-11T13:30:00Z",
    fechaInicio: "2024-01-12T10:00:00Z",
    fechaCierre: "2024-01-12T18:00:00Z",
    estado: "rechazado",
    puntuacion: 0,
    costo: 250,
    mensaje: "No estoy interesado en este servicio.",
  },
];

// Reviews estáticas por servicio
export const STATIC_REVIEWS: {
  idServicio: string;
  comentarios: any[];
  puntajePromedio: number;
}[] = [
  {
    idServicio: "servicio-1",
    comentarios: [
      {
        id: "comment-1-servicio-1",
        idServicio: "servicio-1",
        idComentarista: "user-2",
        nombresComentarista: "Usuario de Ejemplo",
        apellidosComentarista: "González",
        comentario: "Excelente servicio, muy profesional y puntual.",
        puntaje: 5,
      },
      {
        id: "comment-2-servicio-1",
        idServicio: "servicio-1",
        idComentarista: "user-3",
        nombresComentarista: "Juan",
        apellidosComentarista: "Pérez",
        comentario: "Buen servicio, pero podría mejorar en la comunicación.",
        puntaje: 4,
      },
    ],
    puntajePromedio: 4.5,
  },
  {
    idServicio: "servicio-2",
    comentarios: [
      {
        id: "comment-1-servicio-2",
        idServicio: "servicio-2",
        idComentarista: "user-4",
        nombresComentarista: "Laura",
        apellidosComentarista: "Martínez",
        comentario: "Muy satisfecha con las clases, lo recomiendo.",
        puntaje: 5,
      },
    ],
    puntajePromedio: 5.0,
  },
];

// Función para simular búsqueda de servicios
export function buscarServiciosEstaticos(
  filtros: BusquedaServiciosRequest
): ServicioBusqueda[] {
  let resultados = [...STATIC_SERVICIOS];

  // Filtrar por palabra clave
  if (filtros.keyWord) {
    const keyword = filtros.keyWord.toLowerCase();
    resultados = resultados.filter(
      (servicio) =>
        servicio.titulo.toLowerCase().includes(keyword) ||
        servicio.descripcion.toLowerCase().includes(keyword) ||
        servicio.proveedor.nombres.toLowerCase().includes(keyword) ||
        servicio.proveedor.apellidos.toLowerCase().includes(keyword)
    );
  }

  // Filtrar por skill
  if (filtros.idSkill) {
    resultados = resultados.filter((servicio) =>
      servicio.skills.some((skill) => skill.idSkill === filtros.idSkill)
    );
  }

  // Filtrar por subcategoría (simulado)
  if (filtros.idSubcategoria) {
    // En un caso real, esto requeriría mapear skills a subcategorías
    resultados = resultados.filter(
      (servicio) => servicio.id !== "servicio-999"
    ); // Placeholder
  }

  // Filtrar por categoría (simulado)
  if (filtros.idCategoria) {
    // En un caso real, esto requeriría mapear skills a categorías
    resultados = resultados.filter(
      (servicio) => servicio.id !== "servicio-999"
    ); // Placeholder
  }

  return resultados;
}

// Obtener servicios de un usuario específico
export function getServiciosUsuarioEstaticos(): ServicioBusqueda[] {
  return STATIC_SERVICIOS.filter(
    (servicio) => servicio.proveedor.id === "user-1"
  );
}

// Obtener solicitudes recibidas de un prestamista específico
export function getSolicitudesPrestamisaEstaticas(
  idPrestamista: string
): SolicitudRecibida[] {
  return STATIC_SOLICITUDES_PRESTAMISTA.filter(
    (solicitud) => solicitud.servicio.proveedor.id === idPrestamista
  );
}

// NUEVA: Obtener solicitudes enviadas de un cliente específico
export function getSolicitudesEnviadasEstaticas(
  idCliente: string
): SolicitudEnviada[] {
  return STATIC_SOLICITUDES_ENVIADAS;
}

// Obtener detalle de un servicio específico
export function getServicioDetalleEstatico(id: string): ServicioDetalle | null {
  const servicio = STATIC_SERVICIOS.find((s) => s.id === id);
  return servicio ? { ...servicio } : null;
}

// Obtener reviews de un servicio específico
export function getServicioReviewsEstatico(id: string): ReviewsServicio {
  const reviewData = STATIC_REVIEWS.find((r) => r.idServicio === id);

  if (reviewData) {
    return {
      comentarios: reviewData.comentarios,
      puntajePromedio: reviewData.puntajePromedio,
    };
  }

  // Retornar reviews por defecto si no se encuentra
  return {
    comentarios: [
      {
        id: `comment-1-${id}`,
        idServicio: id,
        idComentarista: "user-2",
        nombresComentarista: "Usuario de Ejemplo",
        apellidosComentarista: "González",
        comentario: "Excelente servicio, muy profesional y puntual.",
        puntaje: 5,
      },
      {
        id: `comment-2-${id}`,
        idServicio: id,
        idComentarista: "user-3",
        nombresComentarista: "Juan",
        apellidosComentarista: "Pérez",
        comentario: "Buen servicio, pero podría mejorar en la comunicación.",
        puntaje: 4,
      },
    ],
    puntajePromedio: 4.5,
  };
}

// Funciones de utilidad para crear respuestas estáticas
export function createStaticServicioResponse(
  titulo: string
): ApiResponse<ServicioResponse> {
  return {
    success: true,
    message: "Servicio creado exitosamente",
    data: {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      idProveedor: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      titulo: "string",
      descripcion: "string",
      precio: 0,
      precioMaximo: 0,
      precioMinimo: 0,
      tipoPrecio: ServicioTipoPrecio.FIJO,
      ubicacion: "string",
      modalidad: ServicioModalidad.PRESENCIAL,
      aceptaTerminos: true,
      skills: [
        {
          idServicio: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          idSkill: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        },
      ],
      disponibilidades: [
        {
          id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          idServicio: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          dia: ServicioDia.LUNES,
          horaInicio: {
            hour: 0,
            minute: 0,
            second: 0,
            nano: 0,
          },
          horaFin: {
            hour: 0,
            minute: 0,
            second: 0,
            nano: 0,
          },
        },
      ],
      modalidadesPago: [
        {
          id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          tipo: ModalidadPagoTipo.YAPE,
          cuentaBancaria: "string",
          numeroCelular: "string",
          url: "string",
        },
      ],
      recursosMultimedia: [
        {
          id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          medio: Medio.IMAGEN,
          url: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgPE3DtqhZC2a5BXS-PFrBxM5WipFW7Tam61J0g97uyLtlpviSVc3yPTrVFAErHLp4bmSWJudIKEHpXjhCLJO037mof86gkUNsv9GtplALYXqSBqKIYD6Q4HWXluq2Sab8QVaZmjP19QXI/s400/Raul+Romero.jpg",
        },
      ],
    },
  };
}

export function createStaticUploadResponse(
  filename: string
): ApiResponse<UploadResponse> {
  return {
    success: true,
    message: "Archivo subido exitosamente",
    data: {
      url: `/uploads/${filename}`,
      filename,
      size: Math.floor(Math.random() * 1000000) + 100000, // Tamaño aleatorio
    },
  };
}

// Export all static data as a single object for backward compatibility
export const STATIC_DATA = {
  skills: STATIC_SKILLS,
  categorias: STATIC_CATEGORIAS,
  servicios: STATIC_SERVICIOS,
  solicitudesPrestamista: STATIC_SOLICITUDES_PRESTAMISTA,
  solicitudesEnviadas: STATIC_SOLICITUDES_ENVIADAS,
  reviews: STATIC_REVIEWS,
};

export const STATIC_CHAT_CONVERSATIONS = [
  {
    id: "chat-1",
    contacts: [
      {
        idContact: "user-2",
        fullName: "Ana García",
        email: "ana@email.com",
        avatarUrl: "/placeholder-user.jpg",
      },
    ],
    messages: [
      {
        id: "msg-1",
        sentBy: "user-1",
        fecha: "2024-06-29T10:00:00Z",
        mensaje: "¡Hola Ana! ¿Cómo estás?",
      },
      {
        id: "msg-2",
        sentBy: "user-2",
        fecha: "2024-06-29T10:01:00Z",
        mensaje: "¡Hola Carlos! Todo bien, ¿y tú?",
      },
      {
        id: "msg-3",
        sentBy: "user-1",
        fecha: "2024-06-29T10:02:00Z",
        mensaje: "¿Listo para la reunión?",
      },
    ],
  },
  {
    id: "chat-2",
    contacts: [
      {
        idContact: "user-3",
        fullName: "Luis Torres",
        email: "luis@email.com",
        avatarUrl: "/placeholder-user.jpg",
      },
    ],
    messages: [
      {
        id: "msg-4",
        sentBy: "user-3",
        fecha: "2024-06-28T09:00:00Z",
        mensaje: "¿Tienes disponibilidad para esta semana?",
      },
      {
        id: "msg-5",
        sentBy: "user-1",
        fecha: "2024-06-28T09:05:00Z",
        mensaje: "Sí, tengo horarios libres por las tardes.",
      },
    ],
  },
];

export function findStaticChatConversationByContactId(idContact: string) {
  return STATIC_CHAT_CONVERSATIONS.find((conv) =>
    conv.contacts.some((c) => c.idContact === idContact)
  );
}

export function getChatConversationStatic(idConversation: string) {
  const conversation = STATIC_CHAT_CONVERSATIONS.find(
    (conv) => conv.id === idConversation
  );
  if (conversation) {
    // Assuming there are always two contacts in a conversation and one is the current user
    const otherContact = conversation.contacts.find(
      (contact) => contact.idContact !== "user-1"
    ); // Replace "user-1" with actual current user ID if available
    return {
      conversationId: conversation.id,
      otherContact: otherContact || conversation.contacts[0], // Fallback to first contact if other not found
      messages: conversation.messages,
    };
  }
  return undefined;
}

export const STATIC_CHAT_OWN_LAST_MESSAGE: OwnLastMessage[] = [
  {
    conversationId: "conv-1",
    contact: {
      idContact: "2",
      fullName: "Ana García",
      email: "ana@email.com",
      avatarUrl: "/placeholder-user.jpg",
    },
    lastMessage: {
      sentBy: "user-1",
      fecha: "2025-07-03T10:00:00.000Z",
      mensaje: "¡Nos vemos mañana!",
      resourceUrl: "",
    },
  },
  {
    conversationId: "conv-2",
    contact: {
      idContact: "3",
      fullName: "Luis Torres",
      email: "luis@email.com",
      avatarUrl: "/placeholder-user.jpg",
    },
    lastMessage: {
      sentBy: "3",
      fecha: "2025-07-02T18:30:00.000Z",
      mensaje: "¿A qué hora puedes conectarte?",
      resourceUrl: "",
    },
  },
];
