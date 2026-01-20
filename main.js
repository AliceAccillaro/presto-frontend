let navbar = document.querySelector('#navbar');
let links = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let scrolled = window.scrollY;

    if (scrolled > 0) {
        navbar.classList.remove('navbar-sand');
        navbar.classList.add('navbar-lightsand');

        links.forEach((link) => {
            link.style.color = 'var(--sand)';
        });
    } else {
        navbar.classList.add('navbar-sand');
        navbar.classList.remove('navbar-lightsand');
    }

});


