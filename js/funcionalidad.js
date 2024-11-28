// Obtener todos los enlaces de categoría y las tarjetas de productos
const categoryLinks = document.querySelectorAll('.category-link');
const productCards = document.querySelectorAll('.product-card');

// Función para filtrar productos
categoryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Evita recargar la página

        // Obtener la categoría seleccionada
        const category = link.getAttribute('data-category');

        // Activar el enlace seleccionado
        categoryLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        // Mostrar u ocultar productos según la categoría
        productCards.forEach(card => {
            if (category === 'all' || card.classList.contains(`category-${category}`)) {
                card.classList.remove('hidden'); // Mostrar producto
            } else {
                card.classList.add('hidden'); // Ocultar producto
            }
        });
    });
});