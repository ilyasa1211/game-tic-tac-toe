var body = document.body;
var section = document.createElement('section')
var info = document.createElement('h1')

const SIZE = 3;
var turn = false;
var gameOver = false;
var winPositions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
]

body.appendChild(info)
body.appendChild(section)

for (let i = 0; i < SIZE ** 2; i++) {
    let element = document.createElement('div');
    element.onclick = function (e) {
        if (gameOver) return;
        const player = turn ? 'x' : 'o'
        e.target.onclick = null
        e.target.innerText = player;
        turn = !turn
        if (draw()) info.innerText = "Draw!"
        if (win()) info.innerText = "Player " + player.toLocaleUpperCase() + " win!"
    };
    section.appendChild(element);
}
var div = document.getElementsByTagName('div')
function win() {
    winPositions.forEach(position => {
        if (div[position[1 - 1] - 1].innerText !== "" && div[position[1 - 1] - 1].innerText === div[position[2 - 1] - 1].innerText && div[position[2 - 1] - 1].innerText === div[position[3 - 1] - 1].innerText) {
            div[position[1 - 1] - 1].style.opacity = div[position[2 - 1] - 1].style.opacity = div[position[3 - 1] - 1].style.opacity = "0.5"
            gameOver = true
        }
    })
    return gameOver
}
function draw() {
    return !Array.from(div).find(_ => _.innerText === "")
}
