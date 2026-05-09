const paginasS = [
    { titulo: 'Home', ruta: '/index.html' },
    { titulo: "PC's", ruta: '/pages/categorias/categoria1.html' },
    { titulo: 'Monitores', ruta: '/pages/categorias/categoria2.html' },
    { titulo: 'Perifericos', ruta: '/pages/categorias/categoria3.html' }
];

function cargarNavbar() {
    const nav = document.querySelector('nav');
    if (!nav) return;

    let linksHTML = '';
    paginas.forEach(pag => {
        linksHTML += `<a href="${pag.ruta}">${pag.titulo}</a>`;
    });

    nav.innerHTML = `
        <div class="logo-container">
            <img src="/images/logo.webp" alt="Logo" width="50">
            <h1>Tienda Virtual</h1>
        </div>
        <div class="nav-links">
            ${linksHTML}
            <a href="/pages/registry/registro.html">Registro</a>
            <a href="/pages/login/login.html">Login</a>
            <a id="logout-btn" href="#">Logout</a>
        </div>
    `;

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = '/pages/login/login.html';
        });
    }

    const loginForm = document.querySelector('form');
    if (loginForm && window.location.pathname.includes('login.html')) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            window.location.href = '/index.html';
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

document.addEventListener('DOMContentLoaded', cargarNavbar);