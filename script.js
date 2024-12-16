const gameBoard = document.getElementById('game-board');



const images = [
    'images/2025.png', 'images/2025.png',
    'images/alfombra.png', 'images/alfombra.png',
    'images/avion1.png', 'images/avion1.png',
    'images/cuatro.png', 'images/cuatro.png',
    'images/junio.png', 'images/junio.png',
    'images/mar.png', 'images/mar.png',
    'images/palmera.png', 'images/palmera.png',
    'images/1734206323985.jpg', 'images/1734206323985.jpg',
    'images/1734206385163.png', 'images/1734206385163.png'
];

// Barajar las cartas
const shuffledCards = images.sort(() => 0.5 - Math.random());


// Crear elementos HTML para las cartas
shuffledCards.forEach((image) => {
    const card = document.createElement('div');
    card.classList.add('card', 'hidden');
    card.dataset.image = image;
    gameBoard.appendChild(card);
});

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let allPairsResolved = false;
let cointPairsResolved = 0;

// Manejador de clics en las cartas
gameBoard.addEventListener('click', (event) => {
    const clickedCard = event.target;

    if (
        !clickedCard.classList.contains('card') ||
        clickedCard.classList.contains('matched') ||
        clickedCard === firstCard ||
        lockBoard
    ) {
        return;
    }

    // Mostrar la imagen de la carta
    clickedCard.classList.remove('hidden');
    clickedCard.style.backgroundImage = `url(${clickedCard.dataset.image})`;

    if (!firstCard) {
        // Primer clic
        firstCard = clickedCard;
    } else {
        // Segundo clic
        secondCard = clickedCard;
        lockBoard = true;

        if (firstCard.dataset.image === secondCard.dataset.image) {
            // Las cartas coinciden
            firstCard.classList.add('matched');
            secondCard.classList.add('matched');
            cointPairsResolved++;
            checkWinCondition();
            resetCards();
        } else {
            // Las cartas no coinciden
            setTimeout(() => {
                firstCard.classList.add('hidden');
                firstCard.style.backgroundImage = '';
                secondCard.classList.add('hidden');
                secondCard.style.backgroundImage = '';
                resetCards();
            }, 1000);
        }
    }
});

function resetCards() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function showModal() {
    const modal = document.getElementById("gameModal");
    modal.style.display = "block";

    const closeBtn = document.querySelector(".close");
    closeBtn.onclick = function () {
        modal.style.display = "none";
    };

    // Cerrar el modal si el usuario hace clic fuera de él
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
}

function checkWinCondition() {
   
    if (cointPairsResolved > 8) {
        showModal();
    }
}
