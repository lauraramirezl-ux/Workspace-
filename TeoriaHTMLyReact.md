# Teoría de HTML, CSS y React

Este documento explica las bases de HTML, CSS y React con ejemplos sencillos. La idea es entender primero para qué sirve cada herramienta y después ver cómo se relacionan.

# 1. HTML

## 1.1 ¿Qué es una etiqueta HTML?

Una etiqueta HTML es una marca que le indica al navegador qué tipo de contenido estamos escribiendo. Por ejemplo, puede decirle que un texto es un párrafo, un título, un enlace o una imagen. Gracias a estas etiquetas, el navegador puede organizar y mostrar la página.

Muchas etiquetas tienen una etiqueta de apertura y otra de cierre. La apertura se escribe con el nombre entre los signos `<` y `>`, y el cierre añade una barra `/`. El contenido se coloca entre ambas etiquetas.

```html
<p>Hola mundo</p>
```

En este ejemplo, `<p>` es la etiqueta de apertura, `Hola mundo` es el contenido y `</p>` es la etiqueta de cierre. El navegador muestra el texto como un párrafo.

Un atributo es una información adicional que se escribe dentro de la etiqueta de apertura. Los atributos ayudan a configurar o describir el elemento. Normalmente tienen un nombre, un signo igual y un valor entre comillas.

```html
<a href="https://www.google.com">Ir a Google</a>
```

Aquí:

- `<a>` indica que estamos creando un enlace.
- `href` es el atributo que contiene la dirección a la que llevará el enlace.
- `"https://www.google.com"` es el valor del atributo.
- `Ir a Google` es el texto que verá y podrá pulsar la persona usuaria.
- `</a>` cierra el enlace.

También existen etiquetas que no necesitan una etiqueta de cierre porque no contienen contenido entre una apertura y un cierre. Por ejemplo, `<br>` inserta un salto de línea y `<meta>` añade información sobre el documento.

## 1.2 Estructura de un archivo HTML

Un archivo HTML suele tener una estructura básica. Esta estructura separa la información del documento de lo que se muestra dentro de la página.

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi página</title>
</head>
<body>

    <h1>Hola mundo</h1>
    <p>Esta es mi primera página web.</p>

</body>
</html>
```

La función de cada parte es la siguiente:

- `<!DOCTYPE html>` indica al navegador que el documento utiliza HTML moderno.
- `<html>` es el elemento que contiene todo el documento. `lang="es"` indica que el contenido está en español.
- `<head>` contiene información de configuración que normalmente no aparece como contenido principal de la página.
- `<meta charset="UTF-8">` permite utilizar correctamente letras, tildes y otros caracteres.
- `<meta name="viewport" ...>` ayuda a que la página se adapte a dispositivos móviles.
- `<title>` define el título que aparece en la pestaña del navegador.
- `<body>` contiene todo lo que la persona verá en la página, como títulos y párrafos.
- `<h1>` muestra el título principal.
- `<p>` muestra un párrafo.

## 1.3 Cinco etiquetas de texto en HTML

HTML ofrece diferentes etiquetas para organizar y dar significado al texto.

### `<h1>`

Se utiliza para el título principal de una página o de una sección importante.

```html
<h1>Mi título</h1>
```

El navegador muestra `Mi título` como un encabezado grande y destacado.

### `<p>`

Se utiliza para escribir un párrafo de texto.

```html
<p>Este es un párrafo.</p>
```

El texto aparece como un bloque separado, adecuado para una explicación o una idea completa.

### `<strong>`

Indica que un texto es importante. Normalmente el navegador lo muestra en negrita.

```html
<strong>Texto importante</strong>
```

La frase aparece destacada y además comunica que tiene una importancia especial.

### `<em>`

Indica que queremos dar énfasis a un texto. Normalmente el navegador lo muestra en cursiva.

```html
<em>Texto destacado</em>
```

El texto aparece inclinado para llamar la atención sobre esa parte.

### `<br>`

Inserta un salto de línea sin comenzar un párrafo nuevo.

```html
Hola<br>
Mundo
```

El navegador muestra `Hola` y `Mundo` en líneas diferentes. Esta etiqueta no necesita cierre.

## 1.4 Links en HTML

Los enlaces o links permiten pasar de una página a otra, abrir un archivo o visitar una dirección. Para crearlos se utiliza la etiqueta `<a>`, que significa anchor o ancla.

```html
<a href="https://www.google.com">Visitar Google</a>
```

`<a>` marca el comienzo del enlace y `</a>` lo cierra. El atributo `href` contiene la dirección de destino. Cuando la persona hace clic en `Visitar Google`, el navegador abre esa dirección en la misma pestaña.

Para abrir el enlace en una nueva pestaña se puede utilizar el atributo `target` con el valor `_blank`:

```html
<a href="https://www.google.com" target="_blank">
    Abrir Google en otra pestaña
