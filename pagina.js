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
    actualizarCarrito();
    mostrarCarrito();
});

document.getElementById('modalCarrito').addEventListener('shown.bs.modal', () => {
    mostrarCarrito();
});

document.getElementById('comprarCarrito').addEventListener('click', () => {
    if (carrito.length > 0) {
        console.log("¡Compra realizada con éxito!");
        console.log("Productos comprados:");
        carrito.forEach(producto => {
            console.log(`${producto.nombre} - $${producto.precio.toFixed(2)}`);
        });

        carrito = [];
        actualizarCarrito();
        mostrarCarrito();
    } else {
        console.log("El carrito está vacío. No se puede realizar la compra.");
    }
});