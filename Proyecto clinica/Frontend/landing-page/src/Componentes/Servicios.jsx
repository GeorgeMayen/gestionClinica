import React from "react";
import ServicioItem from "./ServicioItem"; // Asegúrate de que la ruta sea correcta

function Servicios(prop) {
  const servicios = [
    {
      titulo: "Consulta",
      descripcion:
        "Ofrecemos un servicio de consulta médica altamente especializada, donde nuestros expertos médicos están disponibles para abordar tus preocupaciones y preguntas de salud. Nuestro enfoque integral garantiza que recibas la atención médica adecuada y las recomendaciones necesarias para tu bienestar.",
      imagen: require("../Imagenes/Consulta.png"),
    },
    {
      titulo: "Papanicolaou",
      descripcion:
        "Nuestro servicio de Papanicolaou se dedica a la detección temprana de enfermedades cervicales y otros problemas de salud relacionados. Utilizando técnicas avanzadas y un equipo médico experimentado, realizamos exámenes precisos que contribuyen a la prevención y el diagnóstico temprano de condiciones potencialmente graves.",
      imagen: require("../Imagenes/Papanicolaou.jpg"),
    },
    {
      titulo: "Ultrasonido",
      descripcion:
        "Contamos con tecnología de vanguardia para realizar estudios de ultrasonido que proporcionan imágenes detalladas de órganos y tejidos internos. Nuestro equipo altamente capacitado garantiza resultados precisos y un diagnóstico eficaz, lo que nos permite brindar el mejor cuidado médico posible.",
      imagen: require("../Imagenes/Ultrasonido.png"),
    },
    {
      titulo: "Planificación Familiar",
      descripcion:
        "Nuestro servicio de planificación familiar se basa en el principio de ofrecer opciones y asesoramiento comprensivo para tomar decisiones informadas sobre tu salud reproductiva. Proporcionamos información sobre una variedad de métodos anticonceptivos y ayudamos a encontrar la opción adecuada para ti.",
      imagen: require("../Imagenes/Planificacion.jpg"),
    },
    {
      titulo: "Control Prenatal",
      descripcion:
        "Durante el emocionante viaje del embarazo, nuestro equipo de expertos en control prenatal está a tu disposición para brindarte un seguimiento cuidadoso y apoyo constante. Nos enorgullece ofrecer atención de calidad que garantiza la salud y el bienestar tanto tuyos como de tu futuro bebé.",
      imagen: require("../Imagenes/Prenatal.jpg"),
    },
    {
      titulo: "Partos",
      descripcion:
        "En el momento más especial de tu vida, te acompañamos con un equipo médico dedicado a brindarte un parto seguro y respetado. Nuestras instalaciones cuentan con tecnología de vanguardia y un entorno acogedor para recibir a tu bebé en un ambiente de confianza y comodidad.",
      imagen: require("../Imagenes/Parto.png"),
    },
  ];

  return (
    <div className="pt-25 text-center w-full h-full bg-gray-100">
      <div className="mb-5 text-5xl font-bold">
        <h1>Servicios</h1>
      </div>

      {/* Renderiza los componentes de servicio */}
      <div className="m-50">
        {servicios.map((servicio, index) => (
          <ServicioItem
            key={index}
            titulo={servicio.titulo}
            descripcion={servicio.descripcion}
            imagen={servicio.imagen}
          />
        ))}
      </div>
    </div>
  );
}

export default Servicios;