</a>
```

En este caso, `href` sigue indicando el destino y `target="_blank"` le pide al navegador que abra el destino en otra pestaña. El texto entre las etiquetas sigue siendo la parte visible y pulsable del enlace.

# 2. CSS

## 2.1 ¿Qué es CSS?

CSS es el lenguaje que se utiliza para dar estilo a una página HTML. Permite cambiar colores, tamaños, espacios, posiciones y otros aspectos visuales. HTML organiza el contenido y CSS decide cómo se presenta.

```css
p {
    color: blue;
    font-size: 20px;
}
```

En este ejemplo:

- `p` es el selector: indica que la regla se aplicará a los párrafos.
- `color` es la propiedad que cambia el color del texto.
- `blue` es el valor de `color` y significa azul.
- `font-size` es la propiedad que cambia el tamaño de la letra.
- `20px` es el valor del tamaño: veinte píxeles.
- Las llaves `{}` contienen las reglas y cada declaración termina con `;`.

## 2.2 Selectores CSS

Los selectores CSS sirven para elegir qué elementos HTML recibirán unos estilos. Según el selector, podemos aplicar una regla a todas las etiquetas de un tipo, a elementos con una clase o a un elemento con un identificador.

### Selector por etiqueta

```css
p {
    color: blue;
}
```

El selector `p` selecciona todos los párrafos de la página y muestra su texto en azul.

### Selector por clase

HTML:

```html
<p class="texto">Hola mundo</p>
```

CSS:

```css
.texto {
    color: red;
}
```

El atributo `class="texto"` asigna la clase `texto` al párrafo. En CSS, el punto delante de `texto` indica que estamos seleccionando una clase. Este estilo puede reutilizarse en muchos elementos.

### Selector por ID

HTML:

```html
<p id="titulo">Hola mundo</p>
```

CSS:

```css
#titulo {
    color: green;
}
```

El atributo `id="titulo"` identifica un elemento concreto. En CSS, `#` indica que estamos seleccionando un ID. Normalmente un ID debe ser único dentro de la página.

La diferencia principal es que el selector por etiqueta puede afectar a muchos elementos del mismo tipo, una clase puede reutilizarse en varios elementos y un ID está pensado para identificar un elemento específico.

## 2.3 Múltiples selectores CSS

Un mismo elemento HTML puede coincidir con más de un selector. En ese caso, puede recibir propiedades de varias reglas.

```html
<p class="destacado">Hola mundo</p>
```

```css
p {
    font-size: 20px;
}

.destacado {
    color: red;
}
```

El párrafo recibe las dos reglas: su letra mide `20px` porque coincide con `p` y su texto es rojo porque tiene la clase `destacado`.

Si dos reglas intentan cambiar la misma propiedad, CSS decide cuál tiene prioridad utilizando sus reglas de cascada. Una parte importante de esa decisión es la especificidad: un selector de ID suele tener más prioridad que uno de clase, y uno de clase suele tener más prioridad que uno de etiqueta. Cuando la especificidad es igual, normalmente gana la regla que aparece más tarde.

# 3. React

## 3.1 ¿Qué es un componente de React?

Un componente de React es una parte reutilizable de una interfaz. Podemos imaginarlo como una pieza de la página, por ejemplo un saludo, una tarjeta de producto o un formulario. Un componente puede contener etiquetas HTML mediante JSX, tener lógica, recibir información y guardar un estado que cambie con el tiempo.

```jsx
function Saludo() {
    return (
        <h1>Hola mundo</h1>
    );
}

export default Saludo;
```

Paso a paso:

1. `function Saludo()` crea una función llamada `Saludo`. En React, una función con este formato puede ser un componente.
2. `return` indica qué contenido debe mostrar el componente.
3. `<h1>Hola mundo</h1>` es JSX y representa un título en la interfaz.
4. `export default Saludo` permite importar y utilizar este componente desde otro archivo.

Los nombres de los componentes empiezan normalmente con mayúscula para diferenciarlos de las etiquetas HTML.

## 3.2 Componentes de React y etiquetas HTML

Una etiqueta HTML representa directamente un elemento de la interfaz:

