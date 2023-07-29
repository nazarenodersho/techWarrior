// Ventanas de las categorias

async function mostrarVentana(categoria) {
  const ventana = document.getElementById(categoria);
  ventana.style.display = "block";

  try {
      const response = await fetch("../json/data.json");
      const data = await response.json();
      const productos = data[categoria];

      // Mostrar los productos en su ventana:
      const contenidoVentana = ventana.querySelector(".contenidoVentana");
      contenidoVentana.innerHTML = "";

      productos.forEach((producto) => {
          const itemProducto = `
          <div class="producto">
              <img src="${producto.imagen}" alt="${producto.nombre}">
              <h4>${producto.nombre}</h4>
              <p>${producto.descripcion}</p>
              <p>Precio: $${producto.precio}</p>
              <button onclick="agregarAlCarrito('${producto.nombre}')">Agregar al carrito</button>
          </div>
          `;
          contenidoVentana.insertAdjacentHTML("beforeend", itemProducto);
      });
  } catch (error) {
      console.error("Error en el archivo JSON:", error);
  }
}

// Funcion para agregar productos al carrito:

async function agregarAlCarrito(nombreProducto) {
  try {
      const response = await fetch("../json/data.json");
      const data = await response.json();
      const productoSeleccionado = buscarProductoPorNombre(nombreProducto, data);
      if (productoSeleccionado) {
          agregarProductoAlLocalStorage(productoSeleccionado);
          swal("Producto agregado al carrito!", {
              buttons: false,
              timer: 1800,
          });
          actualizarVentanaCarrito();
      } else {
          alert("Producto seleccionado no disponible");
      }
  } catch (error) {
      console.error("Error en el archivo JSON:", error);
  }
}

// Cerrar las ventanas

function cerrarVentana(categoria) {
    const ventana = document.getElementById(categoria);
    ventana.style.display = "none";
}