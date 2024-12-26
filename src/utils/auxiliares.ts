import { FileData } from "@/interfaces/registro-servicio/FileData";
import { FileExtension } from "./types";

export const convertDateToISOString = (date: Date) => {
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  return `${year}-${month}-${day}`;
};

export const converDateTimeToStandarString = (date: Date) => {
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);

  const hours = `0${date.getHours()}`.slice(-2);
  const minutes = `0${date.getMinutes()}`.slice(-2);

  return `${day}/${month}/${year}, ${hours}:${minutes}`;
};

export const converLocalDateTimeToStandarString = (localDateTime: number[]) => {
  const year = localDateTime[0];
  const month = `0${localDateTime[1]}`.slice(-2);
  const day = `0${localDateTime[2]}`.slice(-2);

  /* const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2); */

  return `${day}/${month}/${year}`;
};

export const currentDateToISOString = (): string => {
  return convertDateToISOString(new Date());
};

export const getMaxDateToISOString = (): string => {
  return convertDateToISOString(getMaxDate());
};

export const getMaxDate = (): Date => {
  let date = new Date();
  date.setFullYear(date.getFullYear() - 18);
  return date;
};

export const getFormatFile = (fileName: string): FileExtension | null => {
  const partes = fileName.split(".");
  if (partes.length === 1) {
    return null; // No se encontró ninguna extensión
  } else {
    return partes[partes.length - 1].toLowerCase() as FileExtension;
  }
};

export const getFirstWords = (
  parrafo: string,
  numWords: number = 10
): string => {
  const palabras = parrafo.split(" ");

  // Si el número de palabras es menor a 10, devolver todas las palabras
  if (palabras.length <= 10) {
    return parrafo;
  }

  return `${palabras.slice(0, numWords).join(" ")}...`;
};

export const getFilesSizeMb = (files: File[]) => {
  return (
    files.reduce((prevSize, file) => prevSize + file.size, 0) / (1024 * 1024)
  );
};

export const fileSizeToMb = (size: number) => {
  return size / (1024 * 1024);
};