```jsx
<h1>Hola mundo</h1>
```

Un componente de React puede devolver esa etiqueta y convertirla en una pieza reutilizable:

```jsx
function Saludo() {
    return <h1>Hola mundo</h1>;
}
```

Ambos ejemplos terminan mostrando un título con el texto `Hola mundo`. La diferencia es que el segundo guarda ese título dentro de una función que podemos utilizar varias veces. Además, un componente puede agrupar varias etiquetas HTML y añadir lógica.

JSX permite escribir una sintaxis parecida a HTML dentro de JavaScript. No es exactamente HTML, pero ayuda a describir de forma clara lo que debe aparecer en la pantalla.

| Aspecto | Etiqueta HTML | Componente de React |
|---|---|---|
| Qué representa | Un elemento de la interfaz | Una pieza reutilizable de la interfaz |
| Dónde se escribe | En un archivo HTML | En un archivo JavaScript o JSX |
| Puede agrupar elementos | Puede contener otros elementos | Puede devolver varias etiquetas HTML |
| Puede reutilizarse | Se repite escribiendo la etiqueta | Se utiliza escribiendo `<Saludo />` |

# 4. Variables en un componente de React

Dentro de un componente podemos utilizar variables para guardar datos que necesitamos mostrar o usar en la lógica. JSX permite colocar una variable entre llaves para mostrar su valor.

### Variable normal con `let`

```jsx
function App() {
    let nombre = "Laura";

    return <h1>Hola {nombre}</h1>;
}
```

La variable `nombre` guarda el texto `Laura`. Las llaves `{nombre}` hacen que JSX muestre ese valor, por lo que la página enseña `Hola Laura`.

### Constante con `const`

```jsx
function App() {
    const edad = 20;

    return <p>Tengo {edad} años</p>;
}
```

La constante `edad` guarda el número `20`, y JSX lo inserta en el párrafo. El resultado visible es `Tengo 20 años`.

La diferencia básica es que una variable declarada con `let` puede recibir otro valor más adelante, mientras que una declarada con `const` no se puede reasignar. En React también trabajamos con:

- Variables normales, para datos temporales o cálculos dentro del componente.
- Constantes, para valores que no necesitamos reasignar.
- Props, que son datos recibidos desde otro componente.
- Estado mediante `useState`, para datos que pueden cambiar y deben actualizar la interfaz.

Las props y el estado no son exactamente lo mismo que una variable común. Las props llegan desde el componente padre y el estado está controlado por React para provocar una nueva representación cuando cambia.

# 5. Props

## 5.1 ¿Qué son los props?

Las props son datos que un componente padre envía a un componente hijo. Sirven para que el mismo componente pueda mostrar información diferente según los datos que reciba. Se parecen a los atributos de una etiqueta HTML, pero los define quien utiliza el componente.

```jsx
function Saludo({ nombre }) {
    return <h1>Hola {nombre}</h1>;
}

function App() {
    return <Saludo nombre="Laura" />;
}

export default App;
```

En este ejemplo, `App` es el componente padre porque utiliza a `Saludo`. `Saludo` es el componente hijo porque recibe información desde `App`.

- `nombre="Laura"` envía el texto `Laura` como prop.
- `{ nombre }` recibe y extrae esa prop dentro de la función `Saludo`.
- `{nombre}` dentro del `<h1>` muestra el valor recibido.
- El resultado de la aplicación sería un título que dice `Hola Laura`.

El componente hijo utiliza las props para leer información. Si necesita cambiar un dato, normalmente el cambio se gestiona en el componente que posee ese dato y se envía una nueva prop.

# 6. useState

`useState` es un Hook de React que permite crear y modificar información que forma parte del estado de un componente. Se utiliza cuando un dato puede cambiar por una acción de la persona usuaria o por otra parte de la aplicación.

```jsx
import { useState } from "react";

function Contador() {
    const [contador, setContador] = useState(0);

    return (
        <div>
            <p>Contador: {contador}</p>

            <button onClick={() => setContador(contador + 1)}>
                Aumentar
            </button>
        </div>
    );
}

export default Contador;
```

- `useState` crea un valor de estado y una forma de actualizarlo.
- `contador` es el valor actual del contador.
- `setContador` es la función que cambia ese valor.
- `useState(0)` establece `0` como valor inicial.
- `onClick` indica qué debe ocurrir al pulsar el botón.
- Al pulsar `Aumentar`, se llama a `setContador` con el valor actual más uno.
- React actualiza el estado y vuelve a renderizar el componente para mostrar el número nuevo.

