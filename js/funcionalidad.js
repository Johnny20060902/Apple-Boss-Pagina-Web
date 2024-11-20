// Obtener todos los enlaces de categoría y los productos
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
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});
