const gCanvas = document.getElementById("gCanvas")

gCanvas.height = 500
gCanvas.width = 500

const ctx = gCanvas.getContext("2d")
const arena = new Arena(ctx)
this.controls = new Controls()


"0=empty, 1=wall, 2=breakable, 3=bomb, 4=bob, 5=player"
let newGrid = [[5, 0, 0, 0, 2, 3, 0, 0, 0],
[0, 1, 0, 1, 2, 1, 2, 1, 2],
[3, 2, 2, 0, 2, 0, 0, 0, 2],
[2, 1, 2, 1, 0, 1, 2, 1, 0],
[0, 0, 2, 0, 2, 2, 2, 2, 2],
[2, 1, 0, 1, 0, 1, 0, 1, 2],
[0, 2, 2, 0, 2, 2, 2, 2, 0],
[2, 1, 2, 1, 0, 1, 0, 1, 0],
[0, 0, 2, 0, 0, 2, 0, 0, 0]]

let grid = newGrid

const player = new Player(ctx,grid,controls)
const bomb = new Bomb(grid,arena)

arena.drawGrid(grid)
arena.drawPlayer(0,0)

function play(){

    animate()
}
animate()

function reset(){
    cancelAnimationFrame(animate)
    grid = newGrid
    arena.drawGrid(grid)
    arena.drawPlayer(0,0)
}

function soundOn(){
    bomb.dropBomb()
}

function soundOff(){
    setTimeout(bomb.explode(),50000)
}

function animate(){
    "let grid = arena.makeGrid()"
    player.moving()
    
    requestAnimationFrame(animate)
}