"use server";

import ServicioDetailsResponse from "@/interfaces/busqueda-servicio/ServicioDetailsResponse";
import AsignacionModalidadPagoToServicioRequest from "@/interfaces/requestbody/servicio/AsignacionModalidadPagoToServicioRequest";
import AsignacionRecursoMultimediaToServicioRequest from "@/interfaces/requestbody/servicio/AsignacionRecursoMultimediaToServicioRequest";
import CreateServicioBody from "@/interfaces/requestbody/servicio/CreateServicioBody";
import SearchServiciosParametersBody from "@/interfaces/requestbody/servicio/SearchServiciosParametersBody";
import ServicioReviewResponse from "@/interfaces/responsebody/review/ServicioReviewResponse";
import MultimediaResourceUploadedResponse from "@/interfaces/responsebody/servicio/MultimediaResourceUploadedResponse";
import ServicioBusquedaResponse from "@/interfaces/responsebody/servicio/ServicioBusquedaResponse";
import ServicioModalidadesPagoAsignadosResponse from "@/interfaces/responsebody/servicio/ServicioModalidadesPagoAsignadosResponse";
import ServicioRecursosMultimediaAsignadosResponse from "@/interfaces/responsebody/servicio/ServicioRecursosMultimediaAsignadosResponse";
import ServicioRegisteredResponse from "@/interfaces/responsebody/servicio/ServicioRegisteredResponse";
import ServicioResponse from "@/interfaces/responsebody/servicio/ServicioResponse";
import {
  getBackendInstance,
  getBackendInstanceAuth,
  getBackendInstanceAuthForms,
} from "@/utils/constants.backend";
import { TipoModalidadPago, TipoModalidadPagoName } from "@/utils/types";

/* Gestión de servicios */
export const obtenerServiciosByPrestamista = async (idPrestamista: string) => {
  const resp = await (
    await getBackendInstanceAuth()
  ).get(`servicio/usuario/${idPrestamista}`);
  return resp.data as ServicioResponse[];
};

export const obtenerImagenMetodoPago = async (
  idServicio: string,
  modalidadPago: TipoModalidadPagoName
) => {
  const resp = await (
    await getBackendInstanceAuth()
  ).get(`servicio/payment-method/image/${idServicio}/${modalidadPago}`);
  return resp.data as string;
};

export const registrarServicio = async (servicio: CreateServicioBody) => {
  const resp = await (
    await getBackendInstanceAuth()
  ).post("servicio", servicio);
  return resp.data as ServicioRegisteredResponse;
};

export const asignarRecursosMultimediaToServicio = async (
  idServicio: string,
  recursosMultimedia: AsignacionRecursoMultimediaToServicioRequest[]
) => {
  const resp = await (
    await getBackendInstanceAuth()
  ).patch(`servicio/recursos-multimedia/${idServicio}`, recursosMultimedia);
  return resp.data as ServicioRecursosMultimediaAsignadosResponse;
};

export const uploadMultimediaFilesToServicio = async (
  idServicio: string,
  formDataFile: FormData
) => {
  const resp = await (
    await getBackendInstanceAuthForms()
  ).patch(`servicio/upload-multimedia/${idServicio}`, formDataFile);
  return resp.data as MultimediaResourceUploadedResponse[];
};

export const uploadMetadataModalidadPagoToService = async (
  idServicio: string,
  formDataFile: FormData,
  metodoPago: TipoModalidadPagoName
) => {
  const resp = await (
    await getBackendInstanceAuthForms()
  ).patch(
    `servicio/upload-metadata-modalidad-pago/${idServicio}/${metodoPago}`,
    formDataFile
  );
  return resp.data as string;
};

export const asignarModalidadesPagoToServicio = async (
  idServicio: string,
  modalidadesPago: AsignacionModalidadPagoToServicioRequest[]
) => {
  const resp = await (
    await getBackendInstanceAuth()
  ).patch(`servicio/modalidad-pago/${idServicio}`, modalidadesPago);
  return resp.data as ServicioModalidadesPagoAsignadosResponse;
};

/* Búsqueda de servicios (público) */

export const searchServicioWithParams = async (
  params: SearchServiciosParametersBody
) => {
  console.log("params", params);
  const resp = await (
    await getBackendInstance()
  ).post("servicio/busqueda", params);
  return resp.data as ServicioResponse[];
};

export const getServicioDetails = async (id: string) => {
  const response = await (
    await getBackendInstance()
  ).get(`servicio/details/preview/${id}`);
  return response.data as ServicioDetailsResponse;
};

export const getServicioReview = async (id: string) => {
  const response = await (
    await getBackendInstance()
  ).get(`servicios/review/${id}`);
  return response.data as ServicioReviewResponse;
};
