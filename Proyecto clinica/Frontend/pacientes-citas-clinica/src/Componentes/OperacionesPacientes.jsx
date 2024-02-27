import React, { Component } from "react";

import axios from "axios";
import Modal from "./ModalCitas";
function formatDate(fecha) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(fecha).toLocaleDateString(undefined, options);
}

class OperacionesPacientes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pacientes: [], // Cambiar de citas a pacientes
      buscarId: "", // Nuevo estado para el ID de la cita a buscar
      pacientesFiltradas: [], // Nuevo estado para almacenar las citas filtradas
      nuevoPaciente: {
        dpiPaciente: "",
        nombreCompletoPaciente: "",
        fechaNacimientoPaciente: "",
        generoPaciente: "",
        direccionPaciente: "",
        telefonoPaciente: "",
        correoPaciente: "",
        resultados: ""
      },
      pacienteModificar: {
        // Inicializa correctamente pacienteModificar
        dpiPaciente: "",
        nombreCompletoPaciente: "",
        fechaNacimientoPaciente: "",
        generoPaciente: "",
        direccionPaciente: "",
        telefonoPaciente: "",
        correoPaciente: "",
        resultados: ""
      },
      mostrarFormulario: false,
      mostrarFormulario2: false,
      mostrarFormulario3: false,
      idPacienteEliminar: "", // Cambiar de idCitaEliminar a idPacienteEliminar
    };
  }

  // Agregar esta función para manejar el cambio en el campo de entrada del ID de cita a eliminar
  handleIdPacienteEliminarChange = (event) => {
    const { value } = event.target;
    this.setState({ dpiPacienteEliminar: value });
  };
  mostrarFormularioModificar = (paciente) => {
    this.setState({
      mostrarFormulario3: true,
      pacienteModificar: paciente,
    });
  };
  cerrarFormulario3 = () => {
    this.setState({
      mostrarFormulario3: false,
      pacienteModificar: {
        dpiPaciente: "",
        nombreCompletoPaciente: "",
        fechaNacimientoPaciente: "",
        generoPaciente: "",
        direccionPaciente: "",
        telefonoPaciente: "",
        correoPaciente: "",
        resultados: ""
      },
    });
  };
  modificarPaciente = () => {
    const { pacienteModificar } = this.state;

    axios
      .put(
        `http://localhost:3002/pacientes/${pacienteModificar.dpiPaciente}`,
        pacienteModificar
      )
      .then(() => {
        console.log("Paciente modificada con éxito");
        this.obtenerPacientes();
        alert("Modificación realizada con éxito");
        this.cerrarFormulario3(); // Cerrar el formulario después de la modificación
        // Restablecer los valores de los campos en blanco
        this.setState({
          pacienteModificar: {
            dpiPaciente: "",
        nombreCompletoPaciente: "",
        fechaNacimientoPaciente: "",
        generoPaciente: "",
        direccionPaciente: "",
        telefonoPaciente: "",
        correoPaciente: "",
        resultados: ""
          },
          nuevoPaciente: {
            dpiPaciente: "",
            nombreCompletoPaciente: "",
            fechaNacimientoPaciente: "",
            generoPaciente: "",
            direccionPaciente: "",
            telefonoPaciente: "",
            correoPaciente: "",
            resultados: ""
          },
        });
      })
      .catch((error) => {
        console.error("Error al modificar cita:", error);
      });
  };

  mostrarFormulario = () => {
    this.setState({ mostrarFormulario: true });
  };
  mostrarFormulario2 = () => {
    this.setState({ mostrarFormulario2: true });
  };
  mostrarFormulario3 = () => {
    this.setState({ mostrarFormulario3: true });
  };

  cerrarFormulario = () => {
    this.setState({ mostrarFormulario: false });
  };
  cerrarFormulario2 = () => {
    this.setState({ mostrarFormulario2: false });
  };

  componentDidMount() {
    this.obtenerPacientes();
  }

  obtenerPacientes = () => {
    axios
      .get("http://localhost:3002/pacientes")
      .then((response) => {
        this.setState({ pacientes: response.data });
      })
      .catch((error) => {
        console.error("Error al obtener pacientes:", error);
      });
  };

  agregarPaciente = () => {
    const { nuevoPaciente } = this.state;

    axios
      .post("http://localhost:3002/pacientes", nuevoPaciente)
      .then(() => {
        this.obtenerPacientes();
        // Restablecer los valores de los campos en blanco
        alert("Ingreso realizado con éxito");
        this.cerrarFormulario();
        this.setState({
          pacienteModificar: {
            dpiPaciente: "",
            nombreCompletoPaciente: "",
            fechaNacimientoPaciente: "",
            generoPaciente: "",
            direccionPaciente: "",
            telefonoPaciente: "",
            correoPaciente: "",
            resultados: ""
          },
          nuevoPaciente: {
            dpiPaciente: "",
            nombreCompletoPaciente: "",
            fechaNacimientoPaciente: "",
            generoPaciente: "",
            direccionPaciente: "",
            telefonoPaciente: "",
            correoPaciente: "",
            resultados: ""
          },
        });
      })
      .catch((error) => {
        console.error("Error al agregar paciente:", error);
      });
  };

  eliminarPaciente = () => {
    const { dpiPacienteEliminar } = this.state;
    console.log("ID de paciente a eliminar:", dpiPacienteEliminar);

    if (dpiPacienteEliminar) {
      axios
        .delete(`http://localhost:3002/pacientes/${dpiPacienteEliminar}`)
        .then(() => {
          console.log("Paciente eliminada con éxito");
          this.obtenerPacientes();
          alert("Eliminación realizada con éxito");
          this.cerrarFormulario2();
          this.setState({
            dpiPacienteEliminar: "",
            // Restablecer los valores de los campos en blanco
            pacienteModificar: {
              dpiPaciente: "",
        nombreCompletoPaciente: "",
        fechaNacimientoPaciente: "",
        generoPaciente: "",
        direccionPaciente: "",
        telefonoPaciente: "",
        correoPaciente: "",
        resultados: ""
            },
            nuevoPaciente: {
              dpiPaciente: "",
              nombreCompletoPaciente: "",
              fechaNacimientoPaciente: "",
              generoPaciente: "",
              direccionPaciente: "",
              telefonoPaciente: "",
              correoPaciente: "",
              resultados: ""
            },
          });
        })
        .catch((error) => {
          console.error("Error al eliminar paciente:", error);
        });
    } else {
      console.error("ID de paciente a eliminar no válido");
    }
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      nuevoPaciente: {
        ...prevState.nuevoPaciente,
        [name]: value,
      },
      pacienteModificar: {
        ...prevState.pacienteModificar, // Usar pacienteModificar en lugar de Modificar
        [name]: value,
      },
    }));
  };
  handleIdCitaBuscarChange = (event) => {
    const { value } = event.target;
    this.setState({ buscarId: value });
  };

  buscarCitaPorId = () => {
    const { buscarId, pacientes } = this.state;

    if (buscarId) {
      const idABuscar = buscarId.trim();
      const pacientesFiltradas = pacientes.filter(
        (paciente) => paciente.dpiPaciente.toString() === idABuscar
      );

      this.setState({ pacientesFiltradas });
    }
   else {
    // Si buscarId está vacío, muestra todas las citas
    this.setState({ pacientesFiltradas: [] });
  }
  };
  render() {
    const {
      pacientes, // Cambiar de citas a pacientes
      nuevoPaciente,
      pacienteModificar,
      mostrarFormulario,
      mostrarFormulario2,
      mostrarFormulario3,
      dpiPacienteEliminar, // Cambiar de idCitaEliminar a idPacienteEliminar
      buscarId,
      pacientesFiltradas,
    } = this.state;

    return (
      <div className="w-full h-screen flex flex-col bg-gray-100 ">
        <div className="pt-5 font-bold">
          <h2 className="text-5xl text-center pt-100">Operaciones Pacientes</h2>
        </div>
        <div className="flex justify-end items-end mt-50 mr-25 mb-25">
          <div>
          <button
            onClick={this.buscarCitaPorId}
            className="w-150 h-50 bg-purple-500 text-white m-1 font-bold rounded hover:bg-purple-700 hover:text-white"
          >
            Buscar por ID
          </button>

          <input
            className="h-10 w-600 mr-100 ml-5"
            type="text"
            placeholder=" Buscar por ID"
            value={buscarId}
            onChange={this.handleIdCitaBuscarChange}
          />
          </div>
          <div>
          <button
            className="w-150 h-50 bg-purple-500 text-white m-1 font-bold rounded hover:bg-purple-700 hover:text-white"
            onClick={this.mostrarFormulario}
          >
            Agregar Paciente
          </button>
          <button
            className="w-150 h-50 bg-purple-500 text-white m-1 font-bold rounded hover:bg-purple-700 hover:text-white"
            onClick={this.mostrarFormulario2}
          >
            Eliminar Paciente
          </button>
          <button
            className="w-150 h-50 bg-purple-500 text-white m-1 font-bold rounded hover:bg-purple-700 hover:text-white"
            onClick={this.mostrarFormulario3}
          >
            Modificar Paciente
          </button>
          </div>
          
        </div>

        {mostrarFormulario && (
          <Modal isOpen={mostrarFormulario} onClose={this.cerrarFormulario}>
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-4">Agregar Paciente</h2>
              <form className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    DPI Paciente:
                  </label>
                  <input
                    type="text"
                    name="dpiPaciente"
                    placeholder="DPI Paciente"
                    value={nuevoPaciente.dpiPaciente}
                    onChange={this.handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Nombre Completo:
                  </label>
                  <input
                    type="text"
                    name="nombreCompletoPaciente"
                    placeholder="Nombre Completo "
                    value={nuevoPaciente.nombreCompletoPaciente}
                    onChange={this.handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
               
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Fecha de Nacimiento:
                  </label>

             
                  <input
                    type="datetime-local"
                    name="fechaNacimientoPaciente"
                    placeholder="Fecha de Nacimiento "
                    value={nuevoPaciente.fechaNacimientoPaciente}
                    onChange={this.handleInputChange}
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Género:
                  </label>
                  <input
                    type="text"
                    name="generoPaciente"
                    placeholder="Genero "
                    value={nuevoPaciente.generoPaciente}
                    onChange={this.handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Dirección:
                  </label>
                  <input
                    type="text"
                    name="direccionPaciente"
                    placeholder="Dirección"
                    value={nuevoPaciente.direccionPaciente}
                    onChange={this.handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Teléfono:
                  </label>
                  <input
                    type="text"
                    name="telefonoPaciente"
                    placeholder="Telefono"
                    value={nuevoPaciente.telefonoPaciente}
                    onChange={this.handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Correo:
                  </label>
                  <input
                    type="text"
                    name="correoPaciente"
                    placeholder="Correo"
                    value={nuevoPaciente.correoPaciente}
                    onChange={this.handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Resultados:
                  </label>
                  <input
                    type="text"
                    name="resultados"
                    placeholder="Resultados"
                    value={nuevoPaciente.resultados}
                    onChange={this.handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={this.agregarPaciente}
                    className="w-150 h-50 bg-purple-500 text-white m-1 font-bold rounded hover:bg-purple-700 hover:text-white"
                  >
                    Agregar
                  </button>
                </div>
              </form>
            </div>
          </Modal>
        )}

        {mostrarFormulario2 && (
          <Modal isOpen={mostrarFormulario2} onClose={this.cerrarFormulario2}>
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-4">Eliminar Paciente</h2>
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    DPI del Paciente a Eliminar:
                  </label>
                  <input
                    type="text"
                    name="dpiPacienteModificar"
                    value={dpiPacienteEliminar}
                    placeholder="DPI Paciente a eliminar"
                    onChange={this.handleIdPacienteEliminarChange}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={this.eliminarPaciente}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Eliminar
                  </button>
                </div>
              </form>
            </div>
          </Modal>
        )}

        {mostrarFormulario3 && (
          <Modal isOpen={mostrarFormulario3} onClose={this.cerrarFormulario3}>
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-4">Modificar Paciente</h2>
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    DPI del Paciente a Modificar:
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded-lg"
                    id="dpiPacienteModificar"
                    type="text"
                    name="dpiPaciente" // Cambia el nombre del campo a "idPaciente"
                    placeholder="DPI Paciente"
                    value={this.state.pacienteModificar.dpiPaciente}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Nombre Completo Paciente:
                  </label>
                  <input
                    type="text"
                    name="nombreCompletoPaciente"
                    placeholder="Nombre Completo"
                    value={pacienteModificar.nombreCompletoPaciente}
                    onChange={this.handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Fecha de Nacimiento:
                  </label>
                  <input
                    type="datetime-local"
                    name="fechaNacimientoPaciente"
                    placeholder="Fecha de Nacimiento"
                    value={pacienteModificar.fechaNacimientoPaciente}
                    onChange={this.handleInputChange}
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Género:
                  </label>
                  <input
                    type="text"
                    name="generoPaciente"
                    placeholder="Genero"
                    value={pacienteModificar.generoPaciente}
                    onChange={this.handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Dirección:
                  </label>
                  <input
                    type="text"
                    name="direccionPaciente"
                    placeholder="Dirección"
                    value={pacienteModificar.direccionPaciente}
                    onChange={this.handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Teléfono:
                  </label>
                  <input
                    type="text"
                    name="telefonoPaciente"
                    placeholder="Telefono"
                    value={pacienteModificar.telefonoPaciente}
                    onChange={this.handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Correo:
                  </label>
                  <input
                    type="text"
                    name="correoPaciente"
                    placeholder="Correo"
                    value={pacienteModificar.correoPaciente}
                    onChange={this.handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Resultados:
                  </label>
                  <input
                    type="text"
                    name="resultados"
                    placeholder="Resultados"
                    value={pacienteModificar.resultados}
                    onChange={this.handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={this.modificarPaciente}
                    className="w-150 h-50 bg-purple-500 text-white m-1 font-bold rounded hover:bg-purple-700 hover:text-white"
                  >
                    Modificar
                  </button>
                </div>
              </form>
            </div>
          </Modal>
        )}

        <div className="flex justify-center ">
          <div className="w-1/2 pl-25 flex flex-col mt-100 ">
            <div className="">
              <table className="w-900 text-left bg-gray-200 rounded-lg border-separate ">
                <thead className="text-center">
                  <tr className=" bg-purple-800">
                    <th className="border border-black text-white p-2">
                      DPI Paciente
                    </th>
                    <th className="border border-black text-white p-2">
                      Nombre Completo Paciente
                    </th>
                    <th className="border border-black p-2 text-white">
                      Fecha de Nacimiento
                    </th>
                    <th className="border border-black p-2 text-white">
                      Género
                    </th>
                    <th className="border border-black p-2 text-white">
                      Dirección
                    </th>
                    <th className="border border-black p-2 text-white">
                      Teléfono
                    </th>
                    <th className="border border-black p-2 text-white">
                      Correo
                    </th>
                    <th className="border border-black p-2 text-white">
                      Resultados
                    </th>
                  </tr>
                </thead>
                <tbody className="m-10 text-center">
                  {pacientesFiltradas.length > 0
                    ? pacientesFiltradas.map((paciente) => (
                        <tr key={paciente.dpiPaciente}>
                          <td className="border border-black p-2">
                            {paciente.dpiPaciente}
                          </td>
                          <td className="border border-black p-2">
                            {paciente.nombreCompletoPaciente}
                          </td>
                          <td className="border border-black p-2">
                            {formatDate(paciente.fechaNacimientoPaciente)}
                          </td>
                          <td className="border border-black p-2">
                            {paciente.generoPaciente}
                          </td>
                          <td className="border border-black p-2">
                            {paciente.direccionPaciente}
                          </td>
                          <td className="border border-black p-2">
                            {paciente.telefonoPaciente}
                          </td>
                          <td className="border border-black p-2">
                            {paciente.correoPaciente}
                          </td>
                          <td className="border border-black p-2">
                            {paciente.resultados}
                          </td>
                        </tr>
                      ))
                    : pacientes.map((paciente) => (
                      <tr key={paciente.dpiPaciente}>
                      <td className="border border-black p-2">
                        {paciente.dpiPaciente}
                      </td>
                      <td className="border border-black p-2">
                        {paciente.nombreCompletoPaciente}
                      </td>
                      <td className="border border-black p-2">
                        {formatDate(paciente.fechaNacimientoPaciente)}
                      </td>
                      <td className="border border-black p-2">
                        {paciente.generoPaciente}
                      </td>
                      <td className="border border-black p-2">
                        {paciente.direccionPaciente}
                      </td>
                      <td className="border border-black p-2">
                        {paciente.telefonoPaciente}
                      </td>
                      <td className="border border-black p-2">
                        {paciente.correoPaciente}
                      </td>
                      <td className="border border-black p-2">
                        {paciente.resultados}
                      </td>
                    </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OperacionesPacientes;