No se debe cambiar directamente el valor de estado. En este caso, se utiliza `setContador` para que React se entere del cambio y actualice la interfaz.

# 7. useEffect

`useEffect` es un Hook de React que permite ejecutar código como consecuencia de ciertos cambios o después de que el componente se renderiza. Es útil para efectos secundarios, como mostrar mensajes en la consola, pedir datos a un servidor o sincronizar información.

```jsx
import { useEffect } from "react";

function App() {

    useEffect(() => {
        console.log("El componente se ha renderizado");
    }, []);

    return (
        <h1>Hola mundo</h1>
    );
}

export default App;
```

La función que recibe `useEffect` contiene el código que queremos ejecutar. El segundo argumento es `[]`, un arreglo de dependencias vacío. Esto significa que este efecto se ejecuta una vez después del primer renderizado del componente.

En este ejemplo, aparece el mensaje `El componente se ha renderizado` en la consola del navegador después de que se muestra el título.

También podemos indicar una dependencia:

```jsx
import { useState, useEffect } from "react";

function Contador() {

    const [contador, setContador] = useState(0);

    useEffect(() => {
        console.log("El contador cambió");
    }, [contador]);

    return (
        <button onClick={() => setContador(contador + 1)}>
            Contador: {contador}
        </button>
    );
}

export default Contador;
```

`[contador]` indica que el efecto depende del valor `contador`. El efecto se ejecuta después del primer renderizado y también cada vez que `contador` cambia. Al pulsar el botón, `setContador` actualiza el estado, React vuelve a renderizar el componente y después ejecuta el efecto.

# 8. Diferencias entre useState y useEffect

| Característica | `useState` | `useEffect` |
|---|---|---|
| ¿Para qué sirve? | Guardar y modificar estado | Ejecutar efectos secundarios |
| ¿Puede cambiar información? | Sí, mediante su función actualizadora | No es su función principal |
| ¿Provoca una actualización del componente? | Sí, cuando cambia el estado | Puede ejecutarse como consecuencia de cambios |
| Uso común | Contadores, formularios y datos | Peticiones, eventos y sincronización |

Dicho de forma sencilla, `useState` guarda un dato que forma parte de la interfaz y ofrece una función para cambiarlo. `useEffect` ejecuta una acción relacionada con el renderizado o con cambios en otros datos. Uno administra estado y el otro reacciona a situaciones que ocurren en el componente.

Ambos pueden utilizarse juntos:

```jsx
import { useState, useEffect } from "react";

function App() {

    const [nombre, setNombre] = useState("");

    useEffect(() => {
        console.log("El nombre cambió:", nombre);
    }, [nombre]);

    return (
        <div>
            <input
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />

            <p>Hola {nombre}</p>
        </div>
    );
}

export default App;
```

`useState` guarda el texto escrito en `nombre`. El `input` llama a `setNombre` cada vez que cambia su contenido, y React actualiza el párrafo para mostrar el nuevo saludo. `useEffect` observa `nombre` gracias a `[nombre]` y escribe un mensaje en la consola después de cada cambio.

# Resumen

- **HTML:** organiza el contenido de una página web.
- **Etiquetas HTML:** indican si un contenido es un título, párrafo, enlace u otro elemento.
- **Estructura HTML:** utiliza `DOCTYPE`, `html`, `head`, `meta`, `title` y `body` para formar un documento correcto.
- **Links:** se crean con `<a>` y utilizan `href` para indicar el destino.
- **CSS:** da estilos y apariencia al contenido HTML.
- **Selectores CSS:** eligen los elementos a los que se aplican los estilos.
- **Componentes de React:** son piezas reutilizables de una interfaz.
- **JSX:** permite escribir una sintaxis parecida a HTML dentro de JavaScript.
- **Variables:** guardan datos que el componente puede utilizar.
- **Props:** envían información desde un componente padre hacia un componente hijo.
- **useState:** guarda datos que pueden cambiar y actualiza la interfaz cuando cambian.
- **useEffect:** ejecuta acciones relacionadas con el renderizado o con cambios en los datos.
- **Diferencia entre `useState` y `useEffect`:** `useState` administra el estado; `useEffect` reacciona a cambios o ejecuta efectos secundarios.

Con estas bases ya es posible comprender cómo se estructura una página con HTML, cómo se presenta con CSS y cómo React ayuda a crear interfaces formadas por componentes reutilizables.
