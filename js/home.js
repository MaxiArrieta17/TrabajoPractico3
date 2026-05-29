const JSON_URL = 'productos.json';

async function cargarProductosHome() {
    const contenedor = document.getElementById('contenedor-home');
    if (!contenedor) return;

    try {
        const respuesta = await fetch(JSON_URL);
        const productos = await respuesta.json();

        const pcs = productos.filter(p => p.categoria === 'pcs').slice(0, 2);
        const monitores = productos.filter(p => p.categoria === 'monitores').slice(0, 2);
        const perifericos = productos.filter(p => p.categoria === 'perifericos').slice(0, 2);

        const productosHome = [...pcs, ...monitores, ...perifericos];

        let htmlCards = '';
        productosHome.forEach(producto => {
            htmlCards += `
                <article class="product-card">
                    <img src="${producto.imagen}" alt="${producto.titulo}">
                    <div class="card-body">
                        <h3>${producto.titulo}</h3>
                        <p class="product-description">${producto.descripcion}</p>
                        <span class="price">$${producto.precio.toLocaleString('es-AR')}</span>
                        
                        <div class="quantity-selector">
                            <button class="btn-qty" type="button" onclick="disminuirCantidad(this)">-</button>
                            <input type="number" value="1" min="1" readonly>
                            <button class="btn-qty" type="button" onclick="aumentarCantidad(this)">+</button>
                        </div>

                        <button class="btn-add" onclick="agregarAlCarrito(${producto.id}, '${producto.titulo}', ${producto.precio}, '${producto.imagen}', this)">Añadir al carrito</button>
                    </div>
                </article>
            `;
        });

        contenedor.innerHTML = htmlCards;

    } catch (error) {
        console.error('Error al cargar los productos con fetch:', error);
        contenedor.innerHTML = '<p>Error al cargar los productos. Intente más tarde.</p>';
    }
}

document.addEventListener('DOMContentLoaded', cargarProductosHome);