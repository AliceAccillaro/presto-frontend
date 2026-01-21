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


// recensioni
let reviews = [
    { user: `Jasmine`, description: `"Geniale"`, rank: 5 },
    { user: `Aladdin`, description: `"Ottimo servizio"`, rank: 4 },
    { user: `Sultan`, description: `"Consigliatissimo!"`, rank: 5 },
    { user: `Abu`, description: `"Esperienza mediocre"`, rank: 2 },
    { user: `Raja`, description: `"Roar"`, rank: 5 },
    { user: `Jafar`, description: `"Sono disgustato"`, rank: 1 },
]

let swiperWrapper = document.querySelector('.swiper-wrapper');

reviews.forEach((recensione) => {
    let div = document.createElement('div');
    div.classList.add('swiper-slide');
    div.innerHTML = `
        <div class="swiper-slide">
            <div class="card-review">
                <p class="lead text-center margin-custom fs-1">${recensione.description}</p>
                <p class="h4 text-center">${recensione.user}</p>
                <div class="d-flex justify-content-center star">
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
                </div>
            </div>
        </div>`;
    swiperWrapper.appendChild(div);
});

let stars = document.querySelectorAll('.star');

stars.forEach((star, index) => {
    for (let i = 1; i <= reviews[index].rank; i++) {
        let icon = document.createElement('i');
        icon.classList.add('fa-solid', 'fa-star');
        star.appendChild(icon);
    }

    let difference = 5 - reviews[index].rank;
    for (let i = 1; i <= difference; i++) {
        let icon = document.createElement('i');
        icon.classList.add('fa-regular', 'fa-star');
        star.appendChild(icon);
    }

});

// swiper

var swiper = new Swiper(".mySwiper", {
    rewind: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },


    // // Navigation arrows
    // navigation: {
    //     nextEl: '.swiper-button-next',
    //     prevEl: '.swiper-button-prev',
    // },
});