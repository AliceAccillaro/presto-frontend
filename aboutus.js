let opener = document.querySelector(`.opener`);
let circle = document.querySelector(`.circle`)

let employees = [
    { name: `Iago`, description: `Direttore generale`, url: `./media/iago2.jpg` },
    { name: `Genio`, description: `il miglior venditore di tutti gli anni`, url: `./media/genioimg.png` },
    { name: `Gazeem`, description: `Applica prezzi migliori, no resi`, url: `./media/gazeem.jpg` },
    { name: `Farouk`, description: `Web developer e Cibersecurity`, url: `./media/farouk.jpg` },
];

employees.forEach((dipendente) => {
    let div = document.createElement(`div`);
    div.classList.add(`moved`);
    div.style.backgroundImage = `url(${ dipendente.url})`;
    circle.appendChild(div);
});


let moveDivs = document.querySelectorAll(`.moved`);

let check = false;

let flipCard = document.querySelector(`.flip-card`);

opener.addEventListener(`click`, () => {
    if (check == false) {
        opener.style.transform = `rotate(45deg)`;
        moveDivs.forEach((moved, i) => {
            let angle = (360 * i) / moveDivs.length;
            moved.style.transform = `rotate(${angle}deg) translate(150px) rotate(-${angle}deg)`;
        });
        check = true;
    } else {
        check = false;
        opener.style.transform = ``;
        moveDivs.forEach((moved, i) => {
            moved.style.transform = ``;
        });
        flipCard.classList.add(`d-none`);
    }
});

let innerFace = document.querySelector(`.inner-face`);
let cardName = document.querySelector(`#cardName`);
let cardDescription = document.querySelector(`#cardDescription`);


moveDivs.forEach((moved, i)=>{
    moved.addEventListener(`click`, ()=>{
        flipCard.classList.remove(`d-none`);
        let dipendente = employees[i];
        innerFace.style.backgroundImage = `url( ${dipendente.url})`;
        cardName.innerHTML = dipendente.name;
        cardDescription.innerHTML = dipendente.description;
        
    });
});