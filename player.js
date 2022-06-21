class Player{
    constructor(ctx,grid,gridSize){
        this.ctx = ctx
        this.grid = grid
        this.gridSize =gridSize
        this.controls = new Controls()
        this.hasBomb = false
        this.droppingBomb = false
        this.bombDropPoint = []
        this.bombExplode = 9
        this.bombDrop = 11
        this.bomb = new Bomb(grid)
    }

    "direction up=0,right=1,down=2,left=3"
    moving(sound){
        let ret = false
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
                if(sound){beep()}
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
                if(sound){beep()}
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
                if(sound){beep()}
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
                if(sound){beep()}
            }
        }

        if(this.controls.pickUp){
            this.controls.pickUp=false
            if(this.hasBomb){
                this.bombDropPoint = this.findOldPosition()
                this.droppingBomb = true
                this.hasBomb=false
            } else {
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
            ret = this.bomb.explode()
            this.bombDrop = 8
        }
        return ret
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


function beep() {
    var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");  
    snd.play();
}