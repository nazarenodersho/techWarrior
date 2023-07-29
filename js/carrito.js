// Abrir la ventana del carrito:

document.getElementById('carritoImg').addEventListener('click', function() {
    let ventanaCarrito = document.getElementById('ventanaCarrito');
    ventanaCarrito.style.display = 'block';
  });

// Buscar producto por nombre dentro del JSON:

function buscarProductoPorNombre(nombreProducto, productosJSON) {
  for (const categoria in productosJSON) {
      const productos = productosJSON[categoria];
      const productoEncontrado = productos.find((producto) => producto.nombre === nombreProducto);
      if (productoEncontrado) {
          return productoEncontrado;
      }
  }
  return null;
}

// Agregar el producto seleccionado al LocalStorage:

function agregarProductoAlLocalStorage(producto) {
  const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
  carritoActual.push(producto);
  localStorage.setItem("carrito", JSON.stringify(carritoActual));
}

// Limpiar el carrito:

document.getElementById('limpiarCarrito').addEventListener('click', function() {
  localStorage.removeItem('carrito'); 
  actualizarVentanaCarrito();
});

// Limpiar producto especifico seleccionado:

function eliminarProductoCarrito(nombreProducto) {
  const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
  const nuevoCarrito = carritoActual.filter((producto) => producto.nombre !== nombreProducto);
  localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  actualizarVentanaCarrito();
}

// Actualizar la ventana del carrito con los productos del almacenamiento local:

function actualizarVentanaCarrito() {
  const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
  const contenidoCarrito = document.querySelector(".contenidoCarrito");
  const totalCarrito = document.getElementById("totalPrecio");

  let total = 0;

  const productosLista = document.getElementById("productosLista");
  productosLista.innerHTML = "";

  carritoActual.forEach((producto) => {
    const itemCarrito = document.createElement("div");
    itemCarrito.classList.add("itemCarrito");

    const nombreProducto = document.createElement("p");
    nombreProducto.textContent = producto.nombre;

    const precioProducto = document.createElement("p");
    precioProducto.textContent = `Precio: $${producto.precio}`;

    const eliminarProductoBtn = document.createElement("button");
    eliminarProductoBtn.classList.add("eliminar-producto-btn");
    eliminarProductoBtn.innerHTML = "&#10060;";
    eliminarProductoBtn.addEventListener("click", function() {
      eliminarProductoCarrito(producto.nombre);
    });

    const eliminarProductoContainer = document.createElement("div");
    eliminarProductoContainer.classList.add("eliminar-producto-container");
    eliminarProductoContainer.appendChild(eliminarProductoBtn);

    itemCarrito.appendChild(nombreProducto);
    itemCarrito.appendChild(precioProducto);
    itemCarrito.appendChild(eliminarProductoContainer);

    productosLista.appendChild(itemCarrito);

    total += producto.precio;
  });

  totalCarrito.textContent = total;
}

// Llamada inicial para actualizar la ventana del carrito al cargar la página:

document.addEventListener("DOMContentLoaded", function() {
  actualizarVentanaCarrito();
});

// Cerrar la ventana del carrito 

document.getElementById('cerrarVentana').addEventListener('click', function() {
    let ventanaCarrito = document.getElementById('ventanaCarrito');
    ventanaCarrito.style.display = 'none';
  });