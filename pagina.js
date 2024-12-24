let carrito = [];

function actualizarCarrito() {
    const botonCarrito = document.getElementById('verCarrito');
    botonCarrito.innerText = `Ver Carrito (${carrito.length})`;
}

function mostrarCarrito() {
    const carritoLista = document.getElementById('carritoLista');
    carritoLista.innerHTML = ''; 

    if (carrito.length === 0) {
        carritoLista.innerHTML = '<li class="list-group-item">No hay productos en el carrito.</li>';
        return;
    }

    carrito.forEach((producto, index) => {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.innerHTML = `${producto.nombre} - $${producto.precio.toFixed(2)}
                        <button class="btn btn-danger btn-sm float-end" onclick="eliminarDelCarrito(${index})">Eliminar</button>`;
        carritoLista.appendChild(li);
    });
}

document.querySelectorAll('.agregar').forEach(boton => {
    boton.addEventListener('click', (e) => {
        const nombre = e.target.getAttribute('data-nombre');
        const precio = parseFloat(e.target.getAttribute('data-precio'));

        carrito.push({ nombre, precio });

        actualizarCarrito();
        mostrarCarrito();
    });
});

function eliminarDelCarrito(index) {
    carrito.splice(index, 1); 
    actualizarCarrito();
    mostrarCarrito();
}

document.getElementById('vaciarCarrito').addEventListener('click', () => {
    carrito = [];
    document.getElementById('reseñaGeneral').value = ''; 
    document.getElementById('correoUsuario').value = ''; 
    actualizarCarrito();
    mostrarCarrito();
});

document.getElementById('modalCarrito').addEventListener('shown.bs.modal', () => {
    mostrarCarrito();
});

document.getElementById('comprarCarrito').addEventListener('click', () => {
    if (carrito.length > 0) {
        let contenidoCarrito = "Detalles de la compra:\n\n";

        carrito.forEach(producto => {
            contenidoCarrito += `${producto.nombre} - $${producto.precio.toFixed(2)}\n`;
        });

        const reseñaGeneral = document.getElementById('reseñaGeneral').value.trim();
        if (reseñaGeneral) {
            contenidoCarrito += `\nReseña: ${reseñaGeneral}`;
        }

        const correoUsuario = document.getElementById('correoUsuario').value.trim() || "correo@usuario.com";

        console.log("Detalles de la compra:");
        console.log("Correo del usuario: " + correoUsuario);
        console.log(contenidoCarrito);

        carrito = [];
        document.getElementById('reseñaGeneral').value = '';
        document.getElementById('correoUsuario').value = ''; 
        actualizarCarrito();
        mostrarCarrito();

        alert("Compra realizada con éxito. Revisa la consola para los detalles.");
    } else {
        alert("Tu carrito está vacío. No puedes realizar la compra.");
    }
});