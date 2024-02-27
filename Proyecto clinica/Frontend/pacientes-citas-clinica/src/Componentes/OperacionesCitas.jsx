import React, { Component } from "react";

import axios from "axios";
import Modal from "./ModalCitas";
function formatDate(fecha) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(fecha).toLocaleDateString(undefined, options);
}

class OperacionesCitas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      citas: [],
      citasSolicitadas: [], // Nuevo estado para citas solicitadas
      buscarId: "", // Nuevo estado para el ID de la cita a buscar
      citasFiltradas: [], // Nuevo estado para almacenar las citas filtradas

      nuevaCita: {
        idCita: "",
        dpiPaciente: "",
        nombreCompletoPaciente: "",
        tipoServicio: "",
        FormaPago: "",
        fechaHoraCita: "",
        estadoCita: "",
      },
      citaModificar: {
        idCita: "",
        dpiPaciente: "",
        nombreCompletoPaciente: "",
        tipoServicio: "",
        FormaPago: "",
        fechaHoraCita: "",
        estadoCita: "",
      },
      mostrarFormulario: false,
      mostrarFormulario2: false,
      mostrarFormulario3: false,
      idCitaEliminar: "", // Nuevo estado para almacenar el ID de la cita a eliminar
    };
  }

  // Agregar esta función para manejar el cambio en el campo de entrada del ID de cita a eliminar
  handleIdCitaEliminarChange = (event) => {
    const { value } = event.target;
    this.setState({ idCitaEliminar: value });
  };
  mostrarFormularioModificar = (cita) => {
    this.setState({
      mostrarFormulario3: true,
      citaModificar: cita,
    });
  };
  cerrarFormulario3 = () => {
    this.setState({
      mostrarFormulario3: false,
      citaModificar: {
        idCita: "",
        dpiPaciente: "",
        nombreCompletoPaciente: "",
        tipoServicio: "",
        FormaPago: "",
        fechaHoraCita: "",
        estadoCita: "",
      },
    });
  };
  modificarCita = () => {
    const { citaModificar } = this.state;

    axios
      .put(
        `http://localhost:3002/citas/${citaModificar.idCita}`,
        citaModificar
      )
      .then(() => {
        console.log("Cita modificada con éxito");
        this.obtenerCitas();
        alert("Modificación realizada con éxito");
        this.cerrarFormulario3(); // Cerrar el formulario después de la modificación
        // Restablecer los valores de los campos en blanco
        this.setState({
          citaModificar: {
            idCita: "",
            dpiPaciente: "",
            nombreCompletoPaciente: "",
            tipoServicio: "",
            FormaPago: "",
            fechaHoraCita: "",
            estadoCita: "",
          },
          nuevaCita: {
            idCita: "",
            dpiPaciente: "",
            nombreCompletoPaciente: "",
            tipoServicio: "",
            FormaPago: "",
            fechaHoraCita: "",
            estadoCita: "",
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
    this.obtenerCitas();
  }

  obtenerCitas = () => {
    axios
      .get("http://localhost:3002/citas")
      .then((response) => {
        this.setState({ citas: response.data });
      })
      .catch((error) => {
        console.error("Error al obtener citas:", error);
      });
  };
  agregarCita = () => {
    const { nuevaCita } = this.state;

    axios
      .post("http://localhost:3002/citas", nuevaCita)
      .then(() => {
        this.obtenerCitas();
        // Restablecer los valores de los campos en blanco
        alert("Ingreso realizado con éxito");
        this.cerrarFormulario();
        this.setState({
          nuevaCita: {
            idCita: "",
            dpiPaciente: "",
            nombreCompletoPaciente: "",
            tipoServicio: "",
            FormaPago: "",
            fechaHoraCita: "",
            estadoCita: "",
          },
          citaModificar: {
            idCita: "",
            dpiPaciente: "",
            nombreCompletoPaciente: "",
            tipoServicio: "",
            FormaPago: "",
            fechaHoraCita: "",
            estadoCita: "",
          },
        });
      })
      .catch((error) => {
        console.error("Error al agregar cita:", error);
      });
  };

  eliminarCita = () => {
    const { idCitaEliminar } = this.state;
    console.log("ID de la cita a eliminar:", idCitaEliminar);

    if (idCitaEliminar) {
      axios
        .delete(`http://localhost:3002/citas/${idCitaEliminar}`)
        .then(() => {
          console.log("Cita eliminada con éxito");
          this.obtenerCitas();
          alert("Eliminación realizada con éxito");
          this.cerrarFormulario2();
          this.setState({
            idCitaEliminar: "",
            // Restablecer los valores de los campos en blanco
            nuevaCita: {
              idCita: "",
              dpiPaciente: "",
              nombreCompletoPaciente: "",
              tipoServicio: "",
              FormaPago: "",
              fechaHoraCita: "",
              estadoCita: "",
            },
            citaModificar: {
              idCita: "",
              dpiPaciente: "",
              nombreCompletoPaciente: "",
              tipoServicio: "",
              FormaPago: "",
              fechaHoraCita: "",
              estadoCita: "",
            },
          });
        })
        .catch((error) => {
          console.error("Error al eliminar cita:", error);
        });
    } else {
      console.error("ID de cita a eliminar no válido");
    }
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      nuevaCita: {
        ...prevState.nuevaCita,
        [name]: value,
      },
      citaModificar: {
        ...prevState.citaModificar,
        [name]: value,
      },
    }));
  };
  handleIdCitaBuscarChange = (event) => {
    const { value } = event.target;
    this.setState({ buscarId: value });
  };

  buscarCitaPorId = () => {
    const { buscarId, citas } = this.state;

    if (buscarId) {
      const idABuscar = buscarId.trim();
      const citasFiltradas = citas.filter(
        (cita) => cita.idCita.toString() === idABuscar
      );
      this.setState({ citasFiltradas });
    } else {
      // Si buscarId está vacío, muestra todas las citas
      this.setState({ citasFiltradas: [] });
    }
  };
  render() {
    const {
      citas,
      nuevaCita,
      mostrarFormulario,
      mostrarFormulario2,
      mostrarFormulario3,
      idCitaEliminar,
      citaModificar,
      buscarId,
      citasFiltradas,
    } = this.state;

    return (
      <div className="w-full h-screen flex flex-col bg-gray-100 ">
        <div className="pt-5 font-bold">
          <h2 className="text-5xl text-center pt-100">Operaciones Citas</h2>
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
              className="w-150 h-50 bg-purple-500 text-white m-1 ml-5 font-bold rounded hover:bg-purple-700 hover:text-white"
              onClick={this.mostrarFormulario}
            >
              Agregar Cita
            </button>
            <button
              className="w-150 h-50 bg-purple-500 text-white m-1 font-bold rounded hover:bg-purple-700 hover:text-white"
              onClick={this.mostrarFormulario2}
            >
              Eliminar Cita
            </button>
            <button
              className="w-150 h-50 bg-purple-500 text-white m-1 font-bold rounded hover:bg-purple-700 hover:text-white"
              onClick={this.mostrarFormulario3}
            >
              Modificar Cita
            </button>
          </div>
        </div>
        {mostrarFormulario && (
          <Modal isOpen={mostrarFormulario} onClose={this.cerrarFormulario}>
            <div className="w-full pl-5 pr-5">
              <h2 className="text-3xl font-bold mb-4 text-center">
                Agregar nueva cita
              </h2>
              <form className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="idCita"
                  >
                    ID Cita
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="idCita"
                    type="text"
                    name="idCita"
                    placeholder="ID Cita "
                    value={nuevaCita.idCita}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="dpiPaciente"
                  >
                    DPI Paciente
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="dpiPaciente"
                    type="text"
                    name="dpiPaciente"
                    placeholder="DPI Paciente"
                    value={nuevaCita.dpiPaciente}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="nombreCompletoPaciente"
                  >
                    Nombre Completo Paciente
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="nombreCompletoPaciente"
                    type="text"
                    name="nombreCompletoPaciente"
                    placeholder="Nombre Completo Paciente"
                    value={nuevaCita.nombreCompletoPaciente}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="tipoServicio"
                  >
                    Tipo de servicio
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="tipoServicio"
                    type="text"
                    name="tipoServicio"
                    placeholder="Tipo de servicio"
                    value={nuevaCita.tipoServicio}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="FormaPago"
                  >
                    Forma de Pago
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="FormaPago"
                    type="text"
                    name="FormaPago"
                    placeholder="Forma de Pago"
                    value={nuevaCita.FormaPago}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="fechaHoraCita"
                  >
                    Fecha y Hora
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="fechaHoraCita"
                    type="datetime-local"
                    name="fechaHoraCita"
                    value={nuevaCita.fechaHoraCita}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="estadoCita"
                  >
                    Estado de Cita
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="estadoCita"
                    type="text"
                    name="estadoCita"
                    placeholder="Estado de Cita"
                    value={nuevaCita.estadoCita}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="flex items-center justify-center items-center">
                  <button
                    className="bg-purple-500 text-white hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={this.agregarCita}
                  >
                    Confirmar
                  </button>
                </div>
              </form>
            </div>
          </Modal>
        )}

        {mostrarFormulario2 && (
          <Modal isOpen={mostrarFormulario2} onClose={this.cerrarFormulario2}>
            <div className="w-full mt-10 pl-5 pr-5">
              <h2 className="text-3xl font-bold mb-4 text-center">
                Eliminar Cita
              </h2>
              <form className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="idCitaEliminar"
                  >
                    ID Cita a Eliminar
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="idCitaEliminar"
                    type="text"
                    name="idCitaEliminar"
                    placeholder="ID Cita a Eliminar"
                    value={idCitaEliminar}
                    onChange={this.handleIdCitaEliminarChange}
                  />
                </div>
                <div className="flex items-center justify-center items-center">
                  <button
                    className="bg-red-500 text-white hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={this.eliminarCita}
                  >
                    Eliminar Cita
                  </button>
                </div>
              </form>
            </div>
          </Modal>
        )}
        {mostrarFormulario3 && (
          <Modal isOpen={mostrarFormulario3} onClose={this.cerrarFormulario3}>
            <div className="w-full mt-10 pl-5 pr-5">
              <h2 className="text-3xl font-bold mb-4 text-center">
                Modificar Cita
              </h2>
              <form className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="idCita"
                  >
                    ID Cita
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="idCita"
                    type="text"
                    name="idCita"
                    placeholder="ID Cita"
                    value={this.state.citaModificar.idCita}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="dpiPaciente"
                  >
                    DPI Paciente
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="dpiPaciente"
                    type="text"
                    name="dpiPaciente"
                    placeholder="DPI Paciente"
                    value={citaModificar.dpiPaciente}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="nombreCompletoPaciente"
                  >
                    Nombre Completo Paciente
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="nombreCompletoPaciente"
                    type="text"
                    name="nombreCompletoPaciente"
                    placeholder="Nombre Completo Paciente"
                    value={citaModificar.nombreCompletoPaciente}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="tipoServicio"
                  >
                    Tipo de servicio
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="tipoServicio"
                    type="text"
                    name="tipoServicio"
                    placeholder="Tipo de servicio"
                    value={citaModificar.tipoServicio}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="FormaPago"
                  >
                    Forma de Pago
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="FormaPago"
                    type="text"
                    name="FormaPago"
                    placeholder="Forma de Pago"
                    value={citaModificar.FormaPago}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="fechaHoraCita"
                  >
                    Fecha y Hora
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="fechaHoraCita"
                    type="datetime-local"
                    name="fechaHoraCita"
                    value={citaModificar.fechaHoraCita}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="estadoCita"
                  >
                    Estado de Cita
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="estadoCita"
                    type="text"
                    name="estadoCita"
                    placeholder="Estado de Cita"
                    value={citaModificar.estadoCita}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="flex items-center justify-center items-center">
                  <button
                    className="bg-purple-500 text-white hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={this.modificarCita}
                  >
                    Modificar Cita
                  </button>
                </div>
              </form>
            </div>
          </Modal>
        )}

        <div className="flex justify-center ">
          <div className="w-1/2 pl-25 flex flex-col mt-100">
            <div>
              <table className="w-900 text-left bg-gray-200 rounded-lg border-separate ">
                <thead className="text-center">
                  <tr className=" bg-purple-800">
                    <th className=" border border-black text-white p-2 ">
                      ID Cita
                    </th>
                    <th className="border border-black text-white p-2">
                      DPI Paciente
                    </th>
                    <th className="border border-black p-2 text-white ">
                      Nombre Completo Paciente
                    </th>
                    <th className=" border border-black text-white p-2 ">
                      Tipo de Servicio
                    </th>
                    <th className="border border-black text-white p-2">
                      Forma de Pago
                    </th>
                    <th className="border border-black p-2 text-white ">
                      Fecha y Hora
                    </th>
                    <th className="border border-black p-2 text-white">
                      Estado
                    </th>
                  </tr>
                </thead>
                <tbody className="m-10 text-center">
                  {citasFiltradas.length > 0
                    ? citasFiltradas.map((cita) => (
                        <tr key={cita.idCita}>
                          {/* ... (cuerpo de la tabla para las citas filtradas) */}
                          <td className="border border-black p-2">
                            {cita.idCita}
                          </td>
                          <td className="border border-black p-2">
                            {cita.dpiPaciente}
                          </td>
                          <td className="border border-black p-2">
                            {cita.nombreCompletoPaciente}
                          </td>
                          <td className="border border-black p-2">
                            {cita.tipoServicio}
                          </td>
                          <td className="border border-black p-2">
                            {cita.FormaPago}
                          </td>
                          <td className="border border-black p-2">
                            {formatDate(cita.fechaHoraCita)}
                          </td>
                          <td className="border border-black  p-2">
                            {cita.estadoCita}
                          </td>
                        </tr>
                      ))
                    : citas.map((cita) => (
                        <tr key={cita.idCita}>
                          {/* ... (cuerpo de la tabla para todas las citas) */}
                          <td className="border border-black p-2">
                            {cita.idCita}
                          </td>
                          <td className="border border-black p-2">
                            {cita.dpiPaciente}
                          </td>
                          <td className="border border-black p-2">
                            {cita.nombreCompletoPaciente}
                          </td>
                          <td className="border border-black p-2">
                            {cita.tipoServicio}
                          </td>
                          <td className="border border-black p-2">
                            {cita.FormaPago}
                          </td>
                          <td className="border border-black p-2">
                            {formatDate(cita.fechaHoraCita)}
                          </td>
                          <td className="border border-black  p-2">
                            {cita.estadoCita}
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

export default OperacionesCitas;
