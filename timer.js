// timer.js
document.addEventListener('DOMContentLoaded', () => {
    const timerDisplay = document.getElementById('timer-display');
    const queryParams = new URLSearchParams(window.location.search);
    const playerCount = parseInt(queryParams.get('players')) || 4; // Pega o número de jogadores da URL
  
    let time = playerCount * 60; // Tempo em segundos
  
    // Atualiza o timer a cada segundo
    const timer = setInterval(() => {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      timerDisplay.textContent = `Tempo restante: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      time--;
  
      // Se o tempo acabar, limpa o intervalo e exibe mensagem
      if (time < 0) {
        clearInterval(timer);
        timerDisplay.textContent = 'Tempo esgotado!';
        // Aqui você pode colocar mais lógica para quando o tempo acabar
      }
    }, 1000);
  });
  