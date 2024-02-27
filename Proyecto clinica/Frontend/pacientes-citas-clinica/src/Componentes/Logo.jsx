import React from "react";

function Logo(prop) {
  return (
    <div className="flex m-3 w-full h-50 ">
      <div className="mr-30">
        <img
          className="ml-10 w-30 h-40"
          src={require(`../Imagenes/${prop.logo}.png`)}
          alt="Logo"
        />
      </div>
      <div className=" flex flex-col items-center  text-center text-5xl ml-60 mb-10 pl-20 pt-8">
        <p>Clínica médica de ginecología y obstetricia</p>
        <div><p>Dra. Nancy Centeno Aldana</p></div>
      </div>
    </div>
  );
}
export default Logo;
