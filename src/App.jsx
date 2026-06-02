import { useState, useEffect } from 'react';
import { obtenerPersonajes, obtenerPersonaje } from './services/rickAndMortyService';
import ListaPersonajes from './components/ListaPersonajes';
import DetallePersonaje from './components/DetallePersonaje';

function App() {
  const [personajes, setPersonajes] = useState([]);
  const [personajeSeleccionado, setPersonajeSeleccionado] = useState(null);
  const [cargandoLista, setCargandoLista] = useState(true);
  const [cargandoDetalle, setCargandoDetalle] = useState(false);
  const [error, setError] = useState(null);

  // Cargar la lista al montar el componente
  useEffect(() => {
    obtenerPersonajes()
      .then((datos) => {
        setPersonajes(datos);
        setCargandoLista(false);
      })
      .catch((err) => {
        setError(err.message);
        setCargandoLista(false);
      });
  }, []);

  // Cargar el detalle cuando el usuario hace clic
  const manejarSeleccion = (id) => {
    setCargandoDetalle(true);
    setPersonajeSeleccionado(null);
    obtenerPersonaje(id)
      .then((datos) => {
        setPersonajeSeleccionado(datos);
        setCargandoDetalle(false);
      })
      .catch((err) => {
        setError(err.message);
        setCargandoDetalle(false);
      });
  };

  return (
    <div className="container-fluid">
      {/* Encabezado */}
      <nav className="navbar navbar-dark bg-dark mb-4">
        <div className="container">
          <span className="navbar-brand fw-bold fs-4">🛸 Rick and Morty Explorer</span>
        </div>
      </nav>

      {/* Mensaje de error global */}
      {error && (
        <div className="container">
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        </div>
      )}

      {/* Layout principal */}
      <div className="container">
        <div className="row g-4">
          {/* Columna izquierda: Lista */}
          <div className="col-12 col-md-4">
            <h5 className="fw-bold mb-3">Personajes</h5>
            {cargandoLista ? (
              <div className="d-flex justify-content-center mt-5">
                <div className="spinner-border text-success" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
              </div>
            ) : (
              <ListaPersonajes
                personajes={personajes}
                onSeleccionar={manejarSeleccion}
                personajeSeleccionadoId={personajeSeleccionado?.id}
              />
            )}
          </div>

          {/* Columna derecha: Detalle */}
          <div className="col-12 col-md-8" style={{ minHeight: '400px' }}>
            <h5 className="fw-bold mb-3">Detalle</h5>
            <DetallePersonaje
              personaje={personajeSeleccionado}
              cargando={cargandoDetalle}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
