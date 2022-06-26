//  - find itself
//  - find a move
//  - make a move
//  - pick up a bomb
//  - place bomb
//TODO  - make moves towards objective(blow up breakables)


class Ai{
    constructor(ctx,grid){
        this.ctx = ctx
        this.grid = grid
        this.hasBomb
        this.bombCooldown = false
    }

    moving(){
        try {
        //findLocationOf(var)
        //"0=empty, 1=wall, 2=breakable, 3=bomb, 5=player 6=explode 7=ai"
        let aiPos = this.findLocationOf(7)
        // moves = left right down up
        let moves = this.availableSpots(aiPos)

        //chech locations if next to a bomb and pick it if next to it
        let bombLocations = this.findLocationOf(3)
        let nextToBomb = this.nextToBomb(aiPos,bombLocations)
        this.pickUpBomb(nextToBomb,aiPos)


        let decision = this.decisions(aiPos,bombLocations, moves)
        let move = decision[0]
        let dropBomb = decision[1]
        this.makeMove(move,dropBomb,aiPos)
        } catch (error) {
            console.log(error)
        }
    }
    
    decisions(aiPos,bombLocations,moves){
        //1. objective to look for the bomb
        let ret = ["",true]
        let directions = this.findDistanceToBomb(aiPos,bombLocations)
        let movees = this.findRouteToBomb(directions,aiPos)

        if(!this.hasBomb){

        }

        ret[0] = movees[0]
        //2. objective to place a bomb and escape
        return ret
    }

    findLocationOf(target){
        //findwhatever(what you want)
        //"0=empty, 1=wall, 2=breakable, 3=bomb, 5=player 6=explode 7=ai"
        let position = []
        for(let i=0;i<this.grid.length;i++){
            if(this.grid[i].indexOf(target) != -1){
                position.push([i,this.grid[i].indexOf(target)])
            }
        }
        return position
    }


    availableSpots(aiPos){
        // left right down up
        let moves = [false,false,false,false]

        let x = aiPos[0][0]
        let y = aiPos[0][1]

        if(aiPos[0][0]-1 !=-1){
            if(this.grid[x-1][y] != 3){
                if(this.grid[x-1][y] != 2){
                    if(this.grid[x-1][y] != 1){
                        moves[0] = true
                    }
                }
            }
        }
        if(aiPos[0][0]+1 !=9){
            if(this.grid[x-1][y] != 3){
                if(this.grid[x-1][y] != 2){
                    if(this.grid[x-1][y] != 1){
                        moves[1] = true
                    }
                }
            }
        }
        if(aiPos[0][1]+1 !=9){
            if(this.grid[x][y+1] != 3){
                if(this.grid[x][y+1] != 2){
                    if(this.grid[x][y+1] != 1){
                        moves[2] = true
                    }
                }
            }
        }
        if(aiPos[0][1]-1 !=-1){
            if(this.grid[x][y-1] != 3){
                if(this.grid[x][y-1] != 2){
                    if(this.grid[x][y-1] != 1){
                        moves[3] = true
                    }
                }
            }
        }

        return moves
    }

    makeMove(move,dropBomb,aiPos){
        
        if (move =="left"){
            this.grid[aiPos[0][0]-1][aiPos[0][1]] = 7
        }
        if (move =="right"){
            this.grid[aiPos[0][0]+1][aiPos[0][1]] = 7
        }
        if (move =="up"){
            this.grid[aiPos[0][0]][aiPos[0][1]-1] = 7
        }
        if (move =="down"){
            this.grid[aiPos[0][0]][aiPos[0][1]+1] = 7
        }

        if(move != ""){           
            if(this.hasBomb && dropBomb){
                this.grid[aiPos[0][0]][aiPos[0][1]] = 3
                this.hasBomb = false
                this.bombCooldown = true
            } else{
                this.grid[aiPos[0][0]][aiPos[0][1]] = 0
            }
        }
    }

    pickUpBomb(bombs,aiPos){
        if(bombs[0]){
            this.grid[aiPos[0][0]-1][aiPos[0][1]] = 0
            this.hasBomb = true
        }
        if(bombs[1]){
            this.grid[aiPos[0][0]+1][aiPos[0][1]] = 0
            this.hasBomb = true
        }
        if(bombs[2]){
            console.log(aiPos)
            this.grid[aiPos[0][0]][aiPos[0][1]-1] = 0
            this.hasBomb = true
        }
        if(bombs[3]){
            this.grid[aiPos[0][0]][aiPos[0][1]+1] = 0
            this.hasBomb = true
        }
    }

    nextToBomb(aiPos,bombLocations){
        
        // bombs = left right down up
        let bombs = [false,false,false,false]
        
        if(!this.bombCooldown){
            for(let i=0;i<bombLocations.length;i++){
                if(bombLocations[i][0]-1==aiPos[0][0]){
                    bombs[0] = true
                }
                if(bombLocations[i][0]+1==aiPos[0][0]){
                    bombs[1] = true
                }
                if(bombLocations[i][1]+1==aiPos[0][1]){
                    bombs[2] = true
                }
                if(bombLocations[i][1]-1==aiPos[0][1]){
                    bombs[3] = true
                }
                
            }
                    
        }
        this.bombCooldown = false
        return bombs
    }

    findDistanceToBomb(aiPos,bombLocations){
        //find closest one
        let distance= 100
        let bombId = -1
        let x
        let y
        for(let i=0;i<bombLocations.length;i++){
            let tempX = 0
            if(aiPos[0][0]>bombLocations[i][0]){
                tempX = aiPos[0][0] - bombLocations[i][0]
            } else {
                tempX = aiPos[0][0] - bombLocations[i][0]
            }

            let tempY = aiPos[0][1] - bombLocations[i][1]
            let tempBest = Math.abs(tempX) + Math.abs(tempY)

            if (distance>tempBest){
                distance = tempBest
                bombId = i
                x = tempX
                y = tempY
            }
        }
        return [x,y]
    }

    findRouteToBomb(directions,aiPos){
        let rimpsu = []
        //TODO add y-axis movement
        if (directions[0]<0){
            for(let i=directions[0]+1;i<0;i++){
                let testPos = aiPos[0][0] + i
                if (this.grid[testPos][aiPos[0][1]] ==0){
                    rimpsu.push("right")
                }
            }
        } 
        if(directions[0]>0){
            console.log(aiPos[0][0],directions[0],"MOI")
            for(let i=directions[0]+1;i>0;i--){

                console.log(this.grid[i][aiPos[0][1]],"näytä")
                if (this.grid[i][aiPos[0][1]] ==0){
                    rimpsu.push("left")
                }
                // if(this.grid[i][aiPos[0][1]] ==3){
                //     break
                // }
            }
        }
        return rimpsu
    }   
}