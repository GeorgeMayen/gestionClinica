import React, { useState, useEffect, useMemo } from "react";

function Inicio(props) {
  const imagenes = useMemo(() => [
    require(`../Imagenes/${props.imagen1}.png`),
    require(`../Imagenes/${props.imagen2}.jpg`),
    require(`../Imagenes/${props.imagen3}.png`),
    require(`../Imagenes/${props.imagen4}.jpg`),
    require(`../Imagenes/${props.imagen5}.jpg`),
    require(`../Imagenes/${props.imagen6}.png`)
  ], [props.imagen1, props.imagen2, props.imagen3, props.imagen4, props.imagen5, props.imagen6]);
  
  const servicios = [
    {
      texto: "Consulta",
    },
    {
      texto: " Papanicolaou",
    },
    {
      texto: "Ultrasonido",
    },
    {
      texto: "Planificación familiar",
    },
    {
      texto: "Control prenatal",
    },
    {
      texto: "Partos",
    },
    // Agrega más objetos para representar otros servicios
  ];
  const [imagenActual, setImagenActual] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const siguienteImagen =
        imagenActual === imagenes.length - 1 ? 0 : imagenActual + 1;
      setImagenActual(siguienteImagen);
    }, 2000); // Cambia la imagen automáticamente cada 5 segundos (ajusta este valor según tus preferencias)

    return () => {
      clearInterval(intervalId); // Limpia el intervalo cuando el componente se desmonta
    };
  }, [imagenActual, imagenes]);

  const cambiarImagenManualmente = (indice) => {
    setImagenActual(indice);
  };

  return (
    <div className="w-full h-full bg-gray-100 text-center pt-10 ">
      <div className="pb-10 text-center w-full h-800 relative">
        <img
          src={imagenes[imagenActual]}
          alt={`Imagen de inicio ${imagenActual + 1}`}
          className="w-full h-full"
        />
        <i
          className=" text-white text-4xl absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
          onClick={() => {
            const siguienteImagen =
              imagenActual === imagenes.length - 1 ? 0 : imagenActual + 1;
            setImagenActual(siguienteImagen);
          }}
        ></i>
        <i
          className="text-white text-4xl absolute left-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
          onClick={() => {
            const anteriorImagen =
              imagenActual === 0 ? imagenes.length - 1 : imagenActual - 1;
            setImagenActual(anteriorImagen);
          }}
        ></i>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <h1 className="mb-250 text-5xl font-bold text-white text-center">
            {servicios[imagenActual].texto}
          </h1>
          {imagenes.map((imagen, index) => (
            <button
              key={index}
              onClick={() => cambiarImagenManualmente(index)}
              className={`w-4 h-4 mx-1 rounded-full ${
                index === imagenActual ? "bg-gray-800" : "bg-gray-600"
              } focus:outline-none`}
            ></button>
          ))}
        </div>
      </div>
      <div className="w-1000 mx-auto text-justify text-xl">
        <p className="m-10">
          Somos una clínica especializada en ginecología y obstetricia que
          ilumina el camino de las mujeres a lo largo de cada etapa de sus
          vidas. Nuestra dedicación se refleja en la creación de un espacio
          donde la salud femenina encuentra un refugio seguro. En nuestro
          compromiso inquebrantable, nos esforzamos por atender cada necesidad
          con la máxima calidad, con el objetivo constante de elevar la calidad
          de vida de cada paciente. Comprendemos que la salud de las mujeres es
          un viaje complejo que abarca desde la juventud hasta la madurez y más
          allá. Por tanto, estamos decididos a mantenernos a la vanguardia de la
          medicina ginecológica y obstétrica.
        </p>
        <h1 className="text-center text-3xl font-bold">Misión</h1>
        <p className="m-10">
          En nuestra clínica, aspiramos a ser un faro de apoyo y cuidado para
          las mujeres en cada fase de sus vidas. Nos esforzamos por ser el
          refugio de la salud femenina, donde cada paciente experimente atención
          de calidad excepcional. Nuestro compromiso inquebrantable consiste en
          mejorar la calidad de vida de cada mujer, reconociendo que su
          bienestar abarca desde los primeros años hasta la madurez y más allá.
          Nos impulsa la determinación de liderar la medicina ginecológica y
          obstétrica, adoptando innovaciones respaldadas por investigación y
          tecnología de vanguardia.
        </p>
        <h1 className="text-center text-3xl font-bold">Visión</h1>
        <p className="m-10">
          Nuestra visión es ser líderes en la atención femenina, comprometidos
          en mejorar la calidad de vida y satisfacción de las pacientes. Nuestro
          enfoque integral abarca lo físico y emocional en cada etapa de sus
          vidas. Como pioneros, empleamos tecnologías innovadoras y enfoques
          médicos vanguardistas, brindando tratamientos excelentes y
          construyendo relaciones basadas en confianza. Trascendemos la atención
          médica tradicional, siendo un faro de esperanza y empoderamiento,
          impulsando la salud y calidad de vida de las mujeres que atendemos.
        </p>
      </div>
    </div>
  );
}
export default Inicio;
