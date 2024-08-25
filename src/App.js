//src/App.js
import React, { useState } from "react";
import {
  Formulario,
  Label,
  ContenedorTerminos,
  ContenedorBotonCentrado,
  Boton,
  MensajeExito,
  MensajeDeError,
} from "./elementos/Formularios";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "./componentes/Input";

const App = () => {
  const [usuario, cambiarUsuario] = useState({ campo: "", valido: null });
  const [nombre, cambiarNombre] = useState({ campo: "", valido: null });
  const [password, cambiarPassword] = useState({ campo: "", valido: null });
  const [password2, cambiarPassword2] = useState({ campo: "", valido: null });
  const [correo, cambiarCorreo] = useState({ campo: "", valido: null });
  const [telefono, cambiarTelefono] = useState({ campo: "", valido: null });
  const [terminos, cambiarTerminos] = useState(false);
  const [formularioValido, cambiarFormularioValido] = useState(null);

  const expresiones = {
    usuario: /^[a-zA-Z0-9_-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/, // 7 a 14 numeros.
  };

  const validarPassword2 = () => {
    if (password.campo.length > 0) {
      if (password.campo !== password2.campo) {
        cambiarPassword2((prevState) => {
          return { ...prevState, valido: "false" };
        });
      } else {
        cambiarPassword2((prevState) => {
          return { ...prevState, valido: "true" };
        });
      }
    }
  };
  const onchangeTerminos = (e) => {
    cambiarTerminos(e.target.checked);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      usuario.valido === "true" &&
      nombre.valido === "true" &&
      password.valido === "true" &&
      password2.valido === "true" &&
      correo.valido === "true" &&
      telefono.valido === "true" &&
      terminos
    ) {
      cambiarFormularioValido(true);
      cambiarUsuario({ campo: "", valido: null });
      cambiarNombre({ campo: "", valido: null });
      cambiarPassword({ campo: "", valido: null });
      cambiarPassword2({ campo: "", valido: null });
      cambiarCorreo({ campo: "", valido: null });
      cambiarTelefono({ campo: "", valido: null });
    } else {
      cambiarFormularioValido(false);
    }
  };

  return (
    <main>
      <Formulario action="" onSubmit={onSubmit}>
        <Input
          estado={usuario}
          cambiarEstado={cambiarUsuario}
          label="Usuario"
          placeholder="jesus123"
          tipo="text"
          name="usuario"
          leyendaError="El usuario tiene que ser de 4 a 16 dígitos y solo puede contener numeros, letras y guion bajo"
          expresionRegular={expresiones.usuario}
        />
        <Input
          estado={nombre}
          cambiarEstado={cambiarNombre}
          tipo="text"
          label="Nombre"
          placeholder="John Doe"
          name="nombre"
          leyendaError="El nombre solo puede contener letras y espacios."
          expresionRegular={expresiones.nombre}
        />
        <Input
          estado={password}
          cambiarEstado={cambiarPassword}
          tipo="password"
          label="Contraseña"
          name="password1"
          leyendaError="La contraseña tiene que ser de 4 a 12 dígitos."
          expresionRegular={expresiones.password}
        />
        <Input
          estado={password2}
          cambiarEstado={cambiarPassword2}
          tipo="password"
          label="Repetir Contraseña"
          name="password2"
          leyendaError="Ambas contraseñas deben ser iguales."
          funcion={validarPassword2}
        />
        <Input
          estado={correo}
          cambiarEstado={cambiarCorreo}
          label="Correo"
          placeholder="tucorreo123@correo.com"
          tipo="email"
          name="Email"
          leyendaError="El correo solo puede contener letras, numeros, puntos, guiones y guion bajo."
          expresionRegular={expresiones.correo}
        />
        <Input
          estado={telefono}
          cambiarEstado={cambiarTelefono}
          tipo="text"
          label="Teléfono"
          placeholder="4491234567"
          name="telefono"
          leyendaError="El telefono solo puede contener numeros y el maximo son 14 dígitos."
          expresionRegular={expresiones.telefono}
        />

        <ContenedorTerminos>
          <Label>
            <input
              type="checkbox"
              name="terminos"
              id="terminos"
              checked={terminos}
              onChange={onchangeTerminos}
            />
            Acepto los terminos y condiciones
          </Label>
        </ContenedorTerminos>
        {formularioValido === false && (
          <MensajeDeError>
            <p>
              <FontAwesomeIcon icon={faExclamationCircle} />
              <b>Error: </b>Por favor rellena el formulario correctamente.
            </p>
          </MensajeDeError>
        )}
        <ContenedorBotonCentrado>
          <Boton type="submit">Enviar</Boton>
          {formularioValido === "true" && (
            <MensajeExito>Formulario enviado exitosamente</MensajeExito>
          )}
        </ContenedorBotonCentrado>
      </Formulario>
    </main>
  );
};

export default App;
