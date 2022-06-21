class Arena{
    constructor(ctx,size=55,spacing=1,gridSize=9){
        this.tileSize = size
        this.spacing = spacing
        this.tileFix = (this.tileSize +this.spacing) 
        this.gridSize = gridSize
        this.ctx = ctx
    }

    makeGrid(){
        let grid2 = []
        for(let i=0;i<this.gridSize;i++){
            grid2.push(new Array(this.gridSize).fill(0))
        }
        return grid2
    }

    drawGrid(grid){
        for(let y=0;y<grid.length;y++){
            for(let x=0;x<grid[y].length;x++){
                if(grid[x][y]==0 || grid[x][y]==5){
                    this.drawTile(
                        x*(this.tileSize +this.spacing), 
                        y*(this.tileSize +this.spacing))
                }
                if(grid[x][y]==1){
                    this.drawWall(
                        x*(this.tileSize +this.spacing), 
                        y*(this.tileSize +this.spacing))
                }
                if(grid[x][y]==2){
                    this.drawBreakable(
                        x*(this.tileSize +this.spacing), 
                        y*(this.tileSize +this.spacing))
                }
                if(grid[x][y]==3){
                    this.drawBomb(
                        x*(this.tileSize +this.spacing), 
                        y*(this.tileSize +this.spacing))
                }
                if(grid[x][y]==6){
                    this.drawExplode(
                        x*(this.tileSize +this.spacing), 
                        y*(this.tileSize +this.spacing))
                }
                if(grid[x][y]==7){
                    this.drawTile(
                        x*(this.tileSize +this.spacing), 
                        y*(this.tileSize +this.spacing))
                    this.drawAi(
                        x*(this.tileSize +this.spacing), 
                        y*(this.tileSize +this.spacing))
                }
            }
        }
    }

    drawWall(x,y){
        this.ctx.fillStyle="red"
        this.ctx.beginPath()
        this.ctx.rect(
            x,
            y,
            this.tileSize,
            this.tileSize
        )
        this.ctx.fill()

    }

    drawWall(x,y){
        this.ctx.fillStyle="red"
        this.ctx.beginPath()
        this.ctx.rect(
            x,
            y,
            this.tileSize,
            this.tileSize
        )
        this.ctx.fill()

    }

    drawTile(x,y){
        this.ctx.fillStyle="gray"
        this.ctx.beginPath()
        this.ctx.rect(
            x,
            y,
            this.tileSize,
            this.tileSize
        )
        this.ctx.fill()
    }

    drawBreakable(x,y){
        this.drawTile(x,y)
        this.ctx.beginPath()
        this.ctx.font = '20px serif'
        this.ctx.fillStyle = 'green'
        this.ctx.fillText("🌋",x+14,y+35)
    }

    drawBomb(x,y){
        this.drawTile(x,y)
        this.ctx.beginPath()
        this.ctx.font = '20px serif'
        this.ctx.fillText("💣",x+14,y+35)
        
    }

    drawPlayer(x,y){ 
        this.ctx.beginPath()
        this.ctx.font = '20px serif'
        this.ctx.fillText("🧑", 
            x*this.tileFix+(this.tileSize/2)-12, 
            y*this.tileFix+(this.tileSize/2)+5)
    }

    drawAi(x,y){ 
        this.ctx.beginPath()
        this.ctx.font = '20px serif'
        this.ctx.fillText("🤖",x+14,y+35)
    }
    drawPlayerBomb(x,y){ 
        this.ctx.beginPath()
        this.ctx.font = '20px serif'
        this.ctx.fillText("🧑‍🚀", 
            x*this.tileFix+(this.tileSize/2)-26, 
            y*this.tileFix+(this.tileSize/2)+5)
    }

    drawExplode(x,y){
        
        this.drawTile(x,y)
        this.ctx.beginPath()
        this.ctx.font = '20px serif'
        this.ctx.fillText("💥",x+14,y+35)
   }

   drawPlayerDeath(){
    this.ctx.fillStyle = "black"
    this.ctx.rect(100,100,300,300)
    this.ctx.fill()
    this.ctx.beginPath()
    this.ctx.font = '70px serif'
    this.ctx.fillStyle = "white"
    this.ctx.fillText("Game",160,220)
    this.ctx.fillText("Over",170,320)
   }
}