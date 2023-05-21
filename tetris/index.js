
// Создание элемента canvas
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

// Установка размеров поля и клетки
const blockSize = 30;
const width = 10;
const height = 20;

canvas.width = blockSize * width;
canvas.height = blockSize * height;


const rowCount = height;
const columnCount = width;
const cellSize = 30;


// Добавление элемента canvas на страницу

document.querySelector('.game-wrap').appendChild(canvas);

// Определение цветов для разных фигур

// Рандомный цвет фигур
const colors = [null];

function randColor() {
    var color;
    var isDark = true;

    while (isDark) {
        var red = Math.floor(Math.random() * 256);
        var green = Math.floor(Math.random() * 256);
        var blue = Math.floor(Math.random() * 256);

        var luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;
        isDark = luminance < 0.5;

        if (!isDark) {
            color = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
        }
    }

    return color;
}

for (let i = 0; i < 7; i++) {
    colors.push(randColor());
}



// Создание пустого игрового поля
const board = [];
for (let row = 0; row < height; row++) {
    board[row] = [];
    for (let col = 0; col < width; col++) {
        board[row][col] = 0;
    }
}

// Отрисовка игрового поля
function drawBoard() {

    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            const colorIndex = board[row][col];
            const color = colors[colorIndex];
            context.fillStyle = color || '#222'; // Черный цвет для пустых клеток
            context.fillRect(col * blockSize, row * blockSize, blockSize, blockSize);
        }
    }

    // Отрисовка сетки поля
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            const x = col * blockSize;
            const y = row * blockSize;

            context.strokeStyle = '#333';
            context.lineWidth = 1;
            context.strokeRect(x, y, blockSize, blockSize);
        }
    }
}

// Определение фигур
const shapes = [
    [], // Пустая фигура
    [[1, 1], [1, 1]],           // Квадрат
    [[0, 2, 0], [2, 2, 2]],     // L-фигура
    [[0, 3, 0], [0, 3, 0], [0, 3, 3]], // T-фигура
    [[4, 4, 0], [0, 4, 4]],     // S-фигура
    [[0, 5, 5], [5, 5, 0]],     // Z-фигура
    [[0, 6, 0], [0, 6, 0], [0, 6, 0], [0, 6, 0]], // I-фигура
    [[7, 7, 7, 7]]             // Палка
];

// Генерация случайной фигуры
function createRandomShape() {
    const index = Math.floor(Math.random() * (shapes.length - 1)) + 1; // Игнорирование пустой фигуры
    const shape = shapes[index];

    // Начальные координаты фигуры
    const row = 0;
    const col = Math.floor((width - shape[0].length) / 2);

    return { shape, row, col, index };
}

let currentShape = createRandomShape();
let score = 0;

// Проверка возможности движения фигуры
function canMove(rowOffset, colOffset) {
    const { shape, row, col } = currentShape;

    for (let rowIdx = 0; rowIdx < shape.length; rowIdx++) {
        for (let colIdx = 0; colIdx < shape[rowIdx].length; colIdx++) {
            if (shape[rowIdx][colIdx]) {
                const newRow = row + rowIdx + rowOffset;
                const newCol = col + colIdx + colOffset;

                // Проверка границ поля и пересечений с другими фигурами
                if (newRow < 0 || newRow >= height || newCol < 0 || newCol >= width || board[newRow][newCol]) {
                    return false;
                }
            }
        }
    }

    return true;
}

// Зафиксировать текущую фигуру на игровом поле
function lockShape() {
    const { shape, row, col, index } = currentShape;

    for (let rowIdx = 0; rowIdx < shape.length; rowIdx++) {
        for (let colIdx = 0; colIdx < shape[rowIdx].length; colIdx++) {
            if (shape[rowIdx][colIdx]) {
                const boardRow = row + rowIdx;
                const boardCol = col + colIdx;
                board[boardRow][boardCol] = index;
            }
        }
    }

    clearLines();
    currentShape = createRandomShape();

    if (!canMove(0, 0)) {
        // Игра окончена
        alert('GAME OVER');
        resetGame();
    }
}

// Проверка и удаление заполненных линий
function clearLines() {
    for (let row = height - 1; row >= 0; row--) {
        let isFull = true;

        for (let col = 0; col < width; col++) {
            if (!board[row][col]) {
                isFull = false;
                break;
            }
        }

        if (isFull) {
            // Удаление линии и сдвиг вышележащих линий вниз
            for (let aboveRow = row; aboveRow > 0; aboveRow--) {
                for (let col = 0; col < width; col++) {
                    board[aboveRow][col] = board[aboveRow - 1][col];
                }
            }

            score += 10;
        }
    }
}

// Сброс игры
function resetGame() {
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            board[row][col] = 0;
        }
    }

    score = 0;
    gameSpeed = 250;
}

