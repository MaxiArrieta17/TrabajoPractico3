const JSON_URL_CAT = '../../productos.json';

async function cargarProductosCategoria() {
    const contenedorPcs = document.getElementById('contenedor-pcs');
    const contenedorMonitores = document.getElementById('contenedor-monitores');
    const contenedorPerifericos = document.getElementById('contenedor-perifericos');

    if (!contenedorPcs && !contenedorMonitores && !contenedorPerifericos) return;

    try {
        const respuesta = await fetch(JSON_URL_CAT);
        const productos = await respuesta.json();

        let productosFiltrados = [];
        let contenedorActivo = null;

        if (contenedorPcs) {
            productosFiltrados = productos.filter(p => p.categoria === 'pcs');
            contenedorActivo = contenedorPcs;
        } else if (contenedorMonitores) {
            productosFiltrados = productos.filter(p => p.categoria === 'monitores');
            contenedorActivo = contenedorMonitores;
        } else if (contenedorPerifericos) {
            productosFiltrados = productos.filter(p => p.categoria === 'perifericos');
            contenedorActivo = contenedorPerifericos;
        }

        let htmlCards = '';
        productosFiltrados.forEach(producto => {
            const rutaImagenCorregida = '../../' + producto.imagen;

            htmlCards += `
                <article class="product-card">
                    <img src="${rutaImagenCorregida}" alt="${producto.titulo}">
                    <div class="card-body">
                        <h3>${producto.titulo}</h3>
                        <p class="product-description">${producto.descripcion}</p>
                        <span class="price">$${producto.precio.toLocaleString('es-AR')}</span>
                        
                        <div class="quantity-selector">
                            <button class="btn-qty" type="button" onclick="disminuirCantidad(this)">-</button>
                            <input type="number" value="1" min="1" readonly>
                            <button class="btn-qty" type="button" onclick="aumentarCantidad(this)">+</button>
                        </div>

                        <button class="btn-add" onclick="agregarAlCarrito(${producto.id}, '${producto.titulo}', ${producto.precio}, '${rutaImagenCorregida}', this)">Añadir al carrito</button>
                    </div>
                </article>
            `;
        });

        contenedorActivo.innerHTML = htmlCards;

    } catch (error) {
        console.error('Error al cargar los productos de la categoría:', error);
    }
}

document.addEventListener('DOMContentLoaded', cargarProductosCategoria);