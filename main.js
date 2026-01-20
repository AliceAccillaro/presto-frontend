let navbar = document.querySelector('#navbar');
let links = document.querySelectorAll('.nav-link');
let logonavbar = document.querySelector('.logo');
let collapse = document.querySelector('#collapse');

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


// Numeri incrementali
let firstnumber = document.querySelector('#firstnumber');
let secondnumber = document.querySelector('#secondnumber');
let thirdnumber = document.querySelector('#thirdnumber');

let confirm = true;

function createInterval(n, element, time) {
    let counter = 0;
    let interval = setInterval(() => {
        if (counter < n) {
            counter++;
            element.innerHTML = counter;
        } else {
            console.log(`adesso mi fermo`);
            clearInterval(interval);
        }
    }, time);
    setTimeout(() => {
        confirm = true;
    }, 8000);

}


// intersection observer per animazioni
let observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting && confirm) {
            createInterval(100, firstnumber, 100);
            createInterval(200, secondnumber, 50);
            createInterval(300, thirdnumber, 20);
            confirm = false;
        }
    });
});

observer.observe(firstnumber);
observer.observe(secondnumber);
observer.observe(thirdnumber);