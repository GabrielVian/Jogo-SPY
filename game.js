document.addEventListener('DOMContentLoaded', () => {
// Função para buscar um lugar aleatório do JSON
async function getRandomPlace() {
    const response = await fetch('lugares.json');
    const places = await response.json();
    return places[Math.floor(Math.random() * places.length)];
}
let inactiveCardsCount = 0;

// Função para inicializar as cartas
async function initializeCards(playerCount) {
    const place = await getRandomPlace();
    const cardsContainer = document.getElementById('cards-container');

    for (let i = 0; i < playerCount; i++) {
        const card = document.createElement('div');
        card.className = 'card';

        // Cria a frente da carta
        const front = document.createElement('div');
        front.className = 'front';
        // Se você tem uma imagem específica para a frente da carta, defina-a aqui
        front.style.backgroundImage = "url('images/card.png')"; 

        // Cria o verso da carta
        const back = document.createElement('div');
        back.className = 'back';
        // Define a imagem do verso da carta aqui
        back.style.backgroundImage = "url('images/card2.png')";

        // Anexa a frente e o verso ao elemento da carta
        card.appendChild(front);
        card.appendChild(back);

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

    card.classList.add('flipped');
    setTimeout(() => {
        if (card.classList.contains('spy')) {
            Swal.fire({
                title: 'ESPIÃO',
                icon: 'info'
            }).then((e) => {
                handleUserOk(card);
            });
        } else {
            Swal.fire({
                title: place,
                icon: 'info'
            }).then((e) => {
                handleUserOk(card);
            });
        }
    }, 600); 
    
}

function handleUserOk(card){
    // Torna a carta inativa
    card.classList.add('inactive');

    // Dentro da função revealCard
    // ...
    // Se todas as cartas estiverem inativas, inicia o timer em uma nova tela

    inactiveCardsCount++;
    if (inactiveCardsCount === playerCount) {
        window.location.href = `timer.html?players=${playerCount}`;
    }
    // ...
}


// Obtém a quantidade de jogadores da URL
const queryParams = new URLSearchParams(window.location.search);
const playerCount = parseInt(queryParams.get('players')) || 3; // Default para 3 jogadores se não for especificado

initializeCards(playerCount);
});