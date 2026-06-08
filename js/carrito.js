function cargarCarrito() {
    const contenedor = document.getElementById('contenedor-carrito');
    const totalTexto = document.getElementById('total-carrito');
    if (!contenedor) return;

    const carrito = JSON.parse(localStorage.getItem('carritoCompras')) || [];

    if (carrito.length === 0) {
        contenedor.innerHTML = '<p style="text-align:center; grid-column: 1/-1; font-size: 1.2rem;">Tu carrito está vacío. ¡Explorá las categorías para agregar productos!</p>';
        if (totalTexto) totalTexto.innerText = "Total: $0";
        return;
    }

    let htmlCards = '';
    let totalGeneral = 0;

    carrito.forEach(producto => {
        const subtotal = producto.precio * producto.cantidad;
        totalGeneral += subtotal;

        let rutaImagenCorrecta = producto.imagen;
        if (!rutaImagenCorrecta.startsWith('../')) {
            rutaImagenCorrecta = '../../' + rutaImagenCorrecta;
        }

        htmlCards += `
            <article class="product-card">
                <img src="${rutaImagenCorrecta}" alt="${producto.titulo}">
                <div class="card-body">
                    <h3>${producto.titulo}</h3>
                    <p class="product-description">Cantidad: ${producto.cantidad} unidad(es)</p>
                    <p class="product-description">Precio unitario: $${producto.precio.toLocaleString('es-AR')}</p>
                    <span class="price">Subtotal: $${subtotal.toLocaleString('es-AR')}</span>
                </div>
            </article>
        `;
    });

    contenedor.innerHTML = htmlCards;
    if (totalTexto) {
        totalTexto.innerText = `Total: $${totalGeneral.toLocaleString('es-AR')}`;
    }
}

function configurarBotonesAccion() {
    const botonVaciar = document.getElementById('vaciar-carrito-btn');
    if (botonVaciar) {
        botonVaciar.addEventListener('click', () => {
            if (confirm('¿Estás seguro de que querés vaciar tu carrito?')) {
                localStorage.removeItem('carritoCompras');
                cargarCarrito(); 
            }
        });
    }

    const botonTerminar = document.getElementById('terminar-compra-btn');
    if (botonTerminar) {
        botonTerminar.addEventListener('click', () => {
            alert('¡Gracias por tu compra! Tu pedido ha sido procesado con éxito.');
            localStorage.removeItem('carritoCompras');
            window.location.href = '../../index.html'; 
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    cargarCarrito();
    configurarBotonesAccion();
});