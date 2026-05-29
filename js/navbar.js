const paginas = [
    { titulo: 'Home', ruta: 'index.html' },
    { titulo: "PC's", ruta: 'pages/categorias/categoria1.html' },
    { titulo: 'Monitores', ruta: 'pages/categorias/categoria2.html' },
    { titulo: 'Perifericos', ruta: 'pages/categorias/categoria3.html' },
    { titulo: 'Carrito', ruta: 'pages/carrito/carrito.html' }
];

function cargarNavbar() {
    const nav = document.querySelector('nav');
    if (!nav) return;
    const esSubpagina = window.location.pathname.includes('/pages/');
    const prefijo = esSubpagina ? '../../' : '';

    let linksHTML = '';
    paginas.forEach(pag => {
        let rutaFinal = prefijo + pag.ruta;
        linksHTML += `<a href="${rutaFinal}">${pag.titulo}</a>`;
    });

    nav.innerHTML = `
        <div class="logo-container">
            <img src="${prefijo}images/Logo.webp" alt="Logo" width="50"> 
            <h1>Tienda Virtual</h1>
        </div>
        <div class="nav-links">
            <div class="main-nav">
                ${linksHTML}
            </div>
            <div class="user-nav">
                <a href="${prefijo}pages/registry/registro.html">Registro</a>
                <a href="${prefijo}pages/login/login.html">Login</a>
                <a id="logout-btn" href="#">Logout</a>
            </div>
        </div>
    `;

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sessionStorage.removeItem('usuarioLogueado');
            window.location.href = prefijo + 'pages/login/login.html';
        });
    }

    const loginForm = document.querySelector('form');
    if (loginForm && window.location.pathname.includes('login.html')) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = loginForm.querySelector('input[type="email"]');
            const emailUsuario = emailInput ? emailInput.value : 'usuario@tienda.com';

            sessionStorage.setItem('usuarioLogueado', JSON.stringify({
                email: emailUsuario,
                estado: 'logueado',
                fecha: new Date().toLocaleDateString()
            }));

            window.location.href = '../../index.html';
        });
    }
}

function aumentarCantidad(boton) {
    const input = boton.parentElement.querySelector('input');
    input.stepUp();
}

function disminuirCantidad(boton) {
    const input = boton.parentElement.querySelector('input');
    if (input.value > 1) {
        input.stepDown();
    }
}

function agregarAlCarrito(id, titulo, precio, imagen, boton) {
    const tarjeta = boton.closest('.product-card');
    const inputCantidad = tarjeta.querySelector('.quantity-selector input');
    const cantidad = inputCantidad ? parseInt(inputCantidad.value) : 1;

    let carrito = JSON.parse(localStorage.getItem('carritoCompras')) || [];

    const itemExistente = carrito.find(item => item.id === id);

    if (itemExistente) {
        itemExistente.cantidad += cantidad;
    } else {
        carrito.push({
            id: id,
            titulo: titulo,
            precio: precio,
            imagen: imagen,
            cantidad: cantidad
        });
    }

    localStorage.setItem('carritoCompras', JSON.stringify(carrito));

    alert(`¡Agregaste ${cantidad} unidad(es) de "${titulo}" al carrito!`);
    
    if (inputCantidad) inputCantidad.value = 1;
}

document.addEventListener('DOMContentLoaded', cargarNavbar);