const gCanvas = document.getElementById("gCanvas")

gCanvas.height = 500
gCanvas.width = 500

const ctx = gCanvas.getContext("2d")

var myReq
const arena = new Arena(ctx)
this.controls = new Controls()


function death(){
    arena.drawPlayerDeath()
    cancelAnimationFrame(myReq)
}
"0=empty, 1=wall, 2=breakable, 3=bomb, 4=bob, 5=player"
const grid1 = [[5, 0, 0, 0, 2, 3, 0, 0, 0],
[0, 1, 0, 1, 2, 1, 2, 1, 2],
[3, 2, 2, 0, 2, 0, 0, 0, 2],
[2, 1, 2, 1, 0, 1, 2, 1, 0],
[0, 0, 2, 0, 2, 2, 2, 2, 2],
[2, 1, 0, 1, 0, 1, 0, 1, 2],
[0, 2, 2, 0, 2, 2, 2, 2, 0],
[2, 1, 2, 1, 0, 1, 0, 1, 0],
[0, 0, 2, 0, 0, 2, 0, 0, 0]]

let grid = grid1

let player = new Player(ctx,grid,controls)
let bomb = new Bomb(grid)

arena.drawGrid(grid)
arena.drawPlayer(0,0)

function play(){
    myReq = requestAnimationFrame(animate)
}
animate()

function reset(){
    cancelAnimationFrame(myReq)
    
    grid = [[5, 0, 0, 0, 2, 3, 0, 0, 0],
        [0, 1, 0, 1, 2, 1, 2, 1, 2],
        [3, 2, 2, 0, 2, 0, 0, 0, 2],
        [2, 1, 2, 1, 0, 1, 2, 1, 0],
        [0, 0, 2, 0, 2, 2, 2, 2, 2],
        [2, 1, 0, 1, 0, 1, 0, 1, 2],
        [0, 2, 2, 0, 2, 2, 2, 2, 0],
        [2, 1, 2, 1, 0, 1, 0, 1, 0],
        [0, 0, 2, 0, 0, 2, 0, 0, 0]]
    player = new Player(ctx,grid,controls)
    bomb = new Bomb(grid,arena)
    arena.drawGrid(grid)
    arena.drawPlayer(0,0)
}

var sound = false
function soundOn(){
    sound = true
}

function soundOff(){
    sound = false
}

function animate(){
    if (player.moving(sound)){
        death()
    }
    
    myReq = requestAnimationFrame(animate)
}