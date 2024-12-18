/**
 * Vinicius Borsato
 * https://viniciusborsato.com 
 */

// Espera o DOM ser completamente carregado
document.addEventListener("DOMContentLoaded", function() {
    // Obtém a referência ao game-board
    const gameBoard = document.getElementById("game-board");

    // Configura o tamanho do tabuleiro
    const boardWidth = 20;
    const boardHeight = 20;

    // Inicializa a posição da cobrinha
    let snake = [{ x: 10, y: 10 }];

    // Inicializa a posição da comida
    let food = { x: 5, y: 5 };

    // Variáveis para controlar o movimento
    let dx = 1;
    let dy = 0;

    // Função para desenhar o tabuleiro
    function drawBoard() {
        // Limpa o tabuleiro
        gameBoard.innerHTML = "";

        // Desenha a cobrinha
        snake.forEach(function(segment) {
            const snakeElement = document.createElement("div");
            snakeElement.className = "snake";
            snakeElement.style.left = segment.x * 20 + "px";
            snakeElement.style.top = segment.y * 20 + "px";
            gameBoard.appendChild(snakeElement);
        });

        // Desenha a comida
        const foodElement = document.createElement("div");
        foodElement.className = "food";
        gameBoard.appendChild(foodElement);
        foodElement.style.left = food.x * 20 + "px";
        foodElement.style.top = food.y * 20 + "px";
    }

    // Função para atualizar a posição da cobrinha
    function updateSnake() {
        // Obtém a posição da cabeça da cobrinha
        const head = { x: snake[0].x + dx, y: snake[0].y + dy };

        // Verifica se a cobrinha colidiu consigo mesma
        if (checkCollision(head)) {
            // A cobrinha colidiu consigo mesma, então encerra o jogo
            gameOver();
            return;
        }

        // Verifica se a nova posição da cabeça está fora dos limites do tabuleiro
        if (head.x < 0) {
            head.x = boardWidth - 1;
        } else if (head.x >= boardWidth) {
            head.x = 0;
        }

        if (head.y < 0) {
            head.y = boardHeight - 1;
        } else if (head.y >= boardHeight) {
            head.y = 0;
        }

        // Adiciona a nova posição da cabeça da cobrinha no início do array
        snake.unshift(head);

        // Verifica se a cobrinha colidiu com a comida
        if (head.x === food.x && head.y === food.y) {
            // Gerar nova posição para a comida
            food.x = Math.floor(Math.random() * boardWidth);
            food.y = Math.floor(Math.random() * boardHeight);
        } else {
            // Remove o último segmento da cobrinha
            snake.pop();
        }
    }

    // Função para verificar a colisão da cobrinha consigo mesma
    function checkCollision(head) {
        for (let i = 1; i < snake.length; i++) {
            if (snake[i].x === head.x && snake[i].y === head.y) {
                return true;
            }
        }
        return false;
    }

    // Função para encerrar o jogo
    function gameOver() {
        clearInterval(gameLoopId);

        // Mostra o alerta de fim de jogo
        showGameOver();
    }

    // Função principal do jogo
    function gameLoop() {
        // Atualiza a posição da cobrinha
        updateSnake();

        // Desenha o tabuleiro
        drawBoard();
    }

    // Inicia o jogo
    const gameLoopId = setInterval(gameLoop, 200);

    // Captura os eventos de teclado
    document.addEventListener("keydown", function(event) {
        // Obtém a tecla pressionada
        const key = event.keyCode;

        // Define as direções com base na tecla pressionada
        if (key === 37 && dx !== 1) {
            dx = -1;
            dy = 0;
        } else if (key === 38 && dy !== 1) {
            dx = 0;
            dy = -1;
        } else if (key === 39 && dx !== -1) {
            dx = 1;
            dy = 0;
        } else if (key === 40 && dy !== -1) {
            dx = 0;
            dy = 1;
        }
    });
});

// Função para mostrar um alerta de fim de jogo
function showGameOver() {
    const showAlert = document.getElementById('alert-game-over');
    
    showAlert.classList.add('show-alert');

    // Remove o alerta de fim de jogo após 4 segundos
    setTimeout(() => {
        showAlert.classList.remove('show-alert');

        window.location.reload(); // Atualiza a página para iniciar um novo jogo
    }, 4000);
}

