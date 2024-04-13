document.addEventListener('DOMContentLoaded', () => {
// Função para buscar um lugar aleatório do JSON
async function getRandomPlace() {
    const response = await fetch('lugares.json');
    const places = await response.json();
    return places[Math.floor(Math.random() * places.length)];
}

// Função para inicializar as cartas
async function initializeCards(playerCount) {
    const place = await getRandomPlace();
    const cardsContainer = document.getElementById('cards-container');

    for (let i = 0; i < playerCount; i++) {
        const card = document.createElement('div');
        card.className = 'card';
        card.addEventListener('click', () => revealCard(i, playerCount, place));
        cardsContainer.appendChild(card);
    }

    // Escolhe aleatoriamente uma das cartas para ser a carta do espião
    const spyCardIndex = Math.floor(Math.random() * playerCount);
    cardsContainer.children[spyCardIndex].classList.add('spy');
}

// Função chamada quando uma carta é revelada
function revealCard(index, playerCount, place) {
    const card = document.querySelector(`.card:nth-child(${index + 1})`);

    if (card.classList.contains('inactive')) {
        return;
    }

    // Verifica se a carta é a do espião
    if (card.classList.contains('spy')) {
        Swal.fire({
            title: 'Detetive',
            icon: 'info'
        });
    } else {
        Swal.fire({
            title: place,
            icon: 'info'
        });
    }
    // Torna a carta inativa
    card.classList.add('inactive');
}

// Obtém a quantidade de jogadores da URL
const queryParams = new URLSearchParams(window.location.search);
const playerCount = parseInt(queryParams.get('players')) || 4; // Default para 4 jogadores se não for especificado

initializeCards(playerCount);
});
  