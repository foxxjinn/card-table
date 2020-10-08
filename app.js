const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')

canvas.width = 1080
canvas.height = 720

let selectedCard 
let selectionOffset = {x:0, y:0}
let pile = []
let table = []

class Card {
    constructor(x, y, style) {
        this.x = x
        this.y = y
        this.width = 100 / 2
        this.height = 140 / 2
        this.style = style
        this.isDragging = false
    }

    draw() {
        ctx.beginPath()
        ctx.fillStyle = this.style
        ctx.rect(this.x, this.y, this.width, this.height)
        ctx.fill()
        ctx.closePath()
    }
}

table.push(new Card(10, 10, 'red'))
table.push(new Card(15, 15, 'blue'))
table.push(new Card(20, 20, 'yellow'))
table.push(new Card(25, 25, 'blue'))

drawTable()

document.addEventListener('mousedown', onMouseDown)
function onMouseDown(e) {
    let mousePos = getMousePos(canvas, e)

    selectedCard = null

    for (let card of table) {
        if (isWithinBounds(mousePos, card)) {
            selectedCard = card
            selectionOffset.y = mousePos.y - card.y
            selectionOffset.x = mousePos.x - card.x
            selectedCard.isDragging = true
        }
    }

    if (selectedCard) {
        let index = table.indexOf(selectedCard)
        let temp = electedCard = table.splice(index, 1)
        table.push(temp[0])
    }

    drawTable()
}

document.addEventListener('mouseup', (e) => {
    if (selectedCard) {
        selectedCard.isDragging = false
    }
})

document.addEventListener('mousemove', onMouseMove) 
function onMouseMove(e) {
    if (selectedCard && selectedCard.isDragging) {
        let mousePos = getMousePos(canvas, e)
        selectedCard.x = mousePos.x - selectionOffset.x
        selectedCard.y = mousePos.y - selectionOffset.y
        drawTable()
    }
}

function getMousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

function isWithinBounds(mousePos, card) {
    return (mousePos.x >= card.x 
        && mousePos.x <= card.x + card.width
        && mousePos.y >= card.y
        && mousePos.y <= card.y + card.height)
}



function drawTable() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'green'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    for (let card of table) {
        card.draw()
    }

    if (selectedCard) {
        ctx.strokeStyle = 'white'
        ctx.linewidth = 2
        ctx.rect(selectedCard.x, selectedCard.y, selectedCard.width, selectedCard.height)
        ctx.stroke()
    }
}