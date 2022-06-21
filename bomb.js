class Bomb{
    constructor(grid){
        this.grid = grid
    }

    dropBomb(){
        let emptySpots = this.findSpot()
        let spot = emptySpots[Math.floor(Math.random()
                        *emptySpots.length)]
        this.addBomb(spot)

        
        let spot2 = emptySpots[Math.floor(Math.random()
            *emptySpots.length)]
        this.addBomb(spot2)
        
    }

    findSpot(){
        let emptySpots = []
        for(let y=0;y<this.grid.length;y++){
            for(let x=0;x<this.grid[y].length;x++){

                if(this.grid[x][y]==0){
                    emptySpots.push([x,y])
                }
            }
        }
        return emptySpots
    }
    addBomb(spot){
        this.grid[spot[0]][spot[1]]=3
    }

    // TODO: add bomb range 
    explode(){
        let bombs = this.findBombs()
        for(let i=0;i<bombs.length;i++){
            this.grid[bombs[i][0]][bombs[i][1]] = 6
            if(bombs[i][0]-1 != -1) {
                if(this.grid[bombs[i][0]-1][bombs[i][1]] == 0){
                    this.grid[bombs[i][0]-1][bombs[i][1]] = 6
                }
                if(this.grid[bombs[i][0]-1][bombs[i][1]] == 1){

                }
                if(this.grid[bombs[i][0]-1][bombs[i][1]] == 2){
                    this.grid[bombs[i][0]-1][bombs[i][1]] = 6
                }
                if(this.grid[bombs[i][0]-1][bombs[i][1]] == 5){
                    return true
                }
            }
            if(bombs[i][0]+1 != 9) {
                if(this.grid[bombs[i][0]+1][bombs[i][1]] == 0){
                    this.grid[bombs[i][0]+1][bombs[i][1]] = 6
                }
                if(this.grid[bombs[i][0]+1][bombs[i][1]] == 1){

                }
                if(this.grid[bombs[i][0]+1][bombs[i][1]] == 2){
                    this.grid[bombs[i][0]+1][bombs[i][1]] = 6
                }
                if(this.grid[bombs[i][0]+1][bombs[i][1]] == 5){
                    return true
                }
            }  
            if(bombs[i][1]-1 != -1) {
                if(this.grid[bombs[i][0]][bombs[i][1]-1] == 0 ){
                    this.grid[bombs[i][0]][bombs[i][1]-1] = 6
                }
                if(this.grid[bombs[i][0]][bombs[i][1]-1] == 1){

                }
                if(this.grid[bombs[i][0]][bombs[i][1]-1] == 2){
                    this.grid[bombs[i][0]][bombs[i][1]-1] = 6
                }
                if(this.grid[bombs[i][0]][bombs[i][1]-1] == 5){
                    return true
                }
            }
            if(bombs[i][1]+1 != 9) {
                if(this.grid[bombs[i][0]][bombs[i][1]+1] == 0){
                    this.grid[bombs[i][0]][bombs[i][1]+1] = 6
                }
                if(this.grid[bombs[i][0]][bombs[i][1]+1] == 1){

                }
                if(this.grid[bombs[i][0]][bombs[i][1]+1] == 2){
                    this.grid[bombs[i][0]][bombs[i][1]+1] = 6
                }
                if(this.grid[bombs[i][0]][bombs[i][1]+1] == 5){
                    return true
                }
            }
        }

        return false
    }

    findBombs(){
        let bombs = []
        for(let y=0;y<this.grid.length;y++){
            for(let x=0;x<this.grid[y].length;x++){

                if(this.grid[x][y]==3){
                    bombs.push([x,y])
                }
            }
        }
        return bombs
    }
}