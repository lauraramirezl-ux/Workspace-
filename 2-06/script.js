async function obtenerPersonaje(id) {
  try {
    const respuesta = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    const personaje = await respuesta.json();

    console.log(personaje);
  } catch (error) {
    console.log("Error:", error);
  }
}

obtenerPersonaje(1);

async function obtenerPersonajes(ids) {
  try {
    const respuesta = await fetch(`https://rickandmortyapi.com/api/character/${ids.join(",")}`);
    const personajes = await respuesta.json();

    console.log(personajes);
  } catch (error) {
    console.log("Error:", error);
  }
}

async function SoloNombres(ids) {
  try {
    const respuesta = await fetch(`https://rickandmortyapi.com/api/character/${ids.join(",")}`);
    const personajes = await respuesta.json();

    const nombres = personajes.map(personaje => personaje.name);
    console.log(nombres);
  } catch (error) {
    console.log("Error:", error);
  }
}

async function obtenerPagina(numeroPagina) {
    try {
        const respuesta = await fetch(`https://rickandmortyapi.com/api/character/?page=${numeroPagina}`);
        const pagina = await respuesta.json();

        console.log(pagina);
    } catch (error) {
        console.log("Error:", error);
    }
}

obtenerPagina(2);