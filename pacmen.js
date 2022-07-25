var pos = 0;
const pacArray = [
    ['images/PacMan1.png', 'images/PacMan2.png'],
    ['images/PacMan3.png', 'images/PacMan4.png']
];
let direction = 0;
let mouth = 0;
const pacMen = [];

function setToRandom(scale) {
    return {
        x: Math.random() * scale,
        y: Math.random() * scale
    }
}
// Factory to make a PacMan 
function makePac() {
    // returns an object with values scaled {x: 33, y: 21}
    let velocity = setToRandom(10);
    let position = setToRandom(200);
    // Add image to div id = game
    let game = document.getElementById('game');
    let newimg = document.createElement('img');
    newimg.style.position = 'absolute';
    newimg.src = pacArray[direction][mouth];
    newimg.width = 100;
    newimg.style.left = position.x;
    newimg.style.top = position.y;
    game.appendChild(newimg);
    // new style of creating an object
    return {
        position,
        velocity,
        direction,
        mouth,
        newimg
    }
}

function update() {
    //loop over pacmen array and move each one and move image in DOM
    pacMen.forEach((item) => {
        checkCollisions(item)
        item.position.x += item.velocity.x;
        item.position.y += item.velocity.y;

        item.newimg.style.left = item.position.x;
        item.newimg.style.top = item.position.y;

        item.mouth = 1 - item.mouth;
        /* item.newimg.src = pacArray[item.direction][item.mouth]; */
    })
    setTimeout(update, 200);
}

function checkCollisions(item) {
    item.newimg.src = pacArray[item.direction][item.mouth];
    if (item.position.x + item.velocity.x + item.newimg.width > window.innerWidth ||
        item.position.x + item.velocity.x < 0) {
            item.velocity.x = -item.velocity.x;
            item.direction = 1 - item.direction;
            item.newimg.src = "./images/bounce.png"
        }
    if (item.position.y + item.velocity.y + item.newimg.height > window.innerHeight ||
        item.position.y + item.velocity.y < 0) {
            item.velocity.y = -item.velocity.y;
            item.newimg.src = "./images/bounce.png"
        }
}

function makeOne() {
    pacMen.push(makePac()); // add a new PacMan
}