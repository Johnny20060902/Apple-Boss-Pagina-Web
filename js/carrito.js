$(document).ready(function () {
    // Inicializamos el carrito vacío
    const carrito = [];

    // Función para agregar productos al carrito
    function agregarProducto(nombre, precio, imagen) {
        // Buscar si el producto ya existe en el carrito
        const productoExistente = carrito.find(producto => producto.nombre === nombre);

        if (productoExistente) {
            productoExistente.cantidad += 1; // Si existe, aumenta la cantidad
        } else {
            carrito.push({ nombre, precio, cantidad: 1, imagen }); // Si no existe, lo agrega
        }

        actualizarCarrito(); // Actualiza el carrito
    }

    // Función para eliminar un producto del carrito
    function eliminarProducto(nombre) {
        const index = carrito.findIndex(producto => producto.nombre === nombre);
        if (index !== -1) {
            carrito.splice(index, 1); // Elimina el producto del carrito
        }
        actualizarCarrito(); // Actualiza el carrito
    }

    // Función para actualizar el contenido del carrito
    function actualizarCarrito() {
        const cartItems = $('#cart-items'); // Contenedor de productos en el carrito
        const totalPrice = $('#total-price'); // Contenedor del precio total
        let total = 0; // Variable para calcular el total

        cartItems.empty(); // Limpia los productos anteriores en el carrito

        if (carrito.length === 0) {
            // Si el carrito está vacío, mostrar mensaje
            cartItems.html('<p>Tu carrito está vacío.</p>');
            totalPrice.text('0.00'); // Total a pagar es 0
        } else {
            // Recorre los productos del carrito y los muestra
            carrito.forEach(producto => {
                total += producto.precio * producto.cantidad; // Calcula el total

                // Añade el producto al carrito con imagen, nombre, precio y botón de eliminar
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

            // Muestra el total calculado
            totalPrice.text(total.toFixed(2)); // Total con dos decimales
        }

        // Evento para eliminar productos del carrito
        $('.eliminar-producto').off('click').on('click', function () {
            const nombre = $(this).data('nombre');
            eliminarProducto(nombre); // Llama a la función para eliminar el producto
        });
    }

    // Evento: Agregar productos al carrito desde botones
    $('.add-to-cart').on('click', function () {
        const nombre = $(this).data('nombre'); // Obtiene el nombre del producto
        const precio = parseFloat($(this).data('precio')); // Obtiene el precio del producto
        const imagen = $(this).data('imagen'); // Obtiene la imagen del producto
        agregarProducto(nombre, precio, imagen); // Agrega el producto al carrito
    });

    // Evento: Mostrar el carrito al abrir el modal
    $('[data-target="#cartModal"]').on('click', function () {
        actualizarCarrito(); // Actualiza el carrito cuando se abre el modal
    });
});