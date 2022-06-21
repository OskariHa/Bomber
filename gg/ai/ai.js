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
    }

    moving(){
        //findLocationOf(var)
        //"0=empty, 1=wall, 2=breakable, 3=bomb, 5=player 6=explode 7=ai"
        let aiPos = this.findLocationOf(7)
        // moves = left right down up
        let moves = this.availableSpots(aiPos)

        //chech locations if next to a bomb
        let nextToBomb = this.nextToBomb(aiPos)
        this.pickUpBomb(nextToBomb,aiPos)
        //decided move
        if(moves[0]){
            let move = "left"
            this.makeMove(move,aiPos)
        }
        
        console.log("Moi:",aiPos[0][0], moves)
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

    makeMove(move,aiPos){

        if (move =="left"){
            if(this.hasBomb){
                this.grid[aiPos[0][0]][aiPos[0][1]] = 3
            } else{
                this.grid[aiPos[0][0]][aiPos[0][1]] = 0
            }
            this.grid[aiPos[0][0]-1][aiPos[0][1]] = 7
        }
        //TODO add rest
        if (move =="right"){
            this.grid[aiPos[0][0]+1][aiPos[0][1]] = 7
        }
        if (move =="up"){
            this.grid[aiPos[0][0]][aiPos[0][1]-1] = 7
        }
        if (move =="down"){
            this.grid[aiPos[0][0]][aiPos[0][1]+1] = 7
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

    nextToBomb(aiPos){
        
        let bombLocations = this.findLocationOf(3)
        // bombs = left right down up
        let bombs = [false,false,false,false]
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
        return bombs
    }


}