// Поворот фигуры
function rotateShape() {
    const { shape, row, col } = currentShape;
    const rotatedShape = [];

    // Создание пустой матрицы для повернутой фигуры
    for (let rowIdx = 0; rowIdx < shape[0].length; rowIdx++) {
        rotatedShape[rowIdx] = [];
    }

    // Выполнение поворота матрицы вокруг центра
    for (let rowIdx = 0; rowIdx < shape.length; rowIdx++) {
        for (let colIdx = 0; colIdx < shape[rowIdx].length; colIdx++) {
            const newRow = colIdx;
            const newCol = shape.length - 1 - rowIdx;
            rotatedShape[newRow][newCol] = shape[rowIdx][colIdx];
        }
    }

    // Проверка возможности поворота фигуры
    if (canMove(0, 0, rotatedShape)) {
        currentShape.shape = rotatedShape;
    }
}

// Обработка нажатий клавиш
document.addEventListener('keydown', function (event) {
    if (event.keyCode === 37) { // Стрелка влево
        if (canMove(0, -1)) {
            currentShape.col--;
        }
    } else if (event.keyCode === 39) { // Стрелка вправо
        if (canMove(0, 1)) {
            currentShape.col++;
        }
    } else if (event.keyCode === 40) { // Стрелка вниз
        if (canMove(1, 0)) {
            currentShape.row++;
        }
    } else if (event.keyCode === 38) { // Стрелка вверх (поворот)
        rotateShape(); // Вызов функции rotateShape()
    } else if (event.keyCode === 80) { // Клавиша P для паузы
        isPaused = !isPaused; // Инвертируем статус паузы

        if (isPaused) {
            // Отображение статуса и инструкции при паузе
            context.fillStyle = '#fff';
            context.font = '20px Arial';
            context.fillText(statusText, canvas.width / 2 - 68, canvas.height / 2);
            context.fillText(instructionText, canvas.width / 2 - 105, canvas.height / 2 + 30);
        } else {
            // Удаление текста статуса и инструкции после возобновления игры
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
});

let gameSpeed = 250; // Задержка в миллисекундах между шагами игрового цикла
let lastTime = null;
let isPaused = false; // Переменная для отслеживания статуса паузы
const statusText = "Press P to pause"; // Текст статуса
const instructionText = "Use arrow keys to move"; // Текст инструкции


// Главный игровой цикл
function gameLoop() {

    // Ускорение игры
    if (score >= 10) {
        gameSpeed = 200;
    } else if (score >= 30) {
        gameSpeed = 150;
    } else if (score >= 50) {
        gameSpeed = 100;
    } else if (score >= 70) {
        gameSpeed = 80;
    } else if (score >= 90) {
        gameSpeed = 50;
    }


    if (!isPaused) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Проверка и обработка движения фигуры вниз
        const currentTime = Date.now();
        const deltaTime = currentTime - lastTime;
        if (deltaTime > gameSpeed) {
            lastTime = currentTime;

            if (canMove(1, 0)) {
                currentShape.row++;
            } else {
                lockShape();
            }
        }

        drawBoard();

        // Отрисовка текущей фигуры
        const { shape, row, col, index } = currentShape;
        for (let rowIdx = 0; rowIdx < shape.length; rowIdx++) {
            for (let colIdx = 0; colIdx < shape[rowIdx].length; colIdx++) {
                if (shape[rowIdx][colIdx]) {
                    const blockRow = row + rowIdx;
                    const blockCol = col + colIdx;
                    const color = colors[index];
                    context.fillStyle = color;

                    context.lineWidth = 3;
                    context.strokeStyle = "#444";
                    context.strokeRect(blockCol * blockSize, blockRow * blockSize, blockSize, blockSize);
                    context.fillRect(blockCol * blockSize, blockRow * blockSize, blockSize, blockSize);
                }
            }
        }



        // Отрисовка счета
        context.fillStyle = '#ffffff';
        context.font = '24px Arial';
        context.fillText('Score: ' + score, 10, 30);

        // Отрисовка паузы
        context.fillStyle = '#ffffff';
        context.font = '13px Arial';
        context.fillText('Press P to pause', 10, 55);

        document.querySelector('.score').innerHTML = score;


        setTimeout(gameLoop, gameSpeed);

    } else {
        // Отображение текста статуса и инструкции при паузе
        context.fillStyle = '#ffffff';
        context.font = '20px Arial';
        context.fillText(statusText, canvas.width / 2 - 68, canvas.height / 2);
        context.fillText(instructionText, canvas.width / 2 - 105, canvas.height / 2 + 30);

        setTimeout(gameLoop, gameSpeed);

    }

}

// Запуск игры
gameLoop();
