class Player{
    constructor(ctx,grid,gridSize){
        this.ctx = ctx
        this.grid = grid
        this.gridSize =gridSize
        this.controls = new Controls()
        this.hasBomb = false
        this.droppingBomb = false
        this.bombDropPoint = []
        this.bombExplode = 10
        this.bombDrop = 11
        this.bomb = new Bomb(grid)
    }

    "direction up=0,right=1,down=2,left=3"
    moving(){
        if(this.controls.up){
            this.controls.up = false
            let oldPosition = this.findOldPosition()
            let newPosition = this.findNewPosition(oldPosition,0)
            let isValid = this.checkIfValid(newPosition)
            if(isValid){
                this.#drawMovement("player",oldPosition,newPosition)
                if(this.droppingBomb){
                    this.grid[this.bombDropPoint[0]]
                             [this.bombDropPoint[1]]=3
                    this.droppingBomb=false
                }
                this.bombExplode -= 1
                this.bombDrop -= 1
            }
        }
        if(this.controls.right){
            this.controls.right = false
            let oldPosition = this.findOldPosition()
            let newPosition = this.findNewPosition(oldPosition,1)
            let isValid = this.checkIfValid(newPosition)
            if(isValid){
                this.#drawMovement("player",oldPosition,newPosition)
                if(this.droppingBomb){
                    this.grid[this.bombDropPoint[0]]
                             [this.bombDropPoint[1]]=3
                    this.droppingBomb=false
                }
                this.bombExplode -= 1
                this.bombDrop -= 1
            }
        }
        if(this.controls.down){
            this.controls.down = false
            let oldPosition = this.findOldPosition()
            let newPosition = this.findNewPosition(oldPosition,2)
            let isValid = this.checkIfValid(newPosition)
            if(isValid){
                this.#drawMovement("player",oldPosition,newPosition)
                if(this.droppingBomb){
                    this.grid[this.bombDropPoint[0]][this.bombDropPoint[1]]=3
                    this.droppingBomb=false
                }
                this.bombExplode -= 1
                this.bombDrop -= 1
            }
        }
        if(this.controls.left){
            this.controls.left = false
            let oldPosition = this.findOldPosition()
            let newPosition = this.findNewPosition(oldPosition,3)
            let isValid = this.checkIfValid(newPosition)
            if(isValid){
                if(this.droppingBomb){
                    this.grid[this.bombDropPoint[0]]
                             [this.bombDropPoint[1]]=3
                }
                this.#drawMovement("player",oldPosition,newPosition)
                if(this.droppingBomb){
                    this.grid[this.bombDropPoint[0]][this.bombDropPoint[1]] = 3
                    this.droppingBomb=false
                }
                this.bombExplode -= 1
                this.bombDrop -= 1
            }
        }

        if(this.controls.pickUp){
            this.controls.pickUp=false
            if(this.hasBomb){
                this.bombDropPoint = this.findOldPosition()
                this.droppingBomb = true
                this.hasBomb=false
            }else {
                console.log("TDA")
                let oldPosition = this.findOldPosition()
                let checkIfBomb = this.checkIfBomb(oldPosition)
                if(checkIfBomb){
                    this.removeBomb(oldPosition)
                    arena.drawGrid(this.grid)
                    arena.drawPlayerBomb(oldPosition[0],oldPosition[1])
                    this.hasBomb=true
                }
            }
        }
        if(this.bombExplode == 99){
            this.bombExplode = 98
            for(let i=0;i<this.grid.length;i++){
                for(let j=0;j<this.grid[i].length;j++){
                    if(this.grid[i][j]==6){
                        this.grid[i][j] = 0
                    }
                }
            }
        }
        if(this.bombDrop == 0){
            this.bombDrop = 11
            this.bomb.dropBomb()
        if(this.bombExplode != 1){
            this.bombExplode = 10
        }
        }
        if(this.bombExplode == 0){
            this.bombExplode = 100
            this.bomb.explode()
            this.bombDrop = 8
        }
    }

    #drawMovement(state,oldPosition,newPosition){
        arena.drawGrid(this.grid)

        if (this.hasBomb){
            arena.drawPlayerBomb(newPosition[0],newPosition[1])
        }else{
            arena.drawPlayer(newPosition[0],newPosition[1])
        }
        this.grid[oldPosition[0]][oldPosition[1]] = 0
        this.grid[newPosition[0]][newPosition[1]] = 5
    }

    findOldPosition(){
        let position = [10,10]
        for(let i=0;i<this.grid.length;i++){
            for(let j=0;j<this.grid[i].length;j++){
                if(this.grid[i][j]==5){
                    position = [i,j]
                    break
                }
            }
            if(position[0]!=10){
                break
            }
        }
        return position
    }

    findNewPosition(oldPosition,direction){
        let newPosition = [-1,-1]
        if(direction==0){
            newPosition = [oldPosition[0],oldPosition[1]-1]
        }else if(direction==1){
            newPosition = [oldPosition[0]+1,oldPosition[1]]
        }
        if(direction==2){
            newPosition = [oldPosition[0],oldPosition[1]+1]
        }
        if(direction==3){
            newPosition = [oldPosition[0]-1,oldPosition[1]]
        }

        return newPosition
    }

    checkIfValid(newPosition){
        if(newPosition[0]==-1){
            return false
        }
        if(newPosition[0]==9){
            return false
        }
        if(newPosition[1]==9){
            return false
        }
        if(newPosition[1]==-1){
            return false
        }
        if(this.grid[newPosition[0]][newPosition[1]]==1){
            return false
        }

        if(this.grid[newPosition[0]][newPosition[1]]==3){
            return false
        }
        if(this.grid[newPosition[0]][newPosition[1]]==2){
            return false
        }


        return true
    }

    checkIfBomb(oldPosition){

        if(oldPosition[0]+1 != 9){
            if(this.grid[oldPosition[0]+1][oldPosition[1]]==3){
                return true
            }
        }
        if(oldPosition[0]-1 != -1){
            if(this.grid[oldPosition[0]-1][oldPosition[1]]==3){
                return true
            }
        }
        if(oldPosition[1]-1 != -1){
            if(this.grid[oldPosition[0]][oldPosition[1]-1]==3){
                return true
            }       
        } 
        if(oldPosition[1]+1 != 9){
            if(this.grid[oldPosition[0]][oldPosition[1]+1]==3){
                return true
            }
        }
        return false
    }

    removeBomb(oldPosition){
        console.log(oldPosition,"MOISDSD")
        if(oldPosition[0]+1 != 9){
            if(this.grid[oldPosition[0]+1][oldPosition[1]]==3){
                this.grid[oldPosition[0]+1][oldPosition[1]]=0
            }
        }
        if(oldPosition[0]-1 != -1){
            if(this.grid[oldPosition[0]-1][oldPosition[1]]==3){
                this.grid[oldPosition[0]-1][oldPosition[1]]=0
            }
        }
        if(oldPosition[1]-1 != -1){
            if(this.grid[oldPosition[0]][oldPosition[1]-1]==3){
                this.grid[oldPosition[0]][oldPosition[1]-1]=0
            }       
        } 
        if(oldPosition[1]+1 != 9){
            if(this.grid[oldPosition[0]][oldPosition[1]+1]==3){
                this.grid[oldPosition[0]][oldPosition[1]+1]=0
            }
        }
    }
}