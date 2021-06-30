import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {
    // Crear State de Citas
    const [cita, actualizarCita] = useState({
        mascota: "",
        propietario: "",
        fecha: "",
        hora: "",
        sintomas: "",
    });

    const [error, setError] = useState(false);

    // Función que se ejecuta cuando el usuario escribe en un input
    const actualizarState = (e) => {
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value,
        });
    };

    // Extraer los valores
    const { mascota, propietario, fecha, hora, sintomas } = cita;

    // Enviar formulario
    const submitCita = e => {
        e.preventDefault();

        // Validar
        if (
            mascota.trim() === "" ||
            propietario.trim() === "" ||
            fecha.trim() === "" ||
            hora.trim() === "" ||
            sintomas.trim() === ""
        ) {
            console.log("Hay un error");
            setError(true);
            return;
        }
        setError(false);

        // Asignar un ID
        cita.id = uuidv4();
        console.log(cita);

        // Crear la Cita
        crearCita(cita);

        // Reiniciar el Form
        actualizarCita({
            mascota: "",
            propietario: "",
            fecha: "",
            hora: "",
            sintomas: "",
        });
    };
    return (
        <>
            <h2>Crear Cita</h2>

            {error ? (
                <p className="alerta-error">
                    Todos los campos son obligatorios
                </p>
            ) : null}
            <form onSubmit={submitCita}>
                <label>Nombre Mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre mascota"
                    onChange={actualizarState}
                    value={mascota}
                />

                <label>Nombre Dueño</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre Dueño de la mascota"
                    onChange={actualizarState}
                    value={propietario}
                />

                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />

                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />

                <label>Síntomas</label>
                <textarea
                    name="sintomas"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={sintomas}
                ></textarea>

                <button type="submit" className="u-full-width button-primary">
                    Agregar Cita
                </button>
            </form>
        </>
    );
};


Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired,
}

export default Formulario;
