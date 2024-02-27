import React from "react";

function ServicioItem(props) {
  const imagenStyle = {
    width: "700px",
    height: "400px", // Ajusta la altura según tus necesidades
    objectFit: "cover", // Esto hará que la imagen se ajuste y se recorte si es necesario
  };

  return (
    <div className="w-full h-full flex mb-8">
      {/* Imagen del servicio a la izquierda */}
      <img
        src={props.imagen}
        alt={`Imagen de ${props.titulo}`}
        style={imagenStyle}
        className="ml-150"
      />

      {/* Título y descripción del servicio a la derecha */}
      <div className="ml-150 bg-pink w-400 h-400">
        <h2 className="text-2xl font-bold text-left text-3xl ">{props.titulo}</h2>
        <p className="text-justify w-700 h-400 text-xl">{props.descripcion}</p>
      </div>
    </div>
  );
}

export default ServicioItem;