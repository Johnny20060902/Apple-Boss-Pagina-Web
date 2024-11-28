$(document).ready(function () {
    // Carrito de compras (simulación inicial)
    const carrito = [];

    // Función para agregar productos al carrito
    function agregarProducto(nombre, precio) {
        const productoExistente = carrito.find(producto => producto.nombre === nombre);
        if (productoExistente) {
            productoExistente.cantidad += 1; // Incrementa la cantidad si ya está en el carrito
        } else {
            carrito.push({ nombre, precio, cantidad: 1 });
        }
        actualizarCarrito();
    }

    // Función para actualizar el contenido del carrito
    function actualizarCarrito() {
        const cartItems = $('#cart-items');
        const totalPrice = $('#total-price');
        let total = 0; // Variable para calcular el total

        cartItems.empty(); // Limpia los productos anteriores en el modal

        if (carrito.length === 0) {
            // Si el carrito está vacío, mostrar mensaje
            cartItems.html('<p>Tu carrito está vacío.</p>');
            totalPrice.text('0.00'); // Total a pagar es 0
        } else {
            // Recorre los productos del carrito
            carrito.forEach(producto => {
                // Suma al total el precio por la cantidad
                total += producto.precio * producto.cantidad;

                // Añade cada producto al modal
                cartItems.append(`
                    <div class="producto">
                        <p><strong>${producto.nombre}</strong> - Bs ${producto.precio} x ${producto.cantidad} = Bs ${(producto.precio * producto.cantidad).toFixed(2)}</p>
                    </div>
                `);
            });

            // Muestra el total calculado en el modal
            totalPrice.text(total.toFixed(2)); // Muestra el total con dos decimales
        }
    }

    // Evento: Agregar productos al carrito desde botones
    $('.add-to-cart').on('click', function () {
        const nombre = $(this).data('nombre');
        const precio = parseFloat($(this).data('precio'));
        agregarProducto(nombre, precio);
    });

    // Evento: Abre el modal y muestra el carrito actualizado
    $('[data-target="#cartModal"]').on('click', function () {
        actualizarCarrito();
    });
});
$(document).ready(function () {
    // Carrito de compras (simulación inicial)
    const carrito = [];

    // Función para agregar productos al carrito
    function agregarProducto(nombre, precio, imagen) {
        const productoExistente = carrito.find(producto => producto.nombre === nombre);
        if (productoExistente) {
            productoExistente.cantidad += 1; // Incrementa la cantidad si ya está en el carrito
        } else {
            carrito.push({ nombre, precio, cantidad: 1, imagen });
        }
        actualizarCarrito();
    }

    // Función para eliminar un producto del carrito
    function eliminarProducto(nombre) {
        const index = carrito.findIndex(producto => producto.nombre === nombre);
        if (index !== -1) {
            carrito.splice(index, 1); // Elimina el producto del carrito
        }
        actualizarCarrito();
    }

    // Función para actualizar el contenido del carrito
    function actualizarCarrito() {
        const cartItems = $('#cart-items');
        const totalPrice = $('#total-price');
        let total = 0; // Variable para calcular el total

        cartItems.empty(); // Limpia los productos anteriores en el modal

        if (carrito.length === 0) {
            // Si el carrito está vacío, mostrar mensaje
            cartItems.html('<p>Tu carrito está vacío.</p>');
            totalPrice.text('0.00'); // Total a pagar es 0
        } else {
            // Recorre los productos del carrito
            carrito.forEach(producto => {
                // Suma al total el precio por la cantidad
                total += producto.precio * producto.cantidad;

                // Añade cada producto al modal con imagen, nombre, precio, cantidad y botón de eliminar
                cartItems.append(`
                    <div class="producto d-flex align-items-center justify-content-between border-bottom pb-2 mb-2">
                        <img src="${producto.imagen}" alt="${producto.nombre}" width="50" height="50">
                        <div class="text-left">
                            <p class="mb-0"><strong>${producto.nombre}</strong></p>
                            <p class="mb-0">Bs ${producto.precio} x ${producto.cantidad} = Bs ${(producto.precio * producto.cantidad).toFixed(2)}</p>
                        </div>
                        <button class="btn btn-danger btn-sm eliminar-producto" data-nombre="${producto.nombre}">&times;</button>
                    </div>
                `);
            });

            // Muestra el total calculado en el modal
            totalPrice.text(total.toFixed(2)); // Muestra el total con dos decimales
        }

        // Evento para eliminar productos del carrito
        $('.eliminar-producto').on('click', function () {
            const nombre = $(this).data('nombre');
            eliminarProducto(nombre);
        });
    }

    // Evento: Agregar productos al carrito desde botones
    $('.add-to-cart').on('click', function () {
        const nombre = $(this).data('nombre');
        const precio = parseFloat($(this).data('precio'));
        const imagen = $(this).data('imagen');
        agregarProducto(nombre, precio, imagen);
    });

    // Evento: Abre el modal y muestra el carrito actualizado
    $('[data-target="#cartModal"]').on('click', function () {
        actualizarCarrito();
    });
});
