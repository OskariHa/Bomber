//  - find itself
//  - find a move
//TODO  - make a move
//TODO  - pick up a bomb
//TODO  - place bomb
//TODO  - make moves towards objective(blow up breakables)


class Ai{
    constructor(ctx,grid){
        this.ctx = ctx
        this.grid = grid
    }

    moving(){
        let currentPosition = this.findPosition()
        // moves = left right down up
        let moves = this.availableSpots(currentPosition)
        console.log("Moi:",currentPosition, moves)
    }

    findPosition(){
        let position = [-1,-1]
        for(let i=0;i<this.grid.length;i++){
            if(this.grid[i].indexOf(7) != -1){
                position = [i,this.grid[i].indexOf(7)]
            }
        }
        return position
    }


    availableSpots(currentPosition){
        // left right down up
        let moves = [false,false,false,false]

        if(currentPosition[0]-1 !=-1){
            moves[0] = true
        }
        if(currentPosition[0]+1 !=9){
            moves[1] = true
        }
        if(currentPosition[1]+1 !=9){
            moves[2] = true
        }
        if(currentPosition[1]-1 !=-1){
            moves[3] = true
        }

        return moves
    }
}