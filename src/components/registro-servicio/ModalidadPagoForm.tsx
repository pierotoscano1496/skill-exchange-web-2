"use client";

import AsignacionMedioPago from "@/interfaces/registro-servicio/AsignacionMedioPago";
import { TipoModalidadPago, TipoModalidadPagoOption } from "@/utils/types";
import { useState } from "react";

const ModalidadPagoForm = ({ show, sendModalidadPagoToParent }: {
    show: boolean,
    sendModalidadPagoToParent: (modadlidadPago: AsignacionMedioPago) => void
}) => {
    const [tipo, setTipo] = useState<TipoModalidadPago>();
    const [numeroCelular, setNumeroCelular] = useState<string>("");
    const [codCuentaInterbancario, setCodCuentaInterbancario] = useState<string>("");

    const modalidadesPagoOptions: TipoModalidadPagoOption[] = [
        {
            nombre: "Yape",
            valor: "yape"
        },
        {
            nombre: "Código interbancario",
            valor: "tarjeta"
        }
    ];

    const agregarModalidadPagos = () => {
        const modalidadPago: AsignacionMedioPago = {
            cci: tipo === "tarjeta" ? codCuentaInterbancario : "",
            celular: tipo === "yape" ? numeroCelular : "",
            tipo: tipo!
        };

        sendModalidadPagoToParent(modalidadPago);
    }

    return (
        <div>
            <div>
                <label>Modalidad:
                    <select onChange={(e) => setTipo(e.target.value as TipoModalidadPago)}>
                        <option>--Seleccione--</option>
                        {modalidadesPagoOptions.map(o => (
                            <option value={o.valor}>{o.nombre}</option>
                        ))}
                    </select>
                </label>
            </div>
            <div>
                {tipo === "yape" && (
                    <label>Número de celular:
                        <input
                            value={numeroCelular}
                            onChange={(e) => setNumeroCelular(e.target.value)}
                            type="tel"
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            maxLength={9} />
                    </label>
                )}
                {tipo === "tarjeta" && (
                    <label>Cuenta interbancaria:
                        <input
                            value={codCuentaInterbancario}
                            onChange={(e) => setCodCuentaInterbancario(e.target.value)}
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9\s]{20}"
                            autoComplete="cc-number"
                            maxLength={20}
                            placeholder="00000000000000000000"
                        />
                    </label>
                )}
            </div>
            <button onClick={agregarModalidadPagos}>Agregar</button>
        </div>
    )
};

export default ModalidadPagoForm